import { useContext, type ReactElement } from "react";
import { SpotifyManagerKey } from "~/global/constants";
import CredentialContext from "~/context/CredentialContext";
import SpotifyManagerContext from "~/context/SpotfyManagerContext";
import useFetchSpotifyBatch from "~/hooks/useFetchSpotifyBatch";
import greetTime from "~/libs/greetTime";
import FeaturedPlaylist from "./components/FeaturedPlaylist";
import NavBar from "../../components/NavBar";
import YourPlaylists from "./components/YourPlaylists";
import ShowSection from "./components/ShowsSection";
import LocalLoader from "~/components/LocalLoader";
import EpisodesSection from "./components/EpisodesSection";
import "~/styles/utils.scss";

export default function Home(): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const spotfyManager = useContext(SpotifyManagerContext);
  const [userResponse, genresResponse] = useFetchSpotifyBatch(
    {
      user: {
        url: "https://api.spotify.com/v1/me",
        method: "GET",
      },
      genres: {
        url: "https://api.spotify.com/v1/recommendations/available-genre-seeds",
        method: "GET",
      },
    },
    token
  );
  const { data, isLoading } = userResponse;
  const { data: genres, isLoading: isGenresLoading } = genresResponse;

  if (isLoading || isGenresLoading) return <LocalLoader />;

  const { images, display_name } = data as CurrentProfile;

  if (data)
    spotfyManager.set<CurrentProfile>(
      SpotifyManagerKey.USER,
      data as CurrentProfile
    );

  if (genres) spotfyManager.set<Genres>(SpotifyManagerKey.GENRES, genres as Genres);

  return (
    <>
      <NavBar profile={images[0].url} />
      <div className="pt-[4rem] px-6 selection:bg-transparent">
        <h2 className="sub-title mb-8">
          {greetTime()}, {display_name}.
        </h2>

        {/* playlist section */}
        <YourPlaylists />

        {/* featured playlist section */}
        <FeaturedPlaylist />

        {/* Shows section */}
        <ShowSection />

        {/* Episodes section */}
        <EpisodesSection />
      </div>
    </>
  );
}

// https://picsum.photos/200
