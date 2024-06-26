"use client" // Layout fixed
import React, { useEffect } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextUiProvider } from "./NextUiProvider";
// import NextTopLoader from 'nextjs-toploader';
import Search from '@/components/search/Search'
import GoToTop from '@/components/GoToTop';
import localFont from 'next/font/local';
import Footer from '@/components/Footer';
import Script from "next/script";
import { getAuthSession } from './api/auth/[...nextauth]/route';
import { Toaster } from 'sonner'
import Changelogs from '../components/Changelogs';
import FloatingButton from '@/components/FloatingButton';
import { AuthProvider } from './SessionProvider';

const inter = Inter({ subsets: ['latin'] })
const myfont = localFont({ src: "../static-fonts/archivo.ttf" })

const APP_NAME = "1Anime"
const APP_DEFAULT_TITLE = "1Anime - Watch Anime, Read Manga WITHOUT ADS for FREE!";
const APP_DESCRIPTION = "Explore a vast collection of anime on 1Anime, your go-to destination for streaming the latest and classic anime series. Immerse yourself in captivating storylines, vibrant animation, and diverse genres. Discover a world of entertainment at your fingertips with , where every episode is an adventure.";

export const metadata = {
  metadataBase: new URL('https://1anime.co'),
  applicationName: APP_NAME,
  title: APP_DEFAULT_TITLE,
  description: APP_DESCRIPTION,
  keywords: [
    'anime',
    'anilist-tracker',
    'trending anime',
    'watch anime subbed',
    'watch anime dubbed',
    'latest anime episodes',
    'anime streaming sub',
    'anime streaming dub',
    'subbed anime online',
    'dubbed anime online',
    'new anime releases',
    'watch anime sub and dub',
    'anime episodes subtitles',
    'english dubbed anime',
    'subbed and dubbed series',
    'anime series updates',
    'anime episodes english sub',
    'anime episodes english dub',
    'latest subbed anime',
    'latest dubbed anime',
    'subbed anime streaming',
    'dubbed anime streaming',
    '1Anime latest anime',
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
};


export default async function RootLayout({ children }) {
  const session = await getAuthSession();


  useEffect(() => {
    // Check for the presence of a saved theme in the cookie when the component mounts
    const savedTheme = getCookie("selectedTheme");
    if (savedTheme) {
      // Apply the saved theme to the site's CSS
      if (savedTheme === 'purple') {
        document.documentElement.style.setProperty('color', '#8e50cc'); // Update primary color CSS variable
        document.documentElement.style.setProperty('background-color', '#2b183d');
      } else if (savedTheme === 'blue') {
        document.documentElement.style.setProperty('color', '#027AEF'); // Update primary color CSS variable
        document.documentElement.style.setProperty('background-color', '#222F50');
      } else if (savedTheme === 'green') {
        document.documentElement.style.setProperty('color', '#02EF12'); // Update primary color CSS variable
        document.documentElement.style.setProperty('background-color', '#305022');
      } else if (savedTheme === 'pink') {
        document.documentElement.style.setProperty('color', '#EF02ED'); // Update primary color CSS variable
        document.documentElement.style.setProperty('background-color', '#4E2250');
    } else if (savedTheme === 'yellow') {
        document.documentElement.style.setProperty('color', '#F0C335'); // Update primary color CSS variable
        document.documentElement.style.setProperty('background-color', '#504522');
    } else if (savedTheme === 'red') {
        document.documentElement.style.setProperty('color', '#C12727'); // Update primary color CSS variable
        document.documentElement.style.setProperty('background-color', '#502222');
    } else if (savedTheme === 'orange') {
        document.documentElement.style.setProperty('color', '#D28525'); // Update primary color CSS variable
        document.documentElement.style.setProperty('background-color', '#7B5B22');
      }
    }
  }, []);

  return (
    <html lang="en" className='dark text-foreground bg-background' suppressHydrationWarning={true}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-TYKL9CYSFS"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-TYKL9CYSFS');`}
      </Script>
      <script src="https://unpkg.com/@ungap/custom-elements-builtin" async />
      <script src="https://unpkg.com/x-frame-bypass" async />
      <head>
      <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                  s1.async=true;
                  s1.src='https://embed.tawk.to/6672bb5c19f6c616eadbe4fe/1i0o2nord';
                  s1.charset='UTF-8';
                  s1.setAttribute('crossorigin','*');
                  s0.parentNode.insertBefore(s1,s0);
                })();
              `,
            }}
          />
        <meta name="google-site-verification" content="9Cj5Gd0-OuGDtGb4HpRqNfBXy3FuFCcFNWSvTPOlTzE" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://1anime.co/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="https://1anime.co/android-chrome-192x192.png" />
        {/* <script src="https://kit.fontawesome.com/c189d5d7c5.js" crossOrigin="anonymous" async></script> */}
      </head>
      <body className={myfont.className}>
        <AuthProvider session={session}>
          <NextUiProvider>
            {children}
          </NextUiProvider>
        </AuthProvider>
        {/* <NextTopLoader color="#6E00FF" className="z-[99999]" /> */}
        <Toaster richColors={true} closeButton={true} theme="dark" />
        <Search />
        <Changelogs />
        <FloatingButton session={session} />
        <GoToTop />
        <Footer />
      </body>
    </html>
  )
}

const getCookie = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
};  
