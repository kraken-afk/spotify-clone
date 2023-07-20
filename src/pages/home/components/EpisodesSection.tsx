import { useContext, type ReactElement, useRef } from "react";
import CredentialContext from "~/context/CredentialContext";
import Section from "./Section";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import ResponsiveSwiper from "~/components/ResponseiveSwiper";
import Card from "~/components/Card";

export default function EpisodesSection(): ReactElement {
  const containerRef = useRef<HTMLElement>(null);
  const token = useContext(CredentialContext) as Credential;
  const { data, isLoading } = useFetchSpotify<Episodes>(
    "https://api.spotify.com/v1/me/episodes", token, { method: "GET" }
  );

  return (
    <Section ref={containerRef}>
      <h2 className="sub-title mb-4">Your episodes</h2>
      <ResponsiveSwiper containerRef={containerRef} isLoading={isLoading}>
        {data?.items.map((item) => (
          <Card
            key={item.episode.id}
            title={item.episode.name}
            description={item.episode.description}
            coverImage={item.episode.images.at(1)?.url as string}
          />
        ))}
      </ResponsiveSwiper>
    </Section>
  );
}