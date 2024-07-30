"use client";
import React, { useState } from "react";
import styles from "../../styles/AnimeDetailsBottom.module.css";
import Animecards from "../CardComponent/Animecards";
import { AnimatePresence, motion } from "framer-motion";
import Characters from "./Characters";
import Overview from "./tabs/Overview";
import Draggable from 'react-draggable';

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
    {
      name: "more",
      label: "more",
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleClick = (e, tab) => {
    e.preventDefault();

    setActiveTab(tab);
  };

  const isSelected = (tab) => activeTab.name === tab.name;

  return (
    <div>
    <div className={styles.tabHeader}>
          {tabs.map((tab) => (
            <div
              key={tab.name}
              className={[
                styles.tabItem,
                isSelected(tab) ? styles.selected : "",
              ].join(" ")}
            >
              <div key={tab.name} onClick={(e) => handleClick(e, tab)}>
                {tab.label}
              </div>
              {isSelected(tab) && (
                <motion.div layoutId="indicator" className={styles.indicator} />
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
            {activeTab && activeTab.name === "Overview" && <Overview data={data} />}
            {activeTab.name === "Relations" && (
              <div className={styles.relations}>
                <h3 className={styles.relationsheading}>Chronology</h3>
                <Animecards
                  data={data?.relations?.edges}
                  cardid="Related"
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
            {activeTab.name === "more" && (
              <div className={styles.detailscard}><a
              type="button"
              target="_blank"
rel="noopener noreferrer"
              href={`https://anilist.co/anime/${data.id}/reviews`}
              className="bg-[#1a1a1f] text-white text-xs font-bold px-2 py-1 rounded-md"
          >
              <span className="absolute pointer-events-none z-40 opacity-0 -translate-y-8 group-hover:-translate-y-10 group-hover:opacity-100 font-karla shadow-tersier shadow-md whitespace-nowrap bg-secondary px-2 py-1 rounded transition-all duration-200 ease-out">
                  AniList
              </span>
             See Reviews on AniList <AniListIcon className="w-7 h-7" /></a>
             <a
              type="button"
              target="_blank"
rel="noopener noreferrer"
              href={`https://anilist.co/anime/${data.id}/reviews`}
              className="bg-[#1a1a1f] text-white text-xs font-bold px-2 py-1 rounded-md"
          >
              <span className="absolute pointer-events-none z-40 opacity-0 -translate-y-8 group-hover:-translate-y-10 group-hover:opacity-100 font-karla shadow-tersier shadow-md whitespace-nowrap bg-secondary px-2 py-1 rounded transition-all duration-200 ease-out">
                  AniList
              </span>
             See Activities & Post about this on AniList <AniListIcon className="w-7 h-7" /></a>
</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
  );
}

export default AnimeDetailsBottom;
