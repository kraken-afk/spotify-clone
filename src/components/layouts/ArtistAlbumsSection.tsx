import { useContext, type ReactElement, useRef, useEffect } from "react";
import { Link } from "~/routes";
import Section from "~/components/ui/Section";
import CredentialContext from "~/context/CredentialContext";
import ResponsiveSwiper from "~/components/ui/ResponseiveSwiper";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import Card from "~/components/ui/Card";

interface ArtistAlbumsSectionProps {
  artist: string;
  id: string;
}
export default function ArtistAlbumsSection({
  id,
  artist,
}: ArtistAlbumsSectionProps): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const containerRef = useRef<HTMLElement>(null);
  const { data, isLoading } = useFetchSpotify<ArtistAlbums>(
    `https://api.spotify.com/v1/artists/${id}/albums?include_groups=appears_on`,
    token,
    { method: "GET" }
  );

  useEffect(() => {}, [isLoading])
  console.log(isLoading)

  return (
    <>
      {!!(data?.items.length as number) && (
        <Section ref={containerRef} className="m-4 mt-6">
          <h2 className="text-[1.5rem] font-bold">{artist} appears on</h2>
          <ResponsiveSwiper containerRef={containerRef} isLoading={isLoading}>
            {data?.items.map((album) => (
              <Link to={`/album/${album.id}`} key={album.id}>
                <Card
                  coverImage={album.images.at(1)?.url as string}
                  title={album.name}
                  description={`By ${album.artists.map((e) => e.name).join(", ")}`}
                />
              </Link>
            ))}
          </ResponsiveSwiper>
        </Section>
      )}
    </>
  );
}
