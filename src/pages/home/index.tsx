import { type ReactElement, useContext } from "react";
import CredentialContext from "~/context/CredentialContext";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import NavBar from "./NavBar";
import greetTime from "~/libs/greetTime";
import YourPlaylists from "./YourPlaylists";
import "~/styles/utils.scss";
import FeaturedPlaylist from "./FeaturedPlaylist";

export default function Home(): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const { data, isLoading } = useFetchSpotify<CurrentProfile>(
    "https://api.spotify.com/v1/me",
    token,
    { method: "GET" }
  );

  if (isLoading) return <h1>Loading..</h1>;

  const { images, display_name } = data as CurrentProfile;

  return (
    <>
      <NavBar profile={images[0].url} />
      <div className="pt-[4rem] px-6">
        <h2 className="sub-title mb-8">
          {greetTime()}, {display_name}.
        </h2>

        {/* Your playlist section */}
        <YourPlaylists />

        {/* Your featured playlist section */}
        <FeaturedPlaylist />
      </div>
    </>
  );
}

// https://picsum.photos/200
