"use server"
import Animecard from '@/components/CardComponent/Animecards'
import Herosection from '@/components/home/Herosection'
import Navbarcomponent from '@/components/navbar/Navbar'
import { TrendingAnilist, Top100Anilist, SeasonalAnilist } from '@/lib/Anilistfunctions'
import React from 'react'
import { MotionDiv } from '@/utils/MotionDiv'
import VerticalList from '@/components/home/VerticalList'
import ContinueWatching from '@/components/home/ContinueWatching'
import RecentEpisodes from '@/components/home/RecentEpisodes'
import { getAuthSession } from './api/auth/[...nextauth]/route'
import { redis } from '@/lib/rediscache'

async function getHomePage() {
  try {
    let cachedData;
    if (redis) {
      cachedData = await redis.get(`homepage`);
      if (!JSON.parse(cachedData)) {
        await redis.del(`homepage`);
        cachedData = null;
      }
    }
    if (cachedData) {
      const { herodata, top100data, seasonaldata } = JSON.parse(cachedData);
      return { herodata, top100data, seasonaldata };
    } else {
      const [herodata, top100data, seasonaldata] = await Promise.all([
        TrendingAnilist(),
        Top100Anilist(),
        SeasonalAnilist()
      ]);
      const cacheTime = 60 * 60 * 2;
      if (redis) {
        await redis.set(`homepage`, JSON.stringify({ herodata, top100data, seasonaldata }), "EX", cacheTime);
      }
      return { herodata, top100data, seasonaldata };
    }
  } catch (error) {
    console.error("Error fetching homepage from anilist: ", error);
    return null;
  }
}

async function Home() {
  const session = await getAuthSession();
  const { herodata = [], top100data = [], seasonaldata = [] } = await getHomePage();
  // const history = await getWatchHistory();
  // console.log(history)

  return (
    <div>
      <Navbarcomponent home={true} />
      <Herosection data={herodata} />
      <div className='sm:max-w-[97%] md:max-w-[95%] lg:max-w-[90%] xl:max-w-[85%] mx-auto flex flex-col md:gap-11 sm:gap-7 gap-5 mt-8'>
        <MotionDiv
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <ContinueWatching session={session} />
        </MotionDiv>
        <MotionDiv
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >

          {/* AD HERE */}
          <div className="ad-container">
            <a href="https://example.com/ad_link">
              <img src="https://media.discordapp.net/attachments/1221283434589323395/1223134206222270545/FREE_ANIME.png?ex=66346eff&is=6621f9ff&hm=5839f5cda80d83cfa33b5c68d6dc35b3b4fd1454e295f1b5fed016a18fcb749c&=&format=webp&quality=lossless" alt="Ad" className="ad-image" />
            </a>
          </div>

          <Animecard data={herodata} cardid="Trending Now" />
        </MotionDiv>
        <MotionDiv
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <RecentEpisodes cardid="Recent Episodes" />
        </MotionDiv>
        <MotionDiv
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >

          {/* ... (existing code) */}
        </MotionDiv>
      </div>
    </div>
  )
}

export default Home
