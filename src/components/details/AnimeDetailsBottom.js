"use client"
import React, { useState } from "react";
import styles from "../../styles/AnimeDetailsBottom.module.css";
import Animecards from "../CardComponent/Animecards";
import { AnimatePresence, motion } from "framer-motion";
import Characters from "./Characters";
import Overview from "./tabs/Overview";

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

  return (
    <div>
      <div className={styles.detailstabs}>
        <select
          value={activeTab.name}
          onChange={handleSelectChange}
          className={styles.tabDropdown}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.label}
            </option>
          ))}
        </select>
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
