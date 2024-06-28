"use client"
import React, { useState } from 'react'
import styles from '../../../styles/AnimeDetailsBottom.module.css'
import { Tooltip } from "@nextui-org/react";
import { ShareIcon } from "@heroicons/react/24/solid";
import { AniListIcon,MyAnimeListIcon } from "@/lib/SvgIcons";

function Overview({data}) {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const getAiringTime = (airingdate) => {
        const timeDifference = airingdate * 1000 - Date.now();
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return `${days}d ${hours}h ${minutes}m`
    }

    const getAiringTimeUnix = (seconds) => {
        var date = new Date(seconds * 1000); // Convert seconds to milliseconds
        var options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
        var dateString = date.toLocaleString('en-US', options);
        return dateString;
    }

    function aired(m){
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return month[m]
    }

    
    const isAnime = data?.type === 'ANIME' || true;

  
    const handleShareClick = async () => {
      try {
        if (navigator.share) {
          await navigator.share({
            title: `${isAnime ? "Watch" : "Read"} Now - ${data?.title?.english}`,
             text: `Watch [${data?.title?.romaji}] and more on 1Anime. Join us for endless anime entertainment`,
            url: window.location.href,
          });
        } else {
          // Web Share API is not supported, provide a fallback or show a message
          alert("Web Share API is not supported in this browser.");
        }
      } catch (error) {
        console.error("Error sharing:", error);
      }
    };
  

    return (
        <div className={styles.detailscard}>
            <div className={styles.card1}>
                <h3 className={styles.detailsheading}>Details</h3>
            
                <div className={styles.detailscontent}>
                  {data?.status==='RELEASING' && 
                    <div className={styles.singlecontent}>
                        <span className={`${styles.sideheading} font-semibold !text-[15px]`}>Airing</span>
                        <Tooltip content={getAiringTimeUnix(data?.nextAiringEpisode?.airingAt)}
                        // showArrow
                        size='sm'
                        classNames={{
                            base: [
                                // arrow color
                                "before:bg-neutral-400 dark:before:bg-white",
                            ],
                            content: [
                                "py-2 px-4 shadow-xl",
                                "text-black font-medium bg-gradient-to-br from-white to-neutral-400",
                            ],
                        }}>
                            <span className={`${styles.con} !text-white cursor-pointer`} suppressHydrationWarning>EP {data?.nextAiringEpisode?.episode}: {getAiringTime(data?.nextAiringEpisode?.airingAt)}</span>
                        </Tooltip>
                    </div>}
                    <div className={styles.singlecontent}>
                        <span className={styles.sideheading}>Type</span> <span className={styles.con}>{data?.format}</span>
                    </div>
                    <div className={styles.singlecontent}>
                        <span className={styles.sideheading}>Episodes</span> <span className={styles.con}>{data?.episodes || data?.nextAiringEpisode?.episode - 1 || "?"}</span>
                    </div>
                    <div className={styles.singlecontent}>
                        <span className={styles.sideheading}>Genres</span> <span className={styles.con}>{data?.genres.join(", ")}</span>
                    </div>
                    <div className={styles.singlecontent}>
                        <span className={styles.sideheading}>Aired</span> <span className={styles.con}>{aired(data?.startDate?.month-1)}, {data?.startDate?.day} {data?.startDate?.year} {data?.endDate?.day && "to"} 
                       {data?.endDate?.day &&  <div>{aired(data?.endDate?.month-1)} {data?.endDate?.day}, {data?.endDate?.year}</div>}
                       </span>
                    </div>
                    <div className={styles.singlecontent}>
                        <span className={styles.sideheading}>Status</span> <span className={styles.con}>{data?.status}</span>
                    </div>
                    <div className={styles.singlecontent}>
                        <span className={styles.sideheading}>Season</span> <span className={styles.con}>{`${data?.season} ${data?.seasonYear}`}</span>
                    </div>
                    <div className={styles.singlecontent}>
                        <span className={styles.sideheading}>Country</span> <span className={styles.con}>{data?.countryOfOrigin}</span>
                    </div>
                    <div className={styles.singlecontent}>
                        <span className={styles.sideheading}>Studios</span> <span className={styles.con}>{data?.studios?.nodes[0]?.name}</span>
                    </div>
                    <div className={styles.singlecontent}>
                        <span className={styles.sideheading}>Source</span> <span className={styles.con}>{data?.source}</span>
                    </div>
                    <div className={styles.singlecontent}>
                        <span className={styles.sideheading}>Duration</span> <span className={styles.con}>{`${data?.duration} min` || `Na`}</span>
                    </div>
                    <div className={styles.singlecontent}>
                        <span className={styles.sideheading}>Popularity (AniList)</span> <span className={styles.con}>{`${data?.popularity} users`}</span>
                    </div>
                </div>
            </div>
            <div className={styles.card2}>
                <h3 className={styles.detailsheading}>Description</h3>   
        <button
            type="button"
            className="bg-[#FFFFFF] text-black text-xs font-bold px-2 py-1 rounded-md"
            onClick={handleShareClick}
          >
            <span className="absolute pointer-events-none z-40 opacity-0 -translate-y-8 group-hover:-translate-y-10 group-hover:opacity-100 font-karla shadow-tersier shadow-md whitespace-nowrap bg-secondary px-2 py-1 rounded transition-all duration-200 ease-out">
              Share {isAnime ? "Anime" : "Manga"}
            </span>
            <ShareIcon className="w-7 h-7" />
          </button>
      <a
                            type="button"
                            target="_blank"
            rel="noopener noreferrer"
                            href={`https://anilist.co/anime/${data.id}`}
                            className="bg-[#FFFFFF] text-black text-xs font-bold px-2 py-1 rounded-md"
                        >
                            <span className="absolute pointer-events-none z-40 opacity-0 -translate-y-8 group-hover:-translate-y-10 group-hover:opacity-100 font-karla shadow-tersier shadow-md whitespace-nowrap bg-secondary px-2 py-1 rounded transition-all duration-200 ease-out">
                                MAL
                            </span>
                            <AniListIcon className="w-7 h-7" /></a>

<a
                            type="button"
                            target="_blank"
            rel="noopener noreferrer"
                            href={`https://myanimelist.net/anime/${data?.idMal}`}
                            className="bg-[#FFFFFF] text-black text-xs font-bold px-2 py-1 rounded-md"
                        >
                            <span className="absolute pointer-events-none z-40 opacity-0 -translate-y-8 group-hover:-translate-y-10 group-hover:opacity-100 font-karla shadow-tersier shadow-md whitespace-nowrap bg-secondary px-2 py-1 rounded transition-all duration-200 ease-out">
                                MAL
                            </span>
                            <MyAnimeListIcon className="w-7 h-7" /></a>
                <div className={styles.descriptioncontent}>
                    <p dangerouslySetInnerHTML={{ __html: data?.description }} />
                </div>
                <div className={styles.descriptioncontentmobile}>
                    <p dangerouslySetInnerHTML={{
                        __html: showFullDescription
                            ? data?.description
                            : `${data?.description?.slice(0, 250)}...`
                    }} />
                    {data?.description?.length > 250 && (
                        <button className={styles.readMoreButton} onClick={toggleDescription}>
                            {showFullDescription ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                </div>
               </div>
        </div>
    )
}

export default Overview
