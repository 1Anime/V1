"use server"
import Animecard from '@/components/CardComponent/Animecards'
import Herosection from '@/components/home/Herosection'
import Navbarcomponent from '@/components/navbar/Navbar'
import { TrendingAnilist, PopularAnilist, Top100Anilist, SeasonalAnilist } from '@/lib/Anilistfunctions'
import React from 'react'
import { MotionDiv } from '@/utils/MotionDiv'
import VerticalList from '@/components/home/VerticalList'
import Genres from "@/components/home/genres";
import ContinueWatching from '@/components/home/ContinueWatching'
import RecentEpisodes from '@/components/home/RecentEpisodes'
import { getAuthSession } from './api/auth/[...nextauth]/route'
import { redis } from '@/lib/rediscache'
import Greeting from '@/components/Greeting';
// import { getWatchHistory } from '@/lib/EpHistoryfunctions'

async function getHomePage() {
  try {
    let cachedData;
    if (redis) {
      cachedData = await redis.get(`homepage`);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (Object.keys(parsedData).length === 0) { // Check if data is an empty object
          await redis.del(`homepage`);
          cachedData = null;
        }
      }
    }
    if (cachedData) {
      const { herodata, populardata, top100data, seasonaldata } = JSON.parse(cachedData);
      return { herodata, populardata, top100data, seasonaldata };
    } else {
      const [herodata, populardata, top100data, seasonaldata] = await Promise.all([
        TrendingAnilist(),
        PopularAnilist(),
        Top100Anilist(),
        SeasonalAnilist()
      ]);
      const cacheTime = 60 * 60 * 2;
      if (redis) {
        await redis.set(`homepage`, JSON.stringify({ herodata, populardata, top100data, seasonaldata }), "EX", cacheTime);
      }
      return { herodata, populardata, top100data, seasonaldata };
    }
  } catch (error) {
    console.error("Error fetching homepage from anilist: ", error);
    return null;
  }
}

async function Home() {
  const session = await getAuthSession();
  const { herodata = [], populardata = [], top100data = [], seasonaldata = [] } = await getHomePage();
  // const history = await getWatchHistory();
  // console.log(history)

  return (
    <div>
      <Navbarcomponent home={true} />
      <Herosection data={herodata} />
      <div className='sm:max-w-[97%] md:max-w-[95%] lg:max-w-[90%] xl:max-w-[85%] mx-auto flex flex-col md:gap-11 sm:gap-7 gap-5 mt-8'>
        <div>
        <section className="relative h-screen bg-[#cccccc] md:h-screen">
  {/* Component */}
  <div className="absolute left-1/2 top-[5%] mx-auto flex w-[90%] max-w-[960px] -translate-x-1/2 flex-col items-center rounded-xl bg-black p-4 sm:justify-between sm:px-8 md:flex-row md:py-6 lg:w-full">
    {/* Banner Text  */}
    <div className="flex flex-row items-center">
      <img src="https://assets.website-files.com/63904f663019b0d8edf8d57c/6399786f0e0572a14cc94914_Ellipse%2030.svg" alt="" className="mr-4 inline-block h-8 w-8 rounded-full object-cover" />
      <p className="text-sm text-[#c1bbbb]">Try the new Themes!.</p>
    </div>

    {/* Get Started Button */}
    <div className="mt-4 flex flex-row items-center justify-center gap-4 md:mt-0">
      <a href="#" className="inline-block rounded-xl border border-black bg-white px-10 py-3 font-semibold text-[#1353fe] [box-shadow:rgb(19,_83,_254)_6px_6px]">Try ThemeManager</a>
      <img src="https://assets.website-files.com/63904f663019b0d8edf8d57c/646723d38ca7fbe390224779_ri_close-circle-fill%20(1).svg" alt="" className="absolute bottom-auto left-auto right-[1%] top-[3%] w-6 md:relative md:right-0 md:w-8" />
    </div>
  </div>
</section>
        <Greeting />
 <div className='mx-3 bg-[#1a1a1f] px-5 py-3 rounded-lg text-bold flex flex-row items-center'>
 <svg width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>
            <p className='text-[11px] text-[#bfc6d0] lg:max-w-[65%] line-clamp-3'> Enjoying 1Anime? Please consider supporting us with keeping it online <a className="text-blue-500 hover:text-blue-600" href="https://1anime.co/donate">Support/Donate</a></p></div>
          <ContinueWatching session={session} />
        </div>
        <div
        >
          <RecentEpisodes cardid="Recent Episodes" />
        </div>
        <div
        >
 <Animecard data={herodata} cardid="Trending Now" />
        </div>
        <div
        >
          <Animecard data={populardata} cardid="Popular" />
        </div>
        <div
        >
          <Animecard data={top100data} cardid="Most Favorites" />
        </div>
        <div
        >
          <Animecard data={seasonaldata} cardid="Popular This Season" />
        </div>
        <div
        >
           <div // Add motion.div to each child component
              key="Genres"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Genres />
            </div>
          <div className='lg:flex lg:flex-row justify-between lg:gap-20'>
            <VerticalList data={top100data} mobiledata={seasonaldata} id="Top 100 Anime" />
            <VerticalList data={seasonaldata} id="Seasonal Anime" />
          </div>
        </div>
      </div>
    </div>
  )
}


export default Home
