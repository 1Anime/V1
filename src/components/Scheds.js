"use client"
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '@/styles/Animecard.module.css';

const Scheds = () => {

  return (
    <div className={styles.cardhead}>
    <span className={styles.bar}></span>
    <h1 className="text-[18px] md:text-[21px] font-medium mb-2">Schedule</h1> <div className='mx-3 bg-[#1a1a1f] px-5 py-3 rounded-lg text-bold flex flex-row items-center'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
<p className='text-[11px] text-[#bfc6d0] lg:max-w-[65%] line-clamp-3'>
        <a className="text-blue-500 hover:text-blue-600" href="/schedule">Check Airing Anime today ➡️</a>
      </p></div></div>
  );
};

export default Scheds;
