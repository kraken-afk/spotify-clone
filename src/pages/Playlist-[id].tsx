import { useContext, type ReactElement, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CredentialContext from "~/context/CredentialContext";
import LocalLoader from "~/components/popups/LocalLoader";
import msToTime, { TimeConverterEnum } from "~/libs/msToTime";
import useGet from "~/hooks/useGet";
import Music from "~/components/icons/Music";
import HeartSolid from "~/components/icons/HeartSolid";
import TimeFive from "~/components/icons/TimeFive";
import PlayButton from "~/components/ui/PlayButton";
import Time from "~/components/icons/Time.";
import relativeDateOffset from "~/libs/relativeDateOffset";
import FooterSection from "../components/layouts/FooterSection";
import "~/styles/playlist-[id].scss";

interface FetchResponse {
  playlist: Playlist;
  owner: User;
}

export default function Playlist(): ReactElement {
  const theadRef = useRef<HTMLTableSectionElement>(null)
  const token = useContext(CredentialContext) as Credential;
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [id],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const playlist = await useGet<Playlist>(
        `https://api.spotify.com/v1/playlists/${id}`,
        { method: "GET" },
        token
      );
      const owner = await useGet<User>(
        `https://api.spotify.com/v1/users/${playlist.owner.id}`,
        { method: "GET" },
        token
      );

      return { playlist, owner } as FetchResponse;
    },
  });

  useEffect(() => {
    const element = document.querySelector(".main") as HTMLElement;
    element.addEventListener("scroll", () => {
      const element = theadRef.current;
      const top = element?.getBoundingClientRect().top as number;

      if (!element?.classList.contains("bg-main-black") && top === 83)
        element?.classList.replace("bg-transparent", "bg-main-black");

      if (element?.classList.contains("bg-main-black") && top > 83)
        element?.classList.replace("bg-main-black", "bg-transparent");
    });
  }, []);

  if (isLoading) return <LocalLoader />;

  const { playlist, owner } = data as FetchResponse;

  return (
    <>
      <div className="py-4 mx-6 pb-16 flex items-end border-b-neutral-700 border-b-[1px] border-solid">
        <picture className="block w-56 mr-8">
          <img
            className="block shadow-2xl"
            src={playlist?.images[0].url}
            alt="Playlist Cover"
          />
        </picture>
        <div className="flex flex-col">
          <span className="font-bold translate-y-1 capitalize">{playlist?.type}</span>
          <h1 className="playlist-title">{playlist?.name}</h1>
          <p
            className="my-1 mb-2 text-essential-sub font-semibold"
            dangerouslySetInnerHTML={{
              __html: playlist?.description ? playlist.description : "",
            }}
          ></p>
          <div className="flex items-center gap-1">
            <span className="flex items-center gap-1">
              <img
                className="rounded-full"
                src={owner?.images[0].url}
                alt="profile"
                width={28}
              />
              <span className="ml-1 font-bold hover:underline underline-offset-2 cursor-pointer">{playlist?.owner.display_name}</span>
              <span className="mx-[1px]">&#x2022;</span>
            </span>
            <span>
              {playlist?.followers.total}{" "}
              <HeartSolid size={16} className="fill-essential-sub" />{" "}
              <span className="mx-[1px]">&#x2022;</span>
            </span>
            <span>
              {playlist?.tracks.total} <Music size={16} className="fill-essential-sub" />{" "}
              <span className="mx-[1px]">&#x2022;</span>
            </span>
            <span>
              {playlist?.tracks
                ? msToTime(
                    playlist?.tracks.items.reduce((acc, v) => v.track.duration_ms + acc, 0)
                  )
                : ""}
            </span>
            <TimeFive size={16} className="fill-essential-sub" />{" "}
          </div>
        </div>
      </div>
      <div className="p-6 flex">
        <PlayButton
          className="w-14 h-14 mr-10 cursor-pointer hover:scale-105 duration-0"
          svgSize={40}
        />
        <div className="flex gap-2 items-center cursor-pointer opacity-70 transition-all duration-0 hover:opacity-100">
          <div className="w-1 h-1 bg-essential-sub rounded-full"></div>
          <div className="w-1 h-1 bg-essential-sub rounded-full"></div>
          <div className="w-1 h-1 bg-essential-sub rounded-full"></div>
        </div>
      </div>
        <table className="w-full">
          <thead
            ref={theadRef}
            className="text-neutral-500 border-b-neutral-500 border-b-[1px] border-solid sticky left-0 top-[73px] bg-transparent transition-all duration-75"
          >
            <tr className="items-center">
              <th className="font-normal text-right  py-2 px-4">#</th>
              <th className="font-normal text-left  py-2">Title</th>
              <th className="font-normal text-left  py-2">Album</th>
              <th className="font-normal text-left  py-2 pr-4">Added at</th>
              <th className="text-center">
                <Time size={16} className="fill-neutral-500" />
              </th>
            </tr>
          </thead>
          <tbody className="px-4">
            {playlist.tracks.items.map((item, index) => {
              return (
                <tr key={item.track.id} className="cursor-pointer hover:bg-main-black">
                  <td className="text-sm py-4 px-4 text-essential-sub text-right">
                    {index + 1}
                  </td>
                  <td className="text-sm py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.track.album.images[0].url}
                        alt="artist profile"
                        loading="lazy"
                        width={48}
                      />
                      <div className="flex flex-col px-2">
                        <span className="truncate max-w-[250px] hover:underline underline-offset-2">
                          {item.track.name}
                        </span>
                        <span className="text-essential-sub hover:underline underline-offset-2">
                          {item.track.artists[0].name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm py-4 px-2 truncate max-w-[230px] hover:underline underline-offset-2">
                    {item.track.album.name}
                  </td>
                  <td className="text-sm py-4">{relativeDateOffset(item.added_at)}</td>
                  <td className="text-sm py-4 pr-4">
                    {msToTime(item.track.duration_ms, TimeConverterEnum.DURATION)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      <div className="p-4">
        <FooterSection />
      </div>
    </>
  );
}
