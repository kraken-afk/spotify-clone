import { useContext, type ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CredentialContext from "~/context/CredentialContext";
import LocalLoader from "~/components/popups/LocalLoader";
import useGet from "~/hooks/useGet";
import GenericContext from "~/context/GenericContext";
import ArtistAlbumsSection from "~/components/layouts/ArtistAlbumsSection";
import SimiliarArtistsSection from "~/components/layouts/SimiliarArtistsSection";
import FooterSection from "~/components/layouts/FooterSection";
import "~/styles/artist-[id].scss";
import TopTrackSection from "../../components/layouts/TopTrackSection";

interface FetchResponse {
  artist: ArtistDetail;
  topTracks: TopTrack;
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
          <TopTrackSection tracks={topTracks.tracks} savedTracks={savedTracks} />
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
