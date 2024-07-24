import axios from "axios";
import { NextResponse } from "next/server";

axios.interceptors.request.use(config => {
    config.timeout = 9000;
    return config;
});

async function fetchRecent() {
    try {
        const { data } = await axios.get(
            `https://anify.eltik.cc/recent?type=anime&page=1&perPage=20&fields=[id,title,status,format,currentEpisode,coverImage,episodes,totalEpisodes]`
        );

        const mappedData = data.map((i) => {
            const episodesData = i?.episodes?.data;
            const getEpisodes = episodesData ? episodesData.find((x) => x.providerId === "gogoanime") || episodesData[0] : [];
            const getEpisode = getEpisodes?.episodes?.find(
                (x) => x.number === i.currentEpisode
            );

            return {
                id: i.id,
                latestEpisode: getEpisode?.id ? getEpisode.id.substring(1) : '',
                title: i.title,
                status: i.status,
                format: i.format,
                totalEpisodes: i?.totalEpisodes,
                currentEpisode: i.currentEpisode,
                coverImage: i.coverImage,
            };
        });
        return mappedData;
    } catch (error) {
        console.error("Error fetching Recent Episodes:", error);
        return [];
    }
}

export const GET = async (req) => {
    const data = await fetchRecent();
    if (data && data?.length > 0) {
        return NextResponse.json(data);
    } else {
        return NextResponse.json({ message: "Recent Episodes not found" });
    }
};
