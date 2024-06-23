"use client"
import React, { useState } from 'react'
import styles from '../../../styles/AnimeDetailsBottom.module.css'
import { Tooltip } from "@nextui-org/react";
import { ShareIcon } from "@heroicons/react/24/solid";


function Overview({data}) {
    const [showFullDescription, setShowFullDescription] = useState(false);

    
  const handleShareClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${isAnime ? "Watch" : "Read"} Now - ${data?.title?.english}`,
           text: `Watch [${data?.title?.romaji}] and more on 1Anime. Join us for endless anime entertainment"`,
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

    return (
        <div className={styles.detailscard}>
            <div className={styles.card1}>
                <h3 className={styles.detailsheading}>Details</h3>
                <button
            type="button"
            className="${styles.detailswatch} bg-[#FFFFFF] text-black text-xs font-bold px-2 py-1 rounded-md"
            onClick={handleShareClick}
          >
            <span className="absolute pointer-events-none z-40 opacity-0 -translate-y-8 group-hover:-translate-y-10 group-hover:opacity-100 font-karla shadow-tersier shadow-md whitespace-nowrap bg-secondary px-2 py-1 rounded transition-all duration-200 ease-out">
              Share {isAnime ? "Anime" : "Manga"}
            </span>
            <ShareIcon className="w-5 h-5" />
          </button>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://anilist.co/${data.type.toLowerCase()}/${data.id}`}
            className="${styles.detailswatch} bg-[#FFFFFF] text-black text-xs font-bold px-2 py-1 rounded-md"
          >
            <span className="absolute pointer-events-none z-40 opacity-0 -translate-y-8 group-hover:-translate-y-10 group-hover:opacity-100 font-karla shadow-tersier shadow-md whitespace-nowrap bg-secondary px-2 py-1 rounded transition-all duration-200 ease-out">
              See on AniList
            </span>
<svg fill="#000000" width="25px" height="25px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M6.361 2.943 0 21.056h4.942l1.077-3.133H11.4l1.052 3.133H22.9c.71 0 1.1-.392 1.1-1.101V17.53c0-.71-.39-1.101-1.1-1.101h-6.483V4.045c0-.71-.392-1.102-1.101-1.102h-2.422c-.71 0-1.101.392-1.101 1.102v1.064l-.758-2.166zm2.324 5.948 1.688 5.018H7.144z"/></svg></a>
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
