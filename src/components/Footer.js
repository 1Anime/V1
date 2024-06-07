"use client"
import React from 'react'
import Link from 'next/link'
import { useTitle } from '@/lib/store';
import { useStore } from 'zustand';
import Image from 'next/image';

function Footer() {
    const animetitle = useStore(useTitle, (state) => state.animetitle);
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const handleToggle = () => {
        if (animetitle === 'english') {
            useTitle.setState({ animetitle: 'romaji' })
        } else {
            useTitle.setState({ animetitle: 'english' })
        }
    };

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
                                    
                                        <Link href="https://status.1anime.info" className="hover:text-white"> Status</Link>
                                    </li>
                                    <li>
                                        <Link href="https://1anime.co/proxy" className="hover:text-white"> Proxy</Link>
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
                    </span>
                    <div className="flex mt-4 lg:justify-center lg:mt-0 bg-gray-900 bg-opacity-80 rounded-full">
    <Link href="https://discord.gg/1Anime" target="_blank" className="hover:text-gray-900 dark:hover:text-white ms-5">
        <svg className="w-[22px] h-[22px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
            <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
        </svg>
        <span className="sr-only">Discord community</span>
    </Link>
    {/* Add Instagram, Twitter, and Reddit links below */}
    <Link href="https://www.instagram.com/1animeapp" target="_blank" className="hover:text-gray-900 dark:hover:text-white ms-5">        
<svg className="w-[22px] h-[22px]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24ZM24.0012 11.2C20.5249 11.2 20.0886 11.2152 18.7233 11.2773C17.3606 11.3397 16.4305 11.5555 15.6166 11.872C14.7747 12.1989 14.0606 12.6363 13.3491 13.348C12.6371 14.0595 12.1997 14.7736 11.8717 15.6152C11.5544 16.4294 11.3384 17.3598 11.2771 18.7219C11.216 20.0873 11.2 20.5238 11.2 24.0001C11.2 27.4764 11.2155 27.9114 11.2773 29.2767C11.34 30.6394 11.5557 31.5695 11.872 32.3834C12.1992 33.2253 12.6365 33.9394 13.3483 34.6509C14.0595 35.3629 14.7736 35.8013 15.615 36.1283C16.4294 36.4448 17.3598 36.6605 18.7222 36.7229C20.0876 36.7851 20.5236 36.8003 23.9996 36.8003C27.4762 36.8003 27.9111 36.7851 29.2765 36.7229C30.6391 36.6605 31.5703 36.4448 32.3848 36.1283C33.2264 35.8013 33.9394 35.3629 34.6506 34.6509C35.3626 33.9394 35.8 33.2253 36.128 32.3837C36.4427 31.5695 36.6587 30.6391 36.7227 29.277C36.784 27.9116 36.8 27.4764 36.8 24.0001C36.8 20.5238 36.784 20.0876 36.7227 18.7222C36.6587 17.3595 36.4427 16.4294 36.128 15.6155C35.8 14.7736 35.3626 14.0595 34.6506 13.348C33.9386 12.636 33.2266 12.1987 32.384 11.872C31.5679 11.5555 30.6373 11.3397 29.2746 11.2773C27.9092 11.2152 27.4746 11.2 23.9972 11.2H24.0012Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.8529 13.5067C23.1937 13.5062 23.574 13.5067 24.0012 13.5067C27.4188 13.5067 27.8239 13.519 29.1735 13.5803C30.4215 13.6374 31.0989 13.8459 31.5501 14.0211C32.1474 14.2531 32.5733 14.5304 33.021 14.9784C33.469 15.4264 33.7464 15.8531 33.9789 16.4505C34.1541 16.9011 34.3629 17.5785 34.4197 18.8265C34.481 20.1758 34.4944 20.5812 34.4944 23.9972C34.4944 27.4132 34.481 27.8186 34.4197 29.1679C34.3626 30.4159 34.1541 31.0933 33.9789 31.5439C33.7469 32.1413 33.469 32.5666 33.021 33.0144C32.573 33.4624 32.1477 33.7397 31.5501 33.9717C31.0994 34.1477 30.4215 34.3557 29.1735 34.4128C27.8242 34.4741 27.4188 34.4874 24.0012 34.4874C20.5833 34.4874 20.1782 34.4741 18.8289 34.4128C17.5809 34.3552 16.9035 34.1466 16.4521 33.9714C15.8547 33.7394 15.428 33.4621 14.98 33.0141C14.532 32.5661 14.2547 32.1405 14.0222 31.5429C13.847 31.0922 13.6382 30.4149 13.5814 29.1669C13.52 27.8175 13.5078 27.4122 13.5078 23.994C13.5078 20.5758 13.52 20.1726 13.5814 18.8233C13.6384 17.5753 13.847 16.8979 14.0222 16.4467C14.2542 15.8494 14.532 15.4227 14.98 14.9747C15.428 14.5267 15.8547 14.2494 16.4521 14.0168C16.9033 13.8408 17.5809 13.6328 18.8289 13.5755C20.0097 13.5222 20.4673 13.5062 22.8529 13.5035V13.5067ZM30.8338 15.632C29.9858 15.632 29.2978 16.3193 29.2978 17.1675C29.2978 18.0155 29.9858 18.7035 30.8338 18.7035C31.6818 18.7035 32.3698 18.0155 32.3698 17.1675C32.3698 16.3195 31.6818 15.632 30.8338 15.632ZM24.0012 17.4267C20.371 17.4267 17.4278 20.37 17.4278 24.0001C17.4278 27.6303 20.371 30.5722 24.0012 30.5722C27.6314 30.5722 30.5735 27.6303 30.5735 24.0001C30.5735 20.37 27.6314 17.4267 24.0012 17.4267Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.0012 19.7334C26.3575 19.7334 28.2679 21.6436 28.2679 24.0001C28.2679 26.3564 26.3575 28.2668 24.0012 28.2668C21.6446 28.2668 19.7345 26.3564 19.7345 24.0001C19.7345 21.6436 21.6446 19.7334 24.0012 19.7334Z" fill="white"/>
</svg>
    </Link>
    <Link href="https://twitter.com/@1animeapp" target="_blank" className="hover:text-gray-900 dark:hover:text-white ms-5">  
<svg className="w-[22px] h-[22px]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24ZM23.2812 19.5075L23.3316 20.338L22.4922 20.2363C19.4369 19.8465 16.7677 18.5245 14.5013 16.3043L13.3934 15.2027L13.108 16.0162C12.5036 17.8296 12.8897 19.7448 14.1488 21.0328C14.8203 21.7446 14.6692 21.8463 13.5109 21.4226C13.108 21.287 12.7554 21.1854 12.7219 21.2362C12.6044 21.3548 13.0073 22.8971 13.3262 23.5072C13.7627 24.3546 14.6524 25.1851 15.6261 25.6766L16.4487 26.0664L15.475 26.0833C14.5349 26.0833 14.5013 26.1003 14.6021 26.4562C14.9378 27.5578 16.264 28.7272 17.7413 29.2357L18.7822 29.5916L17.8756 30.1339C16.5326 30.9135 14.9546 31.3542 13.3766 31.3881C12.6211 31.405 12 31.4728 12 31.5237C12 31.6931 14.0481 32.6422 15.24 33.0151C18.8157 34.1167 23.063 33.6422 26.2526 31.7609C28.5189 30.422 30.7852 27.7612 31.8428 25.1851C32.4136 23.8123 32.9844 21.304 32.9844 20.1007C32.9844 19.3211 33.0347 19.2194 33.9748 18.2872C34.5288 17.7449 35.0492 17.1517 35.15 16.9822C35.3178 16.6602 35.3011 16.6602 34.4449 16.9483C33.018 17.4568 32.8165 17.389 33.5216 16.6263C34.042 16.084 34.6631 15.101 34.6631 14.8129C34.6631 14.762 34.4113 14.8468 34.1259 14.9993C33.8238 15.1688 33.1523 15.423 32.6486 15.5756L31.7421 15.8637L30.9195 15.3044C30.4663 14.9993 29.8283 14.6604 29.4926 14.5587C28.6364 14.3214 27.327 14.3553 26.5548 14.6265C24.4563 15.3891 23.1301 17.3551 23.2812 19.5075Z" fill="white"/>
</svg>
    </Link>
    <Link href="https://www.reddit.com/r/1animeapp" target="_blank" className="hover:text-gray-900 dark:hover:text-white ms-5">
    <svg className="w-[22px] h-[22px]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48ZM41.6 23.6875C41.6 21.4925 39.8065 19.7065 37.6014 19.7065C36.5928 19.7065 35.6726 20.0836 34.9686 20.6993C32.4633 19.097 29.1511 18.0544 25.4832 17.8718L27.412 11.8024L32.6744 13.0362C32.7334 14.8042 34.1927 16.2259 35.9834 16.2259C37.8109 16.2259 39.2979 14.7459 39.2979 12.926C39.2979 11.1062 37.8105 9.62608 35.9834 9.62608C34.6559 9.62608 33.5117 10.4087 32.9824 11.5327L27.0691 10.1476C26.6774 10.0561 26.2795 10.2807 26.1595 10.6629L23.8762 17.8481C19.971 17.9244 16.4282 18.9744 13.7731 20.6467C13.0769 20.0614 12.1782 19.7065 11.1986 19.7065C8.99349 19.7069 7.2 21.4925 7.2 23.6875C7.2 25.0851 7.92865 26.3137 9.02555 27.0236C8.96965 27.3801 8.93955 27.7413 8.93955 28.1067C8.93955 33.7675 15.843 38.3731 24.3296 38.3731C32.8155 38.3731 39.7197 33.7675 39.7197 28.1067C39.7197 27.7677 39.6939 27.4326 39.6458 27.1011C40.8127 26.4067 41.6 25.1388 41.6 23.6875Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M39.2241 25.5202C38.6615 24.0782 37.6374 22.7593 36.2664 21.6357C36.6511 21.3862 37.1092 21.2399 37.6018 21.2399C38.9575 21.2399 40.0602 22.3378 40.0602 23.6875C40.0594 24.4172 39.735 25.0718 39.2241 25.5202Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M35.9834 11.1603C36.9619 11.1603 37.7578 11.953 37.7578 12.9272C37.7578 13.9013 36.9619 14.6937 35.9834 14.6937C35.0046 14.6937 34.2087 13.9013 34.2087 12.9272C34.2087 11.953 35.0046 11.1603 35.9834 11.1603Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M38.1795 28.1075C38.1795 32.9222 31.9657 36.8401 24.3296 36.8401C16.6924 36.8401 10.4797 32.9226 10.4797 28.1075C10.4797 27.9378 10.4891 27.7705 10.504 27.6035C10.5505 27.0917 10.6693 26.5912 10.8503 26.1063C11.3198 24.8492 12.2204 23.6957 13.4506 22.7122C13.8443 22.3973 14.2708 22.1 14.7273 21.8225C17.2194 20.3082 20.6039 19.3741 24.3296 19.3741C28.1093 19.3741 31.5396 20.3346 34.0398 21.8879C34.4976 22.1716 34.9229 22.4759 35.3146 22.7978C36.4959 23.7665 37.3594 24.8959 37.8148 26.1238C37.9943 26.6103 38.1131 27.1112 38.1577 27.6241C38.1713 27.7849 38.1795 27.9452 38.1795 28.1075ZM21.6171 26.2616C21.6171 24.9687 20.564 23.884 19.265 23.884C17.9664 23.884 16.8773 24.9687 16.8773 26.2616C16.8773 27.5541 17.9668 28.6037 19.265 28.6037C20.564 28.6022 21.6171 27.5541 21.6171 26.2616ZM29.5706 23.8832C28.272 23.8832 27.1794 24.9675 27.1794 26.2604C27.1794 27.5537 28.272 28.6026 29.5706 28.6026C30.8695 28.6026 31.9234 27.5545 31.9234 26.2604C31.9227 24.9667 30.8695 23.8832 29.5706 23.8832ZM28.906 31.9379C28.0347 32.8042 26.5676 33.225 24.418 33.225C24.4113 33.225 24.4055 33.2269 24.3992 33.2269C24.3926 33.2269 24.3871 33.225 24.3808 33.225C22.2308 33.225 20.7634 32.8042 19.8932 31.9379C19.5926 31.6382 19.1047 31.6382 18.8041 31.9379C18.5031 32.238 18.5031 32.7233 18.8041 33.0218C19.9773 34.1901 21.8016 34.7587 24.3808 34.7587C24.3875 34.7587 24.393 34.7564 24.3992 34.7564C24.4055 34.7564 24.4113 34.7587 24.418 34.7587C26.9968 34.7587 28.8216 34.1901 29.9959 33.0226C30.2973 32.7225 30.2973 32.2376 29.9966 31.9387C29.6953 31.639 29.2074 31.639 28.906 31.9379Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.74018 23.6875C8.74018 22.3382 9.84294 21.2399 11.1982 21.2399C11.656 21.2399 12.0836 21.3679 12.4515 21.5862C11.0798 22.6958 10.0532 24.0016 9.47431 25.4287C9.02125 24.9846 8.74018 24.3686 8.74018 23.6875Z" fill="white"/>
</svg>
</Link>
</div>
     <div className="flex items-center ml-5">
                            <label className="relative cursor-pointer">
                                {animetitle && (
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={animetitle === 'english'}
                                        onChange={handleToggle}
                                    />
                                )}
                                <div className="w-[40px] text-xs h-4 flex items-center bg-[#EAEEFB] rounded-full  peer-checked:text-[#18181b] text-[black] font-bold after:flex after:items-center after:justify-center peer after:content-['JP'] peer-checked:after:content-['EN'] peer-checked:after:translate-x-3/4 after:absolute peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#EAEEFB]">
                                </div>
                            </label>
                        </div>
                    </div>
            </footer>
        </div>
    )
}

export default Footer
