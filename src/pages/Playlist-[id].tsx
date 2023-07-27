import { useContext, type ReactElement } from "react";
import { useParams } from "react-router-dom";
import CredentialContext from "~/context/CredentialContext";
import LocalLoader from "~/components/popups/LocalLoader";
import msToTime from "~/libs/msToTime";
import "~/styles/playlist-[id].scss";
import { useQuery } from "@tanstack/react-query";
import useGet from "../hooks/useGet";

interface FetchResponse {
  playlist: Playlist;
  owner: User;
}

export default function Playlist(): ReactElement {
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

  if (isLoading) return <LocalLoader />;

  const { playlist, owner } = data as FetchResponse;

  return (
    <>
      <header className="py-4 mx-6 pb-16 flex items-end border-b-neutral-700 border-b-[1px] border-solid">
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
              <span className="ml-1 font-bold">{playlist?.owner.display_name}</span>
              &#x2022;
            </span>
            <span>
              {playlist?.followers.total} like
              {playlist?.followers.total && playlist?.followers.total > 1 ? "s" : ""} &#x2022;
            </span>
            <span>
              {playlist?.tracks.total} song
              {playlist?.tracks.total && playlist?.tracks.total > 1 ? "s" : ""},
            </span>
            <span>
              {playlist?.tracks
                ? msToTime(
                    playlist?.tracks.items.reduce((acc, v) => v.track.duration_ms + acc, 0)
                  )
                : ""}
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
