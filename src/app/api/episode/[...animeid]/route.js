import { Anime } from "@/lib/anime";
import ky, { HTTPError } from "ky";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";

const bky = ky.extend({
  timeout: 11000,
});

interface EpisodeTitle {
  ja: string;
  en: string;
  "x-jat": string;
}

interface Episode {
  tvdbShowId: number;
  tvdbId: number;
  seasonNumber: number;
  episodeNumber: number;
  absoluteEpisodeNumber: number;
  title: EpisodeTitle;
  airDate: string;
  airDateUtc: string;
  runtime: number;
  overview: string;
  image: string;
  episode: string;
  anidbEid: number;
  length: number;
  airdate: string;
  rating: string;
  summary: string;
  finaleType?: string;
}

interface Episodes {
  [key: string]: Episode;
}

interface GogoAnimeInfo {
  id: string;
  title: string;
  url: string;
  genres: string[];
  totalEpisodes: number;
  image: string;
  releaseDate: string;
  description: string;
  subOrDub: string;
  type: string;
  status: string;
  otherName: string;
  episodes: GogoEpisode[];
}

interface GogoEpisode {
  id: string;
  number: number;
  url: string;
}

interface ConsumetEpisode {
  id: string;
  title: string | null;
  image: string | null;
  imageHash: string;
  number: number;
  createdAt: string | null;
  description: null;
  url: string;
}

interface ProviderEpisodes {
  sub: Omit<ConsumetEpisode, "imageHash">[];
  dub: Omit<ConsumetEpisode, "imageHash">[];
}

export interface ProviderData {
  providerId: string;
  episodes: ProviderEpisodes;
}

function convertString(input: string): string {
  if (!input.includes("$") && input.includes("?ep=")) return input;
  const parts = input.split("$");

  if (parts.length !== 4 || parts[1] !== "episode") {
    throw new Error("Invalid input format");
  }

  const mainPart = parts[0];
  const episodeNumber = parts[2];

  const output = `${mainPart}?ep=${episodeNumber}`;

  return output;
}

const getConsumet = async (id: string): Promise<ProviderData[]> => {
  const fetchGogoData = async (i: string, dub = false) => {
    try {
      const res = await bky.get(
        `${process.env.CONSUMET_API}/meta/anilist/episodes/${i}${
          dub ? "?dub=true" : ""
        }`
      );
      const data = await res.json<ConsumetEpisode[]>();

      if (data.length < 1) return [];
      return data.map((d) =>
        _.omit(d, ["image", "imageHash", "description", "createdAt"])
      );
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 404) {
        return [];
      } else {
        console.error(
          "An error occurred while fetching anime from consumet",
          error
        );
        return [];
      }
    }
  };

  const fetchHiAnime = async (i: string) => {
    try {
      const res = await bky.get(
        `${process.env.CONSUMET_API}/meta/anilist/episodes/${i}?provider=zoro`
      );
      const data = await res.json<ConsumetEpisode[]>();
      if (data.length < 1) return [];
      return data
        .map((d) =>
          _.omit(d, ["image", "imageHash", "description", "createdAt"])
        )
        .map((d) => ({
          ...d,
          id: convertString(d.id!),
        }));
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 404) {
        return [];
      } else {
        console.error(
          "An error occurred while fetching anime from consumet",
          error
        );
        return [];
      }
    }
  };

  try {
    const [dub, sub, hi] = await Promise.all([
      fetchGogoData(id, true),
      fetchGogoData(id),
      fetchHiAnime(id),
    ]);

    const zoroDub = dub.length > 0 ? hi : [];

    return [
      {
        providerId: "gogoanime",
        episodes: {
          sub: (sub ?? []) as _.Omit<ConsumetEpisode, "imageHash">[],
          dub: (dub ?? []) as _.Omit<ConsumetEpisode, "imageHash">[],
        },
      },
      {
        providerId: "hianime",
        episodes: {
          sub: (hi ?? []) as _.Omit<ConsumetEpisode, "imageHash">[],
          dub: zoroDub as _.Omit<ConsumetEpisode, "imageHash">[],
        },
      },
    ];
  } catch (error) {
    console.error("An error occurred while fetching anime data", error);
    return [
      {
        providerId: "gogoanime",
        episodes: {
          sub: [],
          dub: [],
        },
      },
      {
        providerId: "hianime",
        episodes: {
          sub: [],
          dub: [],
        },
      },
    ];
  }
};

