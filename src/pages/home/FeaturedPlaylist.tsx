import { useContext, useRef, type ReactElement } from "react";
import CredentialContext from "~/context/CredentialContext";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import ResponsiveSwiper from "~/components/ResponseiveSwiper";
import Card from "~/components/Card";
import Section from "./Section";

export default function FeaturedPlaylist(): ReactElement {
  const containerRef = useRef<HTMLElement>(null);
  const token = useContext(CredentialContext) as Credential;
  const { data, isLoading } = useFetchSpotify<FeaturedPlaylist>(
    "https://api.spotify.com/v1/browse/featured-playlists",
    token,
    { method: "GET" }
  );

  return (
    <Section ref={containerRef}>
      <h2 className="sub-title mb-4">Your featured playlist</h2>
      <ResponsiveSwiper isLoading={isLoading} containerRef={containerRef}>
        {data?.playlists.items.map((item) => (
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
