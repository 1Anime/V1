"use client"
import React, { useRef, useState } from 'react';
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from '../../styles/Animecard.module.css';
import { useDraggable } from 'react-use-draggable-scroll';

const g = [
  {
    name: "Action",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20958-HuFJyr54Mmir.jpg",
  },
  {
    name: "Comedy",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21202-TfzXuWQf2oLQ.png",
  },
  {
    name: "Horror",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-FlochcFsyoF4.png",
  },
  {
    name: "Romance",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx124080-h8EPH92nyRfS.jpg",
  },
  {
    name: "Music",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx130003-5Y8rYzg982sq.png",
  },
  {
    name: "Sports",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20464-eW7ZDBOcn74a.png",
  },
];

export default function Genres() {
  return (
    <div className={styles.animecard}>
      <div className={styles.cardhead}>
      <span className={styles.bar}></span>
        <h1 className={styles.headtitle}>Top Genres</h1>
      </div>
      <div className={styles.animeitems}>
        <div className={className={styles.cardcontainer}/>
        <div className="flex lg:gap-8 gap-3 lg:p-10 py-8 px-5 z-30 overflow-y-hidden overflow-x-scroll snap-x snap-proximity scrollbar-none relative">
          <div className="flex lg:gap-10 gap-4">
            {g.map((a, index) => (
              <Link
                href={`/anime/catalog/?genres=${a.name}`}
                key={index}
                className="relative hover:shadow-lg hover:scale-105 duration-200 cursor-pointer ease-out h-[190px] w-[135px] lg:h-[265px] lg:w-[230px] rounded-md shrink-0"
              >
                <div className="bg-gradient-to-b from-transparent to-[#000000] h-[190px] w-[135px] lg:h-[265px] lg:w-[230px] rounded-md absolute flex justify-center items-end">
                  <h1 className="pb-7 lg:text-xl font-karla font-semibold">
                    {a.name}
                  </h1>
                </div>
                <Image
                  src={a.img}
                  alt="genres images"
                  width={1000}
                  height={1000}
                  className="object-cover shrink-0 h-[190px] w-[135px] lg:h-[265px] lg:w-[230px] rounded-md"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-[#000000] to-transparent z-40 absolute w-7 h-full right-0" />
      </div>
    </div>
  );
}