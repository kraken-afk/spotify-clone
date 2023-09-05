import { useContext, type ReactElement, useRef } from "react";
import Section from "~/components/ui/Section";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import CredentialContext from "~/context/CredentialContext";
import ResponsiveSwiper from "~/components/ui/ResponseiveSwiper";
import Card from "~/components/ui/Card";
import { Link } from "~/routes";

export default function NewReleaseAlbumsSection(): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const containerRef = useRef<HTMLElement>(null);
  const { data, isLoading } = useFetchSpotify<Albums>(
    "https://api.spotify.com/v1/browse/new-releases?limit=15",
    token,
    { method: "GET" }
  );

  return (
    <Section ref={containerRef}>
      <h2 className="sub-title">New Release</h2>
      <ResponsiveSwiper containerRef={containerRef} isLoading={isLoading}>
        {data?.albums.items.map((item) => {
          return (
            <Link to={`album/${item.id}`} key={item.id}>
              <Card
                title={item.name}
                description={item.artists[0].name}
                coverImage={item.images.at(1)?.url as string}
              />
            </Link>
          );
        })}
      </ResponsiveSwiper>
    </Section>
  );
}
