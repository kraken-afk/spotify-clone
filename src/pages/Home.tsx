import { useContext, type ReactElement } from "react";
import greetTime from "~/libs/greetTime";
import FeaturedPlaylistSection from "~/components/layouts/FeaturedPlaylistSection";
import YourPlaylistsSection from "~/components/layouts/YourPlaylistsSection";
import ShowSection from "~/components/layouts/ShowsSection";
import EpisodesSection from "~/components/layouts/EpisodesSection";
import GenericContext from "~/context/GenericContext";
import FooterSection from "~/components/layouts/FooterSection";
import NewReleaseAlbumsSection from "~/components/layouts/NewReleaseAlbumsSection";
import "~/styles/utils.scss";

export default function Home(): ReactElement {
  const { profile } = useContext(GenericContext) as InitialResource;

  return (
    <>
      <div className="pt-[4rem] px-6 selection:bg-transparent">
        <h2 className="sub-title mb-8">
          {greetTime()}, {profile.display_name}.
        </h2>
        <YourPlaylistsSection />
        <FeaturedPlaylistSection />
        <NewReleaseAlbumsSection />
        <ShowSection />
        <EpisodesSection />
        <FooterSection />
      </div>
    </>
  );
}