const getMadaraMappings = async (id: string) => {
  try {
    const res = await bky.get(`https://api-mappings.madara.live/anime/${id}`);
    const data = await res.json<Anime>();

    const malSync = data.mappings.malSync;

    let subUrl = "";
    let dubUrl = "";

    if (malSync.Sites?.Gogoanime) {
      for (const key in malSync.Sites.Gogoanime) {
        const siteDetail =
          malSync.Sites.Gogoanime[key as keyof typeof malSync.Sites.Gogoanime];
        const cleanedUrl = siteDetail.url.replace(
          /https?:\/\/[^/]+\/category\//,
          ""
        );

        if (key.includes("dub")) {
          dubUrl = cleanedUrl;
        } else {
          subUrl = cleanedUrl;
        }
      }
    }
    const malsync = { sub: subUrl, dub: dubUrl };

    const aniZip = data.mappings.anizip;
    let anizip = {};

    if (!aniZip || !aniZip.episodes) anizip = {};
    anizip = aniZip.episodes;

    return {
      malsync,
      anizip,
    };
  } catch (error) {
    console.error(error);
    return {
      malsync: {
        sub: "",
        dub: "",
      },
      anizip: {},
    };
  }
};

const getGogoAnime = async (id: string) => {
  try {
    const res = await bky.get(
      `${process.env.CONSUMET_API}/anime/gogoanime/info/${id}`
    );
    const data = await res.json<GogoAnimeInfo>();

    if (!data || !data.episodes) return [];

    return data.episodes;
  } catch (error) {
    console.error("An error occurred while fetching anime data", error);
    return [];
  }
};

const combineMetadataAndEpisodes = (
  consumetResponse: ProviderData[],
  metadataResponse: Episodes,
  combinedSubAndDub: ProviderData[]
): ProviderData[] => {
  if (consumetResponse.length < 1) {
    return [];
  }

  const gogoAnimeIndex = consumetResponse.findIndex(
    (provider) => provider.providerId === "gogoanime"
  );
  if (gogoAnimeIndex !== -1) {
    consumetResponse[gogoAnimeIndex] = combinedSubAndDub[0];
  }

  _.forEach(consumetResponse, (provider) => {
    _.forEach(["sub", "dub"], (type) => {
      // @ts-ignore
      provider.episodes[type as "sub" | "dub"] = _.map(
        provider.episodes[type as "sub" | "dub"],
        (episode: _.Omit<ConsumetEpisode, "imageHash">) => {
          const metadataEpisode = metadataResponse[episode.number];
          if (metadataEpisode) {
            const title =
              metadataEpisode.title.en ||
              metadataEpisode.title["x-jat"] ||
              metadataEpisode.title.ja;
            return {
              ...episode,
              title: title!,
              image: metadataEpisode.image!,
              description: metadataEpisode.overview ?? null,
              rating: metadataEpisode.rating,
              createdAt: metadataEpisode.airDateUtc,
            };
          } else {
            return {
              ...episode,
              title: null,
              image: null,
              description: null,
              rating: null,
            };
          }
        }
      ) as {
        title: string;
        image: string | null;
        description: string | null;
        rating: string;
        createdAt: string;
        number: number;
        id: string;
        url: string;
      }[];
    });
  });

  return consumetResponse;
};

const getEpisodes = async (id: string) => {
  const [consumet, madara] = await Promise.all([
    getConsumet(id),
    getMadaraMappings(id),
  ]);

  const malsync = madara.malsync;
  const meta = madara.anizip;

  const [sub, dub] = await Promise.all([
    malsync.sub !== "" ? getGogoAnime(malsync.sub) : Promise.resolve([]),
    malsync.dub !== "" ? getGogoAnime(malsync.dub) : Promise.resolve([]),
  ]);

  const combinedSubAndDub: ProviderData[] = [
    {
      providerId: "gogoanime",
      episodes: {
        sub: [...sub] as _.Omit<ConsumetEpisode, "imageHash">[],
        dub: [...dub] as _.Omit<ConsumetEpisode, "imageHash">[],
      },
    },
  ];

  return combineMetadataAndEpisodes(consumet, meta, combinedSubAndDub);
};

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const res = await getEpisodes(params.id);

  return NextResponse.json(res);
};
