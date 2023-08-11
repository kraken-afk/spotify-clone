import { useContext, type ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CredentialContext from "~/context/CredentialContext";
import LocalLoader from "~/components/popups/LocalLoader";
import useGet from "~/hooks/useGet";
import ExplicitContent from "~/components/icons/ExplicitContent";
import Play from "~/components/icons/Play";
import GenericContext from "~/context/GenericContext";
import HeartSolid from "../components/icons/HeartSolid";
import Heart from "../components/icons/Heart";
import ArtistAlbumsSection from "~/components/layouts/ArtistAlbumsSection";
import msToTime, { TimeConverterEnum } from "~/libs/msToTime";
import SimiliarArtistsSection from "~/components/layouts/SimiliarArtistsSection";
import FooterSection from "~/components/layouts/FooterSection";
import "~/styles/artist-[id].scss";

interface FetchResponse {
  artist: ArtistDetail;
  topTracks: TopTrack;
}

interface ToptrackListProps {
  topTracks: TopTrack;
  savedTracks: Array<{
    added_at: string;
    track: Track;
  }>;
}

export default function Artist(): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const { tracks } = useContext(GenericContext) as InitialResource;
  const { id } = useParams();
  console.log(id);
  const { data, isLoading } = useQuery<FetchResponse>({
    queryKey: ["artist", id],
    cacheTime: 3600,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const artist = await useGet<ArtistDetail>(
        `https://api.spotify.com/v1/artists/${id}`,
        { method: "GET" },
        token
      );
      const topTracks = await useGet<TopTrack>(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`,
        { method: "GET" },
        token
      );

      return { artist, topTracks };
    },
  });

  if (isLoading) return <LocalLoader />;

  const { artist, topTracks } = data as FetchResponse;
  const savedTracks = tracks.items.filter((item) => item.track.album.album_type === "album");
  console.log(artist.name);

  return (
    <>
      <div className="absolute left-0 top-0 w-full h-[40vh] z-0 artist-banner">
        <img
          className="block shadow-2xl w-full h-full object-cover"
          src={artist?.images[0].url}
          alt="Playlist Cover"
        />
      </div>
      <div className="p-4 lg:pb-10 flex border-b-neutral-700 border-b-[1px] border-solid flex-col bg header-artist mt-[20vh]">
        <div className="flex flex-col lg:justify-end">
          <h1 className="playlist-title">{artist?.name}</h1>
        </div>
        <div className="flex flex-col">
          <span className="inline-block my-4">
            {new Intl.NumberFormat("en-US").format(artist?.followers.total as number)}{" "}
            Followers
          </span>
          <div className=" flex gap-4">
            <div className="mt-2">
              <button
                className="block mr-4 height-1 rounded-lg w-full py-1 border-white border-2 transition-all hover:opacity-70 active:scale-105 duration-75"
                type="button"
              >
                Follow
              </button>{" "}
            </div>
            <div className="px-4 cursor-pointer opacity-70 transition-all duration-0 hover:opacity-100">
              <div className="flex flex-col gap-1 items-center  py-4">
                <div className="w-1 h-1 bg-essential-sub rounded-full"></div>
                <div className="w-1 h-1 bg-essential-sub rounded-full"></div>
                <div className="w-1 h-1 bg-essential-sub rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!!topTracks.tracks.length && (
        <section className="p-4">
          <h2 className="text-[2rem] font-bold">Popular</h2>
          <ToptrackList topTracks={topTracks} savedTracks={savedTracks} />
        </section>
      )}

      <ArtistAlbumsSection id={artist.id} artist={artist.name} />

      <SimiliarArtistsSection id={artist.id} />

      <div className="px-4 mx-auto flex justify-center">
        <picture className="block w-full max-w-[300px] rounded-2xl my-8 overflow-hidden relative">
          <img src={artist.images[0].url} width={"100%"} />
          <span className="block text-2xl font-bold absolute bottom-2 right-2 shadow-2xl">
            {artist.name}
          </span>
        </picture>
      </div>

      <FooterSection />
    </>
  );
}

function ToptrackList({ topTracks, savedTracks }: ToptrackListProps): ReactElement {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div>
      {topTracks.tracks.slice(0, isExpand ? undefined : 5).map((item, index) => (
        <div
          key={item.id}
          className="cursor-pointer hover:bg-main-black song-row flex justify-between"
        >
          <div className="flex gap-3 items-center">
            <div className="text-sm py-4 px-4 text-essential-sub text-right relative">
              <span className="number absolute right-1/3 top-1/2 translate-y-[-50%]">
                {index + 1}
              </span>
              <span className="play-btn hidden absolute right-0 top-1/2 translate-y-[-50%]">
                <Play size={24} className="fill-essential-sub inline" />
              </span>
            </div>
            <div className="text-sm py-4">
              <div className="flex items-center gap-4">
                <div className="w-[48px] h-[48px] bg-neutral-700 overflow-hidden">
                  <img
                    src={item.album.images.at(-1)?.url}
                    alt="album profile"
                    loading="lazy"
                    width={48}
                  />
                </div>
                <div className="flex flex-col px-2">
                  <span className="truncate max-w-[250px] hover:underline underline-offset-2">
                    {item.name}
                  </span>
                  <span className="text-essential-sub">
                    {item.explicit ? <ExplicitContent /> : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-6 items-center">
            <div className="p-4 relative flex items-center justify-center">
              {savedTracks.find(({ track }) => {
                return track.id === item.id;
              }) ? (
                <button
                  type="button"
                  className="bg-transparent border-none w-min h-min heart-solid"
                  onClick={() => alert("unlove")}
                >
                  <HeartSolid size={20} className=" fill-green" />
                </button>
              ) : (
                ""
              )}
              <button
                type="button"
                className="hidden bg-transparent border-none w-min h-min heart-btn"
                onClick={() => alert("love")}
              >
                <Heart size={20} className="fill-essential-sub" />
              </button>
            </div>
            <div className="text-sm py-4">
              {msToTime(item.duration_ms, TimeConverterEnum.DURATION)}
            </div>
            <div>
              <div
                className="flex gap-1 items-center cursor-pointer opacity-30 transition-all duration-0 hover:opacity-100 p-4 lg:flex-row flex-col"
                onClick={() => alert("menu")}
              >
                <div className="w-[2px] h-[2px] bg-essential-sub rounded-full"></div>
                <div className="w-[2px] h-[2px] bg-essential-sub rounded-full"></div>
                <div className="w-[2px] h-[2px] bg-essential-sub rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        role="button"
        className="text-essential-sub font-bold hover:text-white"
        onClick={() => setIsExpand((prev) => !prev)}
      >
        {isExpand ? "See less." : "See more."}
      </button>
    </div>
  );
}
