"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Navbarcomponent from "@/components/navbar/Navbar";

const getRandomAnimeId = () => {
  // Replace with your logic to get a random anime ID (e.g., from a database)
  const minId = 1;
  const maxId = 20000; // Adjust the range based on your data
  return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
};

const RandomAnimePage = () => {
  const router = useRouter();

  useEffect(() => {
    const randomId = getRandomAnimeId();
    const randomAnimeUrl = `/anime/info/${randomId}`;

    // Redirect to the random anime info page
    router.push(randomAnimeUrl);
  }, []);

  return (
    <>
      <Navbarcomponent/>
  <div className="flex h-screen flex-col items-center justify-center gap-8">
        <h2 className="text-center font-bold text-3xl leading-tight">
          Finding a random anime for you...
        </h2></div></>
        
         );
}

export default RandomAnimePage;