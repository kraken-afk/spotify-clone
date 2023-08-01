import { useContext, useRef, type ReactElement } from "react";
import { SpotifyManagerKey } from "~/global/constants";
import { Link } from "~/routes";
import CredentialContext from "~/context/CredentialContext";
import SpotifyManagerContext from "~/context/SpotfyManagerContext";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import Section from "~/components/ui/Section";
import BadgeCard from "~/components/ui/BadgeCard";
import SkeletonBadge from "~/components/skeletons/SkeletonBadge";
import isDeviceWidthLT from "../../libs/isDeviceWidthLT";

export default function YourPlaylistsSection(): ReactElement {
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
