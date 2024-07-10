"use client"
import React, { useEffect, useState } from 'react'
import { getSources } from '@/lib/getData';
import PlayerEpisodeList from './PlayerEpisodeList';
import Player from './VidstackPlayer/player';
import { Spinner } from '@vidstack/react';
import { toast } from 'sonner';
import { useTitle, useNowPlaying, useDataInfo } from '../../lib/store';
import { useStore } from "zustand";
import { ShareIcon,InformationCircleIcon,ArrowDownTrayIcon,BookmarkIcon } from "@heroicons/react/24/solid";
import { AniListIcon,MyAnimeListIcon } from "@/lib/SvgIcons";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import Link from 'next/link'
import Addtolist from '@/components/details/Addtolist';
import { signIn } from 'next-auth/react';
import Image from 'next/image'
import RandomTextComponent from '@/components/RandomTextComponent';


function PlayerComponent({ id, epId, provider, epNum, subdub, data, session, savedep, list, setList, url }) {
    const [openlist, setOpenlist] = useState(false);
    const animetitle = useStore(useTitle, (state) => state.animetitle);
    const [episodeData, setepisodeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [groupedEp, setGroupedEp] = useState(null);
    const [src, setSrc] = useState(null);
    const [subtitles, setSubtitles] = useState(null);
    const [thumbnails, setThumbnails] = useState(null);
    const [skiptimes, setSkipTimes] = useState(null);
    const [error, setError] = useState(false);

  function Handlelist() {
    setOpenlist(!openlist);
  }

    useEffect(() => {
        useDataInfo.setState({ dataInfo: data });
        const fetchSources = async () => {
            setError(false);
            setLoading(true);
            try {
                const response = await getSources(id, provider, epId, epNum, subdub);

                // console.log(response)
                if (!response?.sources?.length > 0) {
                    toast.error("Failed to load episode. Please try again later.");
                    setError(true);
                }
                const sources = response?.sources?.find(i => i.quality === "default" || i.quality === "auto")?.url || response?.sources?.find(i => i.quality === "1080p")?.url || response?.sources?.find(i => i.type === "hls")?.url;
                setSrc(sources);
                const download = response?.download;

                let subtitlesArray = response.tracks || response.subtitles;
                const reFormSubtitles = subtitlesArray?.map((i) => ({
                    src: i?.file || i?.url,
                    label: i?.label || i?.lang,
                    kind: i?.kind || (i?.lang === "Thumbnails" ? "thumbnails" : "subtitles"),
                    default: i?.default || (i?.lang === "English"),
                }));
                

                setSubtitles(reFormSubtitles?.filter((s) => s.kind !== 'thumbnails'));
                setThumbnails(reFormSubtitles?.filter((s) => s.kind === 'thumbnails'));

                const skipResponse = await fetch(
                    `https://api.aniskip.com/v2/skip-times/${data?.idMal}/${parseInt(epNum)}?types[]=ed&types[]=mixed-ed&types[]=mixed-op&types[]=op&types[]=recap&episodeLength=`
                );

                const skipData = await skipResponse.json();
                const op = skipData?.results?.find((item) => item.skipType === 'op') || null;
                const ed = skipData?.results?.find((item) => item.skipType === 'ed') || null;
                const episodeLength = skipData?.results?.find((item) => item.episodeLength)?.episodeLength || 0;

                const skiptime = [];

                if (op?.interval) {
                    skiptime.push({
                        startTime: op.interval.startTime ?? 0,
                        endTime: op.interval.endTime ?? 0,
                        text: 'Opening',
                    });
                }
                if (ed?.interval) {
                    skiptime.push({
                        startTime: ed.interval.startTime ?? 0,
                        endTime: ed.interval.endTime ?? 0,
                        text: 'Ending',
                    });
                } else {
                    skiptime.push({
                        startTime: op?.interval?.endTime ?? 0,
                        endTime: episodeLength,
                        text: '',
                    });
                }

                const episode = {
                    download: download || null,
                    skiptimes: skiptime || [],
                    epId: epId || null,
                    provider: provider || null,
                    epNum: epNum || null,
                    subtype: subdub || null,
                };

                useNowPlaying.setState({ nowPlaying: episode });
                setSkipTimes(skiptime);
                // console.log(skipData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error("Failed to load episode. Please try again later.");
                const episode = {
                    download: null,
                    skiptimes: [],
                    epId: epId || null,
                    provider: provider || null,
                    epNum: epNum || null,
                    subtype: subdub || null,
                };

                useNowPlaying.setState({ nowPlaying: episode });
                setLoading(false);
            }
        };
        fetchSources();
    }, [id, provider, epId, epNum, subdub]);

    const handleShareClick = async () => {
        try {
          if (navigator.share) {
            await navigator.share({
              title: `Watch Now - ${data?.title?.english}`,
               text: `Watch [${data?.title?.romaji}] and more on 1Anime. Join us for endless anime entertainment`,
              url: window.location.href,
            });
          } else {
            // Web Share API is not supported, provide a fallback or show a message
            alert("Web Share API is not supported in this browser.");
          }
        } catch (error) {
          console.error("Error sharing:", error);
        }
      };


    useEffect(() => {
        if (episodeData) {
            const previousep = episodeData?.find(
                (i) => i.number === parseInt(epNum) - 1
            );
            const nextep = episodeData?.find(
                (i) => i.number === parseInt(epNum) + 1
            );
            const currentep = episodeData?.find(
                (i) => i.number === parseInt(epNum)
            );
            const epdata = {
                previousep,
                currentep,
                nextep,
            }
            setGroupedEp(epdata);
        }
    }, [episodeData, epId, provider, epNum, subdub]);


  const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className='xl:w-[99%]'>
            <div>
                <div className='mb-2'>
                    {!loading && !error ? (
                        <div className='h-full w-full aspect-video overflow-hidden'>
                            <Player dataInfo={data} id={id} groupedEp={groupedEp} session={session} savedep={savedep} src={src} subtitles={subtitles} thumbnails={thumbnails} skiptimes={skiptimes} />
                        </div>
                    ) : (
                        <div className="h-full w-full rounded-[8px] relative flex items-center text-xl justify-center aspect-video border border-solid border-white border-opacity-10">
                            {!loading && error ? (
                                <div className='text-sm sm:text-base px-2 flex flex-col items-center text-center'>
                                    <p className='mb-2 text-xl'>(╯°□°)╯︵ ɹoɹɹƎ</p>
                                    <p>Failed to load episode. Please try again later.</p>
                                    <p>If the problem persists, consider changing servers. or try <a href="https://1anime.co/proxy.html">1Anime Proxy</a></p>
                                </div>) : (
                                <div className="pointer-events-none absolute inset-0 z-50 flex h-full w-full items-center justify-center">
                                    <Spinner.Root className="text-black animate-spin opacity-100" size={84}>
                                        <Spinner.Track className="opacity-25" width={8} />
                                        <Spinner.TrackFill className="opacity-75" width={8} />
                                    </Spinner.Root>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className=' my-[9px] mx-2 sm:mx-1 px-1 lg:px-0'>
              <RandomTextComponent />
                    <h2 className='text-[20px]'>{data?.title?.[animetitle] || data?.title?.romaji}</h2>
                    <h2 className='text-[16px] text-[#ffffffb2]'>YOU'RE WATCHING:{` EPISODE ${epNum} `}</h2>
                </div>
                <div className="mx-1 bg-[#1a1a1f] text-xs font-bold px-2 py-1 rounded-lg flex items-center justify-center">
                <div>
          <a
                            type="button"
                            rel="nofollow"
                            href={`/anime/info/${data.id}`}
                            className="bg-[#FFFFFF] text-black text-xs font-bold px-2 py-1 rounded-md"
                        >
                            <span className="absolute pointer-events-none z-40 opacity-0 -translate-y-8 group-hover:-translate-y-10 group-hover:opacity-100 font-karla shadow-tersier shadow-md whitespace-nowrap bg-secondary px-2 py-1 rounded transition-all duration-200 ease-out">
                                See Anime Info
                            </span>
                            <InformationCircleIcon className="w-7 h-7" /></a>
                            <a
                            type="button"
                            target="_blank"
            rel="noopener noreferrer"
                            href={`https://anilist.co/anime/${id}`}
                            className="bg-[#FFFFFF] text-black text-xs font-bold px-2 py-1 rounded-md"
                        >
                            <span className="absolute pointer-events-none z-40 opacity-0 -translate-y-8 group-hover:-translate-y-10 group-hover:opacity-100 font-karla shadow-tersier shadow-md whitespace-nowrap bg-secondary px-2 py-1 rounded transition-all duration-200 ease-out">
                                AniList
                            </span>
                            <AniListIcon className="w-7 h-7" /></a>
                        
                            <a
                            type="button"
                            target="_blank"
            rel="noopener noreferrer"
                            href={`https://myanimelist.net/anime/${data?.idMal}`}
                            className="bg-[#FFFFFF] text-black text-xs font-bold px-2 py-1 rounded-md"
                        >
                            <span className="absolute pointer-events-none z-40 opacity-0 -translate-y-8 group-hover:-translate-y-10 group-hover:opacity-100 font-karla shadow-tersier shadow-md whitespace-nowrap bg-secondary px-2 py-1 rounded transition-all duration-200 ease-out">
                                MAL
                            </span>
                            <MyAnimeListIcon className="w-7 h-7" /></a> <a
                            type="button"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`http://1animedownloader.kesug.com/${epId}`}
                            className="bg-[#FFFFFF] text-black text-xs font-bold px-2 py-1 rounded-md"
                        >
                            <span className="absolute pointer-events-none z-40 opacity-0 -translate-y-8 group-hover:-translate-y-10 group-hover:opacity-100 font-karla shadow-tersier shadow-md whitespace-nowrap bg-secondary px-2 py-1 rounded transition-all duration-200 ease-out">
                                Download Anime
                            </span>
                            <ArrowDownTrayIcon className="w-7 h-7" /></a>


   <a
            type="button"
            className="bg-[#FFFFFF] text-black text-xs font-bold px-2 py-1 rounded-md"
            onClick={handleShareClick}
          >
            <span className="absolute pointer-events-none z-40 opacity-0 -translate-y-8 group-hover:-translate-y-10 group-hover:opacity-100 font-karla shadow-tersier shadow-md whitespace-nowrap bg-secondary px-2 py-1 rounded transition-all duration-200 ease-out">
              Share Anime
            </span>
            <ShareIcon className="w-7 h-7" />
      </a>  <button className="bg-[#FFFFFF] text-black text-xs font-bold px-2 py-1 rounded-md" onClick={Handlelist}><BookmarkIcon className="w-7 h-7" /></button>
            {session?.user ? (
              <Modal isOpen={openlist} onOpenChange={Handlelist} size={"3xl"} backdrop="opaque" hideCloseButton={true} placement="center" radius="sm" scrollBehavior="outside"
                classNames={{
                  body: "p-0",
                }}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalBody className=''>
                        <div className='relative'>
                          <div
                            className="w-full !h-40 brightness-50 rounded-t-md"
                            style={{ backgroundImage: `url(${data?.bannerImage || data?.coverImage.extraLarge || null})`, backgroundPosition: "center", backgroundSize: "cover", height: "100%", }}
                          ></div>
                          <div className='absolute z-10 bottom-1 sm:bottom-0 sm:top-[65%] left-0 sm:left-3 md:left-10 flex flex-row items-center'>
                            <Image src={data?.coverImage?.extraLarge} alt='Image' width={120} height={120} className="hidden sm:flex rounded-md" priority={true}/>
                            <div className='px-2 sm:px-4 mb-4 font-medium !text-xl text-white max-w-full line-clamp-2'>{data?.title?.[animetitle] || data?.title?.romaji}</div>
                          </div>
                        </div>
                        <div className='mt-2 sm:mt-20 md:px-[5%] px-[2%] mb-2'>
                          <Addtolist session={session} setList={setList} list={list}
                            id={data?.id} eplength={data?.episodes || data?.nextAiringEpisode?.episode - 1 || 24} Handlelist={Handlelist} />
                        </div>
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
            ) : (
              <Modal isOpen={openlist} onOpenChange={Handlelist} size={"xs"} backdrop="opaque" hideCloseButton={true} placement="center" radius="sm"
                classNames={{
                  body: "py-6 px-3",
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalBody className=''>
                        <div className="text-center flex flex-col justify-center items-center">
                          <p className="text-lg mb-3">Login to edit your list.</p>
                          <button className="font-semibold outline-none border-none py-2 px-4 bg-[#4d148c] rounded-md flex items-center" onClick={() => signIn('AniListProvider')}>
                            <Image alt="anilist-icon" loading="lazy" width="25" height="25" src="/anilist.svg" className='mr-2' />
                            Login With Anilist</button>
                        </div>
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
            )}
          </div>
          </div> 
              </div>
            <div className='w-[98%] mx-auto lg:w-full'>
                <PlayerEpisodeList id={id} data={data} setwatchepdata={setepisodeData} onprovider={provider} epnum={epNum} />
            </div>
        </div>
    )
}

export default PlayerComponent
