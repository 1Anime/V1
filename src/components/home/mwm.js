import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from '../../styles/Animecard.module.css';
import { useDraggable } from 'react-use-draggable-scroll';

const g = [
  {
    name: "Your Name",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21519-fPhvy69vnQqS.png",
    id: "21519",
  },
  {
    name: "A Silent Voice",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20954-UMb6Kl7ZL8Ke.jpg",
    id: "20954",
  },
  {
    name: "Violet Evergarden",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx109190-e8mv1qdmpjLW.jpg",
    id: "109190",
  },
  {
    name: "The Tunnel to Summer, the Exit of Goodbyes",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx142769-kNyyqpwC9gGV.jpg",
    id: "142769",
  },
  {
    name: "Summer Ghost",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx130050-7tcgvLV2w3xH.jpg",
    id: "130050",
  },
  {
    name: "Hello World",
    img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx106240-XeWQ4YhKzv7h.png",
    id: "106240",
  },
];

export default function MWMovies() {
  return (
    <div className={styles.animecard}>
      <div className={styles.cardhead}>
      <span className={styles.bar}></span>
        <h1 className={styles.headtitle}>Creators' Choice: Movies</h1>
      </div>
      <div className="flex xl:justify-center items-center relative">
        <div className="bg-gradient-to-[#000000] to-transparent z-40 absolute w-7 h-full left-0" />
        <div className="flex lg:gap-8 gap-3 lg:p-10 py-8 px-5 z-30 overflow-y-hidden overflow-x-hidden snap-x snap-proximity relative">
          <div className="flex lg:gap-10 gap-4">
            {g.map((a, index) => (
              <Link
                href={`anime/info/${a.id}`}
                key={index}
                className="relative hover:shadow-lg hover:scale-105 duration-200 cursor-pointer ease-out h-[190px] w-[135px] lg:h-[265px] lg:w-[230px] rounded-md shrink-0"
              >
                <div className="bg-gradient-to-b from-transparent to-[#000000] h-[180px] w-[105px] lg:h-[245px] lg:w-[210px] rounded-md absolute flex justify-center items-end">
                  <h1 className="pb-7 lg:text-xl font-semibold">
                    {a.name}
                  </h1>
                </div>
                <Image
                  src={a.img}
                  alt="genres images"
                  width={1000}
                  height={1000}
                  className="object-cover shrink-0 h-[180px] w-[105px] lg:h-[245px] lg:w-[210px] rounded-md"
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