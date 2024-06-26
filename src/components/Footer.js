"use client"
import React from 'react'
import Link from 'next/link'
import { useTitle } from '@/lib/store';
import { useStore } from 'zustand';
import Image from 'next/image';

    export default () => {

    const footerNavs = [
        {
            href: 'https://1anime.tawk.help/article/terms-of-service',
            name: 'Terms'
        },
        {
            href: '/dmca',
            name: 'DMCA'
        },
        {
            href: 'https://1anime.tawk.help/article/privacy',
            name: 'Privacy'
        },
        {
            href: 'https://1anime.co/proxy',
            name: 'Proxy & Partners'
        },
        {
            href: 'https://1anime.co/donate',
            name: 'Donate'
        },
        {
            href: 'https://linktr.ee/1anime',
            name: 'Contact/Socials'
        }
    ]
    return (
        <footer className="pt-10">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
            <div className="justify-between sm:flex">
                <div className="space-y-6">
                    <img src="https://1anime.co/logo.svg" className="w-32" />
                    <p className="max-w-md">
                    This site does not store any files on our server, we are linked to the media which is hosted on 3rd party services.
                    </p>
                    <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
                        {
                            footerNavs.map((item, idx) => (
                                <li className="text-gray-800 hover:text-gray-500 duration-150">
                                    <a key={idx} href={item.href}>
                                        {item.name}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="mt-6">
                    <p className="text-gray-700 font-semibold">Status</p>
                    <div className="flex items-center gap-3 mt-3 sm:block">
Operational
                        <a href="javascript:void()">
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-10 py-10 border-t md:text-center">
                <p>© 2024 1Anime Limited. All rights reserved.</p>
            </div>
        </div>
    </footer>
)
}

export default Footer
