"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { Badge } from "@nextui-org/react";

function Footer() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    function getSeason(month) {
        if (month === 12 || month === 1 || month === 2) {
            return 'WINTER';
        } else if (month === 3 || month === 4 || month === 5) {
            return 'SPRING';
        } else if (month === 6 || month === 7 || month === 8) {
            return 'SUMMER';
        } else {
            return 'FALL';
        }
    }

    const format = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];

    function nextSeason(currentSeason) {
        const currentSeasonIndex = format.indexOf(currentSeason);
        const nextSeasonIndex = (currentSeasonIndex + 1) % format.length;
        return format[nextSeasonIndex];
    }

    return (
        <div>
            <footer className="bg-[#151518] mt-10">
                <div className="mx-auto w-full lg:max-w-[85%] p-4 py-6 lg:pt-8 lg:pb-3">
                    <div className="lg:flex lg:justify-between">
                        <div className="mb-6 lg:mb-0 flex flex-col lg:flex-row lg:items-center lg:gap-6">
                            <Link href="/" className="flex items-center w-fit">
                                {/* <p className={`aniplay self-center text-3xl font-medium whitespace-nowrap dark:text-white`}>
                                    ANIPLAY
                                    </p> */}
                                    <Image src='https://1anime.co/logo.svg' width={50} height={50} className="w-32 h-20 "/>
                            </Link>
                            <p className="lg:text-[0.8rem] text-[0.7rem] text-[#ffffffb2] lg:w-[480px]">
                                This site does not store any files on our server, we are linked
                                to the media which is hosted on 3rd party services.
                            </p>
                            <button className="bg-white text-black font-medium py-2 px-3 rounded-lg">
           🟢 Status: Operational
          </button>
                        </div>
                        <div className="grid grid-cols-2 lg:gap-16 sm:gap-6 sm:grid-cols-2">
                            <div>
                                <ul className=" font-semibold flex flex-col gap-2 lg:text-[0.85rem] text-[0.7rem] text-[#ffffffb2] ">
                                    <li className="">
                                        <Link href={`/anime/catalog?season=${getSeason(month + 1)}&year=2024`} className="hover:text-white">This Season</Link>
                                    </li>
                                    <li className="">
                                        <Link href={`/anime/catalog?season=${nextSeason(getSeason(month + 1))}&year=2024`} className="hover:text-white">Upcoming Season</Link>
                                    </li>
                                    <li>
                                        <Link href="/anime/catalog?format=MOVIE" className="hover:text-white"> Movies</Link>
                                    </li>
                                    <li>
                                        <Link href="/anime/catalog?format=TV" className="hover:text-white"> TV Shows</Link>
                                    </li>
                                    <li>
                                        <Link disabled href="#" className="hover:text-white"> Manga (Unavailable)</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul className="font-semibold flex flex-col gap-2 lg:text-[0.85rem] text-[0.7rem] text-[#ffffffb2]">
    <li>
                                        <Link href="https://ko-fi.com/1Anime" target='_blank' className="hover:text-white !font-semibold !text-[0.8rem]">Donate</Link>
                                      <li>
                                    <li>
                                        <Link href="/dmca" className="hover:text-white"> DMCA & Privacy Policy</Link>
                                    </li>
                                    </li>
                                    <li>
                                        <Link href="https://1anime.co/proxy" className="hover:text-white"> Proxy</Link>
                                    </li>
                                    <li>
                                        <Link href="https://linktr.ee/1anime" className="hover:text-white"> Contact & Socials</Link>
                                    </li>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-tersier border-t border-white/5 mt-2'></div>
                <div className="mx-auto w-full lg:max-w-[83%] lg:flex lg:items-center lg:justify-between lg:text-[0.8rem] text-[0.7rem] text-[#ffffffb2] py-3">
                    <span className="sm:text-center ms-5 lg:ms-0">© {year} <Link href="/" className="hover:text-white">1Anime</Link> | <span className="font-bold" >Aniplay + 1Anime Development Team</span>
                    </span></div></footer>
        </div>
    )
}

export default Footer
