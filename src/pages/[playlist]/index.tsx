import { useContext, type ReactElement } from "react";
import NavBar from "~/components/NavBar";
import SpotifyManagerContext from "~/context/SpotfyManagerContext";
import { SpotifyManagerKey } from "~/global/constants";

interface PlaylistProps {
  id: string;
}

export default function Playlist({ id }: PlaylistProps): ReactElement {
  const spotifyManager = useContext(SpotifyManagerContext);
  const profileImg = spotifyManager.get<CurrentProfile>(SpotifyManagerKey.USER)
    .images[0].url;

  return (
    <>
      <NavBar profile={profileImg} />
      {id}
    </>
  );
}
