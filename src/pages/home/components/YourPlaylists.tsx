import { useContext, useRef, type ReactElement } from "react";
import CredentialContext from "~/context/CredentialContext";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import ResponsiveSwiper from "~/components/ResponseiveSwiper";
import Card from "~/components/Card";
import Section from "./Section";
import SpotifyManagerContext from "~/context/SpotfyManagerContext";
import { SpotifyManagerKey } from "~/global/constants";

export default function YourPlaylists(): ReactElement {
  const containerRef = useRef<HTMLElement>(null);
  const token = useContext(CredentialContext) as Credential;
  const spotfyManager = useContext(SpotifyManagerContext);
  const { data, isLoading } = useFetchSpotify<Playlists>(
    "https://api.spotify.com/v1/me/playlists?limit=50",
    token,
    { method: "GET" }
  );

  if (data) spotfyManager.set<Playlists>(SpotifyManagerKey.PLAYLISTS, data);

  // filter playlist based on current user
  // reveal s/he playlist
  const filteredPlaylist =
    data?.items.filter(
      (item) => spotfyManager.get<CurrentProfile>(SpotifyManagerKey.USER).id === item.owner.id
    ) ?? [];

  return (
    <Section ref={containerRef}>
      <h2 className="sub-title mb-4">Your playlist</h2>
      <ResponsiveSwiper isLoading={isLoading} containerRef={containerRef}>
        {filteredPlaylist?.map((item) => (
          <Card
            key={item.id}
            coverImage={item.images[0].url}
            title={item.name}
            description={item.description}
          />
        ))}
      </ResponsiveSwiper>
    </Section>
  );
}
