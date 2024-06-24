"use client"
import React, { useState } from "react";
import styles from "../../styles/AnimeDetailsBottom.module.css";
import Animecards from "../CardComponent/Animecards";
import { AnimatePresence, motion } from "framer-motion";
import Characters from "./Characters";
import Overview from "./tabs/Overview";
import { ShareIcon } from "@heroicons/react/24/solid";

function AnimeDetailsBottom({ data }) {
  const tabs = [
    {
      name: "Overview",
      label: "Overview",
    },
    {
      name: "Relations",
      label: "Relations",
    },
    {
      name: "Characters",
      label: "Characters",
    },
  
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleSelectChange = (e) => {
    const selectedTab = tabs.find((tab) => tab.name === e.target.value);
    setActiveTab(selectedTab);
  };

  
  const isAnime = data?.type === 'ANIME' || true;

  
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

  return (
    <div>
      <div className={styles.detailstabs}>
        <select
          value={activeTab.name}
          onChange={handleSelectChange}
          className="mx-1 bg-[#1a1a1f] text-xs font-bold px-2 py-1 rounded-lg flex items-center justify-center"
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.label}
            </option>
          ))}
        </select>
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
AL</a>
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
            {activeTab && activeTab.name === "Overview" && <Overview data={data} />}
            {activeTab.name === "Relations" && (
              <div className={styles.relations}>
                <h3 className={styles.relationsheading}>Chronology</h3>
                <Animecards
                  data={data?.relations?.edges}
                  cardid="Related Anime"
                  show={false}
                />
              </div>
            )}
            {activeTab.name === "Characters" && (
              <div className={styles.characters}>
                <h3 className={styles.relationsheading}>Anime Characters</h3>
                <Characters data={data?.characters?.edges} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AnimeDetailsBottom;
