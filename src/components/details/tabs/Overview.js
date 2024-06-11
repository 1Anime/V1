"use client"
import React, { useState } from 'react'
import styles from '../../../styles/AnimeDetailsBottom.module.css'
import { Tooltip } from "@nextui-org/react";

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
                
                <div className='mx-3 bg-[#1a1a1f] px-5 py-3 rounded-lg text-[18px] md:text-[18px] text-bold flex flex-row items-center'>
 <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>
            <p className='text-[11px] md:text-[13px] text-[#bfc6d0] line-clamp-3'> 1Anime helps you remove ads and give you the best experience, meaning we have server costs. Help us by donating or sharing the app!</p></div>
   </div>
        </div>
    )
}

export default Overview
