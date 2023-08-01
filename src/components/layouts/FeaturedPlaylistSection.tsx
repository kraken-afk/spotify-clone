import { useContext, useRef, type ReactElement } from "react";
import CredentialContext from "~/context/CredentialContext";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import ResponsiveSwiper from "~/components/ui/ResponseiveSwiper";
import Card from "~/components/ui/Card";
import Section from "~/components/ui/Section";
import { Link } from "~/routes";

export default function FeaturedPlaylistSection(): ReactElement {
  const containerRef = useRef<HTMLElement>(null);
  const token = useContext(CredentialContext) as Credential;
  const { data, isLoading } = useFetchSpotify<FeaturedPlaylist>(
    "https://api.spotify.com/v1/browse/featured-playlists",
    token,
    { method: "GET" }
  );

  return (
    <Section ref={containerRef}>
      <h2 className="sub-title">Your featured playlist</h2>
      <ResponsiveSwiper isLoading={isLoading} containerRef={containerRef}>
        {data?.playlists.items.map((item) => (
          <Link key={item.id} to={`/playlist/${item.id}`}>
            <Card
              coverImage={item.images[0].url}
              title={item.name}
              description={item.description}
            />
          </Link>
        ))}
      </ResponsiveSwiper>
    </Section>
  );
}
