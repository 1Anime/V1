"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MediaCard from './MediaCard';

function UserInfo({ lists, session }) {
    const [activeTab, setActiveTab] = useState(lists.find(tab => tab?.name === "Watching") || lists[0]);

    const handleClick = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    const isSelected = (tab) => activeTab?.name === tab?.name;

    return (
        <div>
            <div className="max-w-[95%] lg:max-w-[90%] xl:max-w-[86%] mx-auto">
        
                        <div className='mx-3 bg-[#1a1a1f] px-5 py-3 rounded-lg text-bold flex flex-row items-center'>
                <svg width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
</svg>
                    <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3'> 1Anime secures your AniList account and never shares any info with other services, Free & Next-Level Security • Learn more.</p></div>
                <div className="flex mb-3 flex-nowrap overflow-x-auto scrollbar-hide">
                    {lists.map((tab) => (
                        <div
                            key={tab.name}
                            className={[
                                "relative p-1 my-1 mx-3 cursor-pointer text-[#A1A1AA] transition-opacity duration-250 ease-in-out hover:opacity-60 text-lg sm:text-xl font-medium",
                                isSelected(tab) ? "!text-white !opacity-100" : "",
                            ].join(" ")}
                        >
                            <div key={tab.name} onClick={(e) => handleClick(e, tab)} className="flex flex-row items-center">
                                {tab.name} <span className="ml-2 text-base">({tab?.entries?.length})</span>
                            </div>
                            {isSelected(tab) && (
                                <motion.div layoutId="indicator" className="absolute !h-[1px] bottom-0 left-0 right-0 bg-white" />
                            )}
                        </div>
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab.name || "empty"}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        transition={{
                            duration: 0.3,
                        }}
                    >
                        <div className="mx-3 my-5 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3 lg:gap-4 !gap-y-8">
                            {activeTab &&
                                activeTab.entries
                                    .slice() // Create a copy of the array to avoid mutating the original
                                    .sort((a, b) => b.updatedAt - a.updatedAt) // Sort by updatedate in descending order
                                    .map((anime) => (
                                        <MediaCard key={anime.id} anime={anime} session={session}/>
                                    ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default UserInfo;
