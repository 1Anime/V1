"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";

const newVersion = "v.next.7.30"

const releaseLogs = [
    // {
    //     version: "V2.0.11",
    //     changes: [
    //         "Added Changelog section",
    //         "Fixed: Save progress not working properly",
    //         "Fixed: Episode section not showing data",
    //         "Fixed: Small bugs",
    //     ],
    // },
    // {
    //     version: "V2.0.12",
    //     changes: [
    //         "Added Anilist Progress Tracking",
    //         "New Add to list option in info page",
    //         "Auto episode tracking after watching 90% of video",
    //         "Fixed: Now u can change provider without losing progress",
    //         "Fixed: Settings options in player for mobile devices",
    //         "View Github for more information",
    //     ],
    // },
    // {
    //     version: "V2.1.1",
    //     changes: [
    //         "Added new provider gogobackup",
    //         "Major Performance Improvement",
    //         "Fixed: episode section and gogoanime Provider",
    //         "Fixed: Autoskip feature",
    //         "View Github for more information",
    //     ],
    // },
    // {
    //     version: "V2.1.4",
    //     changes: [
    //         "Added Profile Page",
    //         "Will be adding Anilist wrapped to show more info",
    //         "Now Continue watching can be deleted on mobile also (for now)",
    //         "View Github for more information",
    //     ],
    // },
    {
        version: "v.next.7.30",
        changes: [
            "AniList is back up!",
            "Join our new discord: https://dsc.gg/1anime",
            "Report any bugs and request features in Feedback or Discord. It's FREE!",
            ],
        },
];

export default function Changelogs() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [open, setopen] = useState(false);

    function closeModal() {
        localStorage.setItem("version", newVersion);
        setopen(false);
    }

    function getVersion() {
        let version = localStorage.getItem("version");
        if (version !== newVersion) {
            setopen(true);
        }
    }

    useEffect(() => {
        getVersion();
    }, []);

    return (
        <>
            <Modal isOpen={open} onOpenChange={closeModal} backdrop="opaque" hideCloseButton={true} placement="center">
                <ModalContent className="py-4">
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center gap-2">
                                        <p className="text-lg sm:text-xl">NEXT Changelogs</p>
                                        <div className="flex gap-3 items-center">
                                            {/* Discord Icon */}
                                            <Link
                                                href="https://dsc.gg/1anime"
                                                target="_blank"
                                                className="w-6 h-6 hover:opacity-75"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    preserveAspectRatio="xMidYMid"
                                                    viewBox="0 -28.5 256 256"
                                                >
                                                    <path
                                                        fill="#fff"
                                                        d="M216.856 16.597A208.502 208.502 0 00164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 00-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0079.735 175.3a136.413 136.413 0 01-21.846-10.632 108.636 108.636 0 005.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 005.355 4.237 136.07 136.07 0 01-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36zM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18z"
                                                    ></path>
                                                </svg>
                                            </Link>
                                                {/* Just a Check */}
                                                <Link
                                                href="https://1anime.co"
                                                target="_blank"
                                                className="w-6 h-6 hover:opacity-75"
                                            >
                                           <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"/>
</svg>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-400">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M18.458 3.11A1 1 0 0 1 19 4v16a1 1 0 0 1-1.581.814L12 16.944V7.056l5.419-3.87a1 1 0 0 1 1.039-.076ZM22 12c0 1.48-.804 2.773-2 3.465v-6.93c1.196.692 2 1.984 2 3.465ZM10 8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6V8Zm0 9H5v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3Z" clip-rule="evenodd"/>
</svg>
  Welcome to 1Anime, Here's the latest updates   </p>
                                    </div>
                                    <div className="my-3 flex items-center justify-evenly flex-col">
                                        <p className="whitespace-nowrap font-medium mx-2 font-inter">
                                            Version - {newVersion}
                                        </p>
                                        <div className="mt-1 w-full h-[1px] bg-white/10" />
                                    </div>
                                    {releaseLogs.map((log) => (
                                        <div key={log.version}>
                                            {log.changes.map((i, index) => (
                                                <p className="text-sm my-1" key={index}>- {i}</p>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-[#4D148C] rounded-lg" onPress={onClose}>
                                Okay, got it!     <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
</svg>
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
