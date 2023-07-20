import { useContext, type ReactElement, useRef } from "react";
import Section from "./Section";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import CredentialContext from "~/context/CredentialContext";
import ResponsiveSwiper from "~/components/ResponseiveSwiper";
import Card from "~/components/Card";

export default function ShowSection(): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const containerRef = useRef<HTMLElement>(null);
  const { data, isLoading } = useFetchSpotify<Shows>(
    "https://api.spotify.com/v1/me/shows",
    token,
    { method: "GET" }
  );

  return (
    <Section ref={containerRef}>
      <h2 className="sub-title mb-4">Your shows</h2>
      <ResponsiveSwiper containerRef={containerRef} isLoading={isLoading}>
        {data?.items.map((item) => {
          return (
            <Card
            type="show"
            key={item.show.id}
            title={item.show.name}
            description={item.show.description}
            coverImage={item.show.images.at(1)?.url as string}
            />
          )
        })}
      </ResponsiveSwiper>
    </Section>
  );
}
