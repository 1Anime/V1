"use client"
import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';

function AuthPage() {
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (status === 'authenticated') {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, [status])

    return (
        <div>
            <div className='relative h-[240px] md:h-[340px]'>
                <div className='absolute w-full h-full' style={{ backgroundImage: `url('https://media.discordapp.net/attachments/1241662959894396934/1250016856035561502/Watch_Anime_-_free_no_ads_1.png?ex=6669686a&is=666816ea&hm=fa218de742da306dd8de0a3b9aa750e94ec550b16f860f710b9d6dd9d70a785c&=&format=webp&quality=lossless')`, backgroundPosition: "center", backgroundSize: "cover", height: "100%" }}></div>
                <div className='bg-gradient-to-t from-black from-2% to-transparent absolute h-[101%] w-full z-[4] bottom-[-1px] inset-0'></div>
                <div className='absolute left-[2%] lg:left-[7%] xl:left-[9.5%] bottom-6 lg:bottom-10  z-[6] text-[35px] text-bold flex flex-row items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 mr-2 hover:animate-spin">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    1Anime Auth.v2</div>
            </div>
            {isLoggedIn ? (
            <div className='max-w-[94%] md:max-w-[95%] lg:max-w-[85%] xl:max-w-[80%] mx-auto min-h-[58vh] flex flex-col gap-6 mt-5'>
                                          <div className='mx-3 bg-[#1a1a1f] text-xs font-bold px-5 py-3 rounded-lg flex items-center w-[100%] justify-between'>
                            <div className='mr-4 w-full'>
                                <p className='text-[18px] md:text-[21px] font-medium'>Welcome to 1Anime!</p>
                                <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3'> You're signed in as {data?.user?.name}</p>
                                <button className="bg-white text-black font-medium py-2 px-3 rounded-lg"
            onClick={() => {
                router.push("/");
            }}
          >
            Go Home
          </button>
    
                            </div>
                    </div>        <div className='mx-3 bg-[#1a1a1f] px-5 py-3 rounded-lg text-bold flex flex-row items-center'>
                <svg width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
</svg>
                    <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3'> By signing up/logging in, you agree to our <a className="text-blue-500 hover:text-blue-600" href="">Privacy Policy + Terms of Service</a></p></div></div>
     ) : (   
        <div>   
        <div className='max-w-[94%] md:max-w-[95%] lg:max-w-[85%] xl:max-w-[80%] mx-auto min-h-[58vh] flex flex-col gap-6 mt-5'>
                                          <div className='mx-3 bg-[#1a1a1f] text-xs font-bold px-5 py-3 rounded-lg flex items-center w-[100%] justify-between'>
                            <div className='mr-4 w-full'>
                                <p className='text-[18px] md:text-[21px] font-medium'>Welcome to 1Anime!</p>
                                <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3'> Please choose a way to login/signup</p>
                                <button className="bg-white text-black font-medium py-2 px-3 rounded-lg"
            onClick={() => {
                router.push("/");
            }}
          >
            Go Home
          </button>           <button className="bg-white text-black font-medium py-2 px-3 rounded-lg"
                       onClick={() => signIn('AniListProvider')}
>
            Login with AniList
          </button>  
               <div className='mx-3 bg-[#1a1a1f] text-xs font-bold px-5 py-3 rounded-lg flex items-center w-[100%] justify-between'>
                            <div className='mr-4 w-full'>
                                <p className='text-[18px] md:text-[21px] font-medium'>User Agreenent</p>
                            <svg width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
</svg>
                    <p className='text-[11px] md:text-[13px] text-[#bfc6d0] lg:max-w-[55%] line-clamp-3'> By signing up/logging in, you agree to our <a className="text-blue-500 hover:text-blue-600" href="">Privacy Policy + Terms of Service</a></p></div></div>
              </div>
                </div></div></div>
                )}
        </div> 
            )
}

export default AuthPage
