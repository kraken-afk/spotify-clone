import { useContext, useRef, type ReactElement } from "react";
import { Link } from "~/routes";
import CredentialContext from "~/context/CredentialContext";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import Section from "~/components/ui/Section";
import BadgeCard from "~/components/ui/BadgeCard";
import SkeletonBadge from "~/components/skeletons/SkeletonBadge";
import isDeviceWidthLT from "~/libs/isDeviceWidthLT";
import GenericContext from "~/context/GenericContext";

export default function YourPlaylistsSection(): ReactElement {
  const containerRef = useRef<HTMLElement>(null);
  const token = useContext(CredentialContext) as Credential;
  const { profile } = useContext(GenericContext) as InitialResource;

  const { data, isLoading } = useFetchSpotify<Playlists>(
    "https://api.spotify.com/v1/me/playlists?limit=50",
    token,
    { method: "GET" }
  );

  // filter playlist based on current user
  const filteredPlaylist = data?.items.filter((item) => profile.id === item.owner.id) ?? [];

  if (filteredPlaylist.length > (isDeviceWidthLT(768) ? 14 : 9)) filteredPlaylist.splice(9);

  if (isLoading)
    return (
      <div className="badge-container">
        <SkeletonBadge /> <SkeletonBadge /> <SkeletonBadge />
        <SkeletonBadge /> <SkeletonBadge /> <SkeletonBadge />
        <SkeletonBadge /> <SkeletonBadge /> <SkeletonBadge />
      </div>
    );

  return (
    <Section ref={containerRef}>
      <div className="badge-container mb-6">
        {filteredPlaylist.map((item) => {
          return (
            <Link to={`/playlist/${item.id}`} key={item.id}>
              <BadgeCard
                img={item.images.at(-1)?.url as string}
                title={item.name}
                description={item.description}
              />
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
