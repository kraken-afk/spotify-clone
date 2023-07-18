import { useContext, useRef, type ReactElement } from "react";
import "swiper/css";
import "swiper/css/scrollbar";
import CredentialContext from "~/context/CredentialContext";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import ResponsiveSwiper from "~/components/ResponseiveSwiper";
import Card from "~/components/Card";

export default function YourPlaylists(): ReactElement {
  const containerRef = useRef<HTMLElement>(null);
  const token = useContext(CredentialContext) as Credential;
  const { data, isLoading } = useFetchSpotify<CurrentProfilePlaylist>(
    "https://api.spotify.com/v1/me/playlists?limit=10",
    token,
    { method: "GET" }
  );

  return (
    <section ref={containerRef} className="my-4 overflow-hidden">
      <h2 className="sub-title mb-4">Your playlist</h2>
      <ResponsiveSwiper isLoading={isLoading} containerRef={containerRef}>
        {data?.items.map((item) => (
          <Card
            key={item.id}
            coverImage={item.images[0].url}
            title={item.name}
            description={item.description}
          />
        ))}
      </ResponsiveSwiper>
    </section>
  );
}
