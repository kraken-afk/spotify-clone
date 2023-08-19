import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useRef, type ReactElement } from "react";
import { useParams } from "react-router-dom";
import { screen } from "~/global/constants";
import { Link } from "~/routes";
import Heart from "~/components/icons/Heart";
import HeartSolid from "~/components/icons/HeartSolid";
import Play from "~/components/icons/Play";
import Time from "~/components/icons/Time.";
import FooterSection from "~/components/layouts/FooterSection";
import LocalLoader from "~/components/popups/LocalLoader";
import PlayButton from "~/components/ui/PlayButton";
import CredentialContext from "~/context/CredentialContext";
import GenericContext from "~/context/GenericContext";
import useGet from "~/hooks/useGet";
import msToTime, { TimeConverterEnum } from "~/libs/msToTime";
import ExplicitContent from "~/components/icons/ExplicitContent";
import isDeviceWidthLT from "~/libs/isDeviceWidthLT";
import "~/styles/album-[id].scss";

interface FetchResponse {
  single: Single;
  artist: ArtistDetail;
}

export default function Album(): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const theadRef = useRef<HTMLDivElement>(null);
  const { tracks } = useContext(GenericContext) as InitialResource;
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [id],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const single = await useGet<Single>(
        `https://api.spotify.com/v1/albums/${id}`,
        { method: "GET" },
        token
      );
      const artist = await useGet<Artist>(
        `https://api.spotify.com/v1/artists/${single.artists[0].id}`,
        { method: "GET" },
        token
      );

      return { single, artist } as FetchResponse;
    },
  });
  const theadScrollHandler = () => {
    const navbarBottom = document.getElementById("navbar")?.getBoundingClientRect().bottom as number;

    return () => {
      const element = theadRef.current;
      const top = element?.getBoundingClientRect().top as number;

      if (!element?.classList.contains("bg-main-black") && top < navbarBottom)
        element?.classList.replace("bg-transparent", "bg-main-black");

      if (element?.classList.contains("bg-main-black") && (top + 1) > navbarBottom)
        element?.classList.replace("bg-main-black", "bg-transparent");
    }
  };

  useEffect(() => {
    const element = document.querySelector(".main") as HTMLElement;
    const handler = theadScrollHandler();

    element.addEventListener("scroll", handler);

    return () => element.removeEventListener("scroll", handler);
  }, []);

  if (isLoading) return <LocalLoader />;

  const { single, artist } = data as FetchResponse;
  const savedAlbums = tracks.items.filter((item) => item.track.album.album_type === "album");

  return (
    <>
      <div className="p-4 lg:pb-10 flex border-b-neutral-700 border-b-[1px] border-solid lg:flex-row flex-col">
        <picture className="block mb-4 mx-auto lg:m-0 lg:mr-8 lg:items-end">
          <img
            className="block shadow-2xl min-w-[200px] w-[200px]"
            src={single?.images[0].url}
            alt="artist profile"
          />
        </picture>
        <div className="flex flex-col lg:justify-end">
          {!isDeviceWidthLT(screen.LG) && (
            <span className="font-bold translate-y-1 capitalize">{single?.type}</span>
          )}
          <h1 className="playlist-title">{single?.name}</h1>
          <div className="flex items-center lg:gap-1 gap-3 album-detail-info">
            <div className="flex items-center gap-3">
              <img
                className="rounded-full"
                src={artist.images.at(-1)?.url as string}
                alt="profile"
                width={28}
              />
              <div>
                <Link to={`/artist/${artist.id}`}>
                  <span className="ml-1 font-bold hover:underline underline-offset-2 cursor-pointer">
                    {artist.name}
                  </span>
                </Link>
              </div>
            </div>
            <span className="lg:flex lg:items-center gap-1">
              {isDeviceWidthLT(screen.MD) && (
                <span className="translate-y-1 capitalize">{single?.type}</span>
              )}
              <span className="lg:mx-[1px] mx-2">&#x2022;</span>
              <span>{single.release_date.split("-")[0]}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="lg:p-6 p-4 flex items-center gap-6">
        <PlayButton
          className="lg:w-14 w-12 lg:h-14 h-12 cursor-pointer hover:scale-105 duration-0"
          svgSize={isDeviceWidthLT(screen.MD) ? 30 : 40}
        />
        <div className="cursor-pointer">
          {savedAlbums.find((album) => album.track.album.id === single.id) ? (
            <HeartSolid size={isDeviceWidthLT(screen.MD) ? 30 : 40} className="fill-green" />
          ) : (
            <Heart
              size={isDeviceWidthLT(screen.MD) ? 30 : 40}
              className="fill-essential-sub"
            />
          )}
        </div>
        <div className="flex lg:gap-2 gap-1 items-center cursor-pointer opacity-70 transition-all duration-0 hover:opacity-100 py-4">
          <div className="w-1 h-1 bg-essential-sub rounded-full"></div>
          <div className="w-1 h-1 bg-essential-sub rounded-full"></div>
          <div className="w-1 h-1 bg-essential-sub rounded-full"></div>
        </div>
      </div>
      <div className="w-full">
        <div
          ref={theadRef}
          className="items-center text-neutral-500 border-b-neutral-500 border-b-[1px] border-solid sticky left-0 top-[73px] bg-transparent transition-all duration-75 z-10 parent-list"
        >
          <span className="font-normal text-right py-2 px-4">#</span>
          <span className="font-normal text-left py-2">Title</span>
          <span className=""></span>
          <span className="text-center">
            <Time size={16} className="fill-neutral-500" />
          </span>
          <span className="pr-4"></span>
        </div>
        {single.tracks.items.map((item, index) => {
          return (
            <div
              key={item.id}
              className="cursor-pointer hover:bg-main-black song-row parent-list"
            >
              <span className="text-sm py-4 px-4 text-essential-sub flex items-center justify-center relative">
                <span className="number">{index + 1}</span>
                <span className="play-btn hidden absolute right-2 top-1/2 translate-y-[-50%]">
                  <Play size={24} className="fill-essential-sub inline" />
                </span>
              </span>
              <span className="text-sm py-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col px-2">
                    <span className="truncate max-w-[180px] sm:max-w-[250px] hover:underline underline-offset-2">
                      {item.name}
                    </span>
                    <span className="text-essential-sub">
                      {item.explicit ? <ExplicitContent /> : ""}
                      {item.artists.map((artist, index) => (
                        <Link
                          key={artist.id}
                          to={`/artist/${artist.id}`}
                          className="first-of-type:ml-1 hover:underline underline-offset-2"
                        >
                          {artist.name}
                          {index === item.artists.length - 1 ? "" : ", "}
                        </Link>
                      ))}
                    </span>
                  </div>
                </div>
              </span>
              <div className="p-4 relative flex items-center justify-center">
                {tracks.items.find((savedItem) => {
                  return savedItem.track.id === item.id;
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
                  className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] hidden bg-transparent border-none w-min h-min heart-btn"
                  onClick={() => alert("love")}
                >
                  <Heart size={20} className="fill-essential-sub" />
                </button>
              </div>
              <span className="text-sm py-4 flex items-center justify-center">
                {msToTime(item.duration_ms, TimeConverterEnum.DURATION)}
              </span>
              <div
                className="flex gap-1 items-center cursor-pointer opacity-30 transition-all duration-0 hover:opacity-100 p-4"
                onClick={() => alert("menu")}
              >
                <div className="w-[2px] h-[2px] bg-essential-sub rounded-full"></div>
                <div className="w-[2px] h-[2px] bg-essential-sub rounded-full"></div>
                <div className="w-[2px] h-[2px] bg-essential-sub rounded-full"></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4">
        <FooterSection />
      </div>
    </>
  );
}
