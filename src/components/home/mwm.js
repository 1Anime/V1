import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from '../../styles/Animecard.module.css';
import { useDraggable } from 'react-use-draggable-scroll';

const g = [
  {
    name: "Your Name",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20958-HuFJyr54Mmir.jpg",
    href: "",
  },
  {
    name: "A Silent Voice",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21202-TfzXuWQf2oLQ.png",
    href: "",
  },
  {
    name: "Voilet Evergarden",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-FlochcFsyoF4.png",
    href: "",
  },
  {
    name: "The Tunnel to Summer, the Exit of Goodbyes",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx124080-h8EPH92nyRfS.jpg",
    href: "",
  },
  {
    name: "Summer Ghost",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx130003-5Y8rYzg982sq.png",
    href: "",
  },
  {
    name: "Hello World",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20464-eW7ZDBOcn74a.png",
    href: "",
  },
];

export default function MWMovies() {
  return (
    <div className={styles.animecard}>
      <div className={styles.cardhead}>
      <span className={styles.bar}></span>
        <h1 className={styles.headtitle}>Must Watch: Movies</h1>
      </div>
      <div className="scrollbar-width:none flex xl:justify-center items-center relative">
        <div className="scrollbar-width:none bg-gradient-to-[#000000] to-transparent z-40 absolute w-7 h-full left-0" />
        <div className="flex lg:gap-8 gap-3 lg:p-10 py-8 px-5 z-30 overflow-y-hidden overflow-x-scroll snap-x snap-proximity scrollbar-none relative">
          <div className="flex lg:gap-10 gap-4">
            {g.map((a, index) => (
              <Link
                href={`anime/info/${a.href}`}
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