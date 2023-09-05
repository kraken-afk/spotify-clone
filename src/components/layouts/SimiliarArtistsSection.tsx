import { useContext, type ReactElement, useRef } from "react";
import { Link } from "~/routes";
import Section from "~/components/ui/Section";
import CredentialContext from "~/context/CredentialContext";
import ResponsiveSwiper from "~/components/ui/ResponseiveSwiper";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import CreatorCard from "../ui/CreatorCard";

interface SimiliarArtistsSectionProps {
  id: string;
}

interface ArtistsSectionResponse {
  artists: ArtistDetail[];
}

export default function SimiliarArtistsSection({
  id,
}: SimiliarArtistsSectionProps): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const containerRef = useRef<HTMLElement>(null);
  const { data, isLoading } = useFetchSpotify<ArtistsSectionResponse>(
    `https://api.spotify.com/v1/artists/${id}/related-artists`,
    token,
    { method: "GET" }
  );

  return (
    <>
      {(
        <Section ref={containerRef} className="m-4 mt-6">
          <h2 className="text-[1.5rem] font-bold">Similiar Artists</h2>
          <ResponsiveSwiper containerRef={containerRef} isLoading={isLoading}>
            {data?.artists.map((artist) => (
              <Link to={`/artist/${artist.id}`} key={artist.id}>
                <CreatorCard
                  coverImage={artist.images.at(1)?.url as string}
                  name={artist.name}
                  type={artist.type}
                />
              </Link>
            ))}
          </ResponsiveSwiper>
        </Section>
      )}
    </>
  );
}
