import { ReactElement, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CredentialContext from "~/context/CredentialContext";
import LocalLoader from "~/components/popups/LocalLoader";
import useGet from "~/hooks/useGet";
import no_icon from "~/assets/no-icon.png";
import "~/styles/user-[id].scss";

interface FetchResponse {
  user: User;
  playlists: ContentResponse<PlaylistItem>;
}

export default function User(): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const { id } = useParams();
  const { data, isLoading } = useQuery<FetchResponse>({
    queryKey: ["user", id],
    cacheTime: 3600,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const user = await useGet<User>(
        `https://api.spotify.com/v1/users/${id}`,
        { method: "GET" },
        token
      );
      const playlists = await useGet<ContentResponse<PlaylistItem>>(
        `https://api.spotify.com/v1/users/${id}/playlists`,
        { method: "GET" },
        token
      );

      return { user, playlists }
    },
  });

  if (isLoading) return <LocalLoader />;

  const { user, playlists } = data as FetchResponse;
  const publicPlaylist = playlists.items.filter(item => item.owner.id === user.id);


  console.log(playlists);

  return (
    <>
      <div className="flex items-center mx-4 md:mx-8 pb-4 gap-6 border-neutral-700 border-b-[1px] mobile-profile">
        <picture className="block rounded-full max-w-[260px] w-[30vw] min-w-[100px] overflow-hidden">
          <img
            src={user.images.at(-1)?.url ?? no_icon}
            alt="profile icon"
            className="w-full"
          />
        </picture>
        <div>
          <span className="font-bold type">{user?.type}</span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold">{user?.display_name}</h1>
          <div className="font-semibold my-3">
            <span>{publicPlaylist.length} public playlist,</span> <span>{user.followers.total} followers</span>
          </div>
        </div>
      </div>
    </>
  );
}
