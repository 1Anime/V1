"use client"
import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import Link from 'next/link';
import { CatalogIcon, LoginIcon, SettingsIcon, LogoutIcon } from '@/lib/SvgIcons';
import { signIn, signOut } from 'next-auth/react';
import { ArrowPathIcon,ClockIcon,ChatBubbleBottomCenterIcon,BookOpenIcon,BanknotesIcon,ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next-nprogress-bar';

function FloatingButton({session}) {
    const iconClasses = "w-5 h-5 text-xl text-default-500 pointer-events-none flex-shrink-0";
    const router = useRouter();
    return (
        <Dropdown backdrop="blur" placement="bottom-end" classNames={{
            base: "before:bg-default-200",
            content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
        }}>
            <DropdownTrigger>
                <button className="fixed bottom-5 right-4 w-[45px] h-[45px] text-white rounded-full flex items-center justify-center box-border outline-none bg-[#4d148c] shadow-2xl md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-category" width="26" height="26" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 4h6v6h-6z" />
                        <path d="M14 4h6v6h-6z" />
                        <path d="M4 14h6v6h-6z" />
                        <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    </svg>
                </button>
            </DropdownTrigger>
            <DropdownMenu variant="flat" aria-label="Profile Actions">
                <DropdownItem key="catalog" startContent={<CatalogIcon className={iconClasses} />}>
                    <Link href={`/anime/catalog`} className='w-full h-full block '>Explore</Link>
                </DropdownItem>
                <DropdownItem key="donate" startContent={<BanknotesIcon className={iconClasses} />}>
                    <Link href={`https://ko-fi.com/1Anime`} className='w-full h-full block '>Support us/Donate</Link>
                </DropdownItem>
                <DropdownItem key="AIChat" startContent={<ChatBubbleOvalLeftEllipsisIcon className={iconClasses} />}>
                    <Link href={`#`} className='w-full h-full block '>Waifu AI (Coming Soon)</Link>
                </DropdownItem>
                <DropdownItem key="chat" startContent={<ChatBubbleBottomCenterIcon className={iconClasses} />}>
                    <Link href={`https://discord.gg/1anime`} className='w-full h-full block '>Community*Discord</Link>
                </DropdownItem>
                <DropdownItem key="schedule" startContent={<ClockIcon className={iconClasses} />}>
                    <Link href={`/schedule`} className='w-full h-full block '>Schedule</Link>
                </DropdownItem>
                <DropdownItem key="random" startContent={<ArrowPathIcon className={iconClasses} />}>
                    <Link href={`/anime/random`} className='w-full h-full block '>Random Anime</Link>
                </DropdownItem>
                <DropdownItem disabled key="manga" startContent={<BookOpenIcon className={iconClasses} />}>
                    <Link disabled href={`#`} className='w-full h-full block '>Manga (Unavailable)</Link>
                </DropdownItem>
                <DropdownItem key="settings" startContent={<SettingsIcon className={iconClasses} />}>
                    <Link href={`/settings`} className='w-full h-full block '>Settings</Link>
                </DropdownItem>
                {session ? (
                    <DropdownItem key="logout" color="danger" startContent={<LogoutIcon className={iconClasses} />}>
                        <button className="font-semibold outline-none border-none w-full h-full block text-left" onClick={() => signOut('AniListProvider')}>Log Out</button>
                    </DropdownItem>
                ) : (
                    <DropdownItem key="login" color="danger" startContent={<LoginIcon className={iconClasses} />}>
                        <button className="font-semibold outline-none border-none w-full h-full block text-left" onClick={() => {
                router.push("/authv2/");
            }}>SignUp/LogIn</button>
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    )
}

export default FloatingButton
