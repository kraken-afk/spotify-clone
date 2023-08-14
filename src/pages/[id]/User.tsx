import { ReactElement, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CredentialContext from "~/context/CredentialContext";
import LocalLoader from "~/components/popups/LocalLoader";
import useGet from "~/hooks/useGet";
import no_icon from "~/assets/no-icon.png";
import PlaylistSection from "~/components/layouts/PlaylistSection";
import GenericContext from "~/context/GenericContext";
import TopTrackSection from "~/components/layouts/TopTrackSection";
import FooterSection from "~/components/layouts/FooterSection";
import CreatorCard from "~/components/ui/CreatorCard";
import { Link } from "~/routes";
import "~/styles/user-[id].scss";

interface FetchResponse {
  user: User;
  playlists: ContentResponse<PlaylistItem>;
  topTracks?: ContentResponse<Track>;
  topArtist?: ContentResponse<ArtistDetail>
}

export default function User(): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const { id } = useParams();
  const { tracks, profile } = useContext(GenericContext) as InitialResource;
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

      const isMe = profile.id === user.id;

      const playlists = await useGet<ContentResponse<PlaylistItem>>(
        `https://api.spotify.com/v1/users/${id}/playlists?limit=50`,
        { method: "GET" },
        token
      );

      const topTracks = isMe
        ? await useGet<ContentResponse<Track>>(
            "https://api.spotify.com/v1/me/top/tracks?time_range=short_term",
            { method: "GET" },
            token
          )
        : undefined;

      const topArtist = isMe
        ? await useGet<ContentResponse<ArtistDetail>>(
            "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10",
            { method: "GET" },
            token
          )
        : undefined;

      console.log(topArtist);

      return { user, playlists, topTracks, topArtist };
    },
  });

  if (isLoading) return <LocalLoader />;

  const { user, playlists, topTracks, topArtist } = data as FetchResponse;
  const publicPlaylist = playlists.items.filter(
    (item) => item.owner.id === user.id && item.public
  );
  const savedTracks = tracks.items.filter((item) => item.track.album.album_type === "album");

  return (
    <>
      <div className="px-4">
        <div className="flex items-center  pb-4 gap-6 border-neutral-700 border-b-[1px] mobile-profile">
          <picture className="block rounded-full max-w-[200px] w-[30vw] min-w-[100px] overflow-hidden">
            <img
              src={user.images.at(-1)?.url ?? no_icon}
              alt="profile icon"
              className="w-full"
            />
          </picture>
          <div>
            <span className="font-bold hidden md:inline">{user?.type}</span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold">
              {user?.display_name}
            </h1>
            <div className="font-semibold my-3">
              <span>{publicPlaylist.length} public playlist,</span>{" "}
              <span>{user.followers.total} followers</span>
            </div>
          </div>
        </div>
        <div className="pl-3">
          <div className="flex flex-col gap-1 py-4">
            <div className="w-1 h-1 bg-essential-sub rounded-full"></div>
            <div className="w-1 h-1 bg-essential-sub rounded-full"></div>
            <div className="w-1 h-1 bg-essential-sub rounded-full"></div>
          </div>
        </div>

        <PlaylistSection playlist={publicPlaylist} title={`${user.display_name} playlist's`} />
        {topTracks && (
          <>
            <h2 className="sub-title">Top tracks from the last 30 days</h2>
            <TopTrackSection tracks={topTracks.items} savedTracks={savedTracks} />
          </>
        )}
        <div className="mb-4 mt-8">
          <h2 className="sub-title">Most listened artist</h2>
          <p className="text-essential-sub font-semibold">10th most listened artist from the last 30 days</p>
          <div className="topartist-container">
            {topArtist?.items.map((artist) => (
              <Link to={`/artist/${artist.id}`} key={`${artist.id}-user`}>
                <CreatorCard coverImage={artist.images[1].url} name={artist.name} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
}
