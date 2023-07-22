import { useContext, type ReactElement } from "react";
import { useParams } from "react-router-dom";
import NavBar from "~/components/NavBar";
import SpotifyManagerContext from "~/context/SpotfyManagerContext";
import { SpotifyManagerKey } from "~/global/constants";


export default function Playlist(): ReactElement {
  const { id } = useParams();
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
