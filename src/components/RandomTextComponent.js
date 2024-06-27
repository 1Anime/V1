"use client"
import React, { useState } from "react";

const RandomTextComponent = () => {
  const randomTexts = [
    { text: "Enjoying 1Anime? Help us keep our site alive by donating or sharing the app!", link: "https://1anime.co/donate" },
    { text: "Have you tried customizing the app with Themes? Try Themes if you haven't!", link: "/settings" },
    { text: "Did you know? 1Anime secures your AniList account when you sync?", link: "/user/profile" },
    { text: "Join our Discord for some exciting events, giveaways and more!", link: "https://dsc.gg/1Anime" },
  ];

  const [randomText] = useState(getRandomText());

  function getRandomText() {
    const randomIndex = Math.floor(Math.random() * randomTexts.length);
    return randomTexts[randomIndex];
  }

    return (
        <div className='mx-3 bg-[#1a1a1f] px-5 py-3 rounded-lg text-bold flex flex-row items-center'>
 <svg width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>
<p className='text-[11px] text-[#bfc6d0] lg:max-w-[65%] line-clamp-3'>
        <a className="text-blue-500 hover:text-blue-600" href={randomText.link}>{randomText.text}</a>
      </p></div>
  );
};

export default RandomTextComponent;