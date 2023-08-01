import { ReactElement, forwardRef, type MutableRefObject, useContext } from "react";
import { Link } from "~/routes";
import logoFull from "~/images/logo-full.svg";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import CredentialContext from "~/context/CredentialContext";
import SkeletoSideBarBadge from "~/components/skeletons/SkeletonSideBarBadge";
import SideBarBadge from "./SideBarBadge";
import collectionButtonHandler from "~/handlers/collectionButtonHandler";
import { animate } from "framer-motion";
import "~/styles/sidebar.scss";

interface SideBarProps {
  animate: typeof animate;
}

const SideBar = forwardRef<HTMLElement, SideBarProps>((props, ref): ReactElement => {
  const token = useContext(CredentialContext) as Credential;
  const { data, isLoading } = useFetchSpotify<Playlists>(
    "https://api.spotify.com/v1/me/playlists?limit=50",
    token,
    { method: "GET" }
  );

  return (
    <nav className="p-2 px-0 navigation" ref={ref as MutableRefObject<HTMLDivElement>}>
      <picture className="block mb-2 py-[.7rem] px-[.3rem overflow-hidden">
        <img src={logoFull} alt="Spotify logo" draggable="false" className="min-w-max" />
      </picture>
      <div className=" bg-base rounded-[8.5px] p-[.7rem] pl-[.8rem] py-[.3rem] max-w-[300px]  overflow-hidden">
        <div>
          <Link to="/">
            <div
              aria-label="Home"
              className="fill-essential-sub text-essential-sub hover:fill-white hover:text-white flex font-bold my-5 cursor-pointer transition-all"
            >
              <svg
                role="img"
                height="24"
                width="24"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-encore-id="icon"
                className="mr-5 min-w-max"
              >
                <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path>
              </svg>
              <span>Home</span>
            </div>
          </Link>

          <Link to="/search">
            <div
              aria-label="Search"
              className="fill-essential-sub text-essential-sub hover:fill-white hover:text-white flex font-bold my-5 cursor-pointer transition-all"
            >
              <svg
                role="img"
                height="24"
                width="24"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-encore-id="icon"
                className="mr-5 min-w-max"
              >
                <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
              </svg>
              <span>Search</span>
            </div>
          </Link>
        </div>
      </div>
      <div className=" bg-base rounded-[8.5px] p-[.7rem] pl-[.8rem] py-4 max-w-[300px] overflow-hidden mt-2 collection transition-all">
        <button
          onClick={collectionButtonHandler(props.animate)}
          type="button"
          aria-hidden="true"
          className="flex items-center gap-4 font-bold text-essential-sub cursor-pointer hover:text-white hover:fill-white fill-essential-sub w-full mb-4 sub-title"
        >
          <svg
            className="min-w-max"
            role="img"
            height="24"
            width="24"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z"></path>
          </svg>
          <span className="whitespace-nowrap text-[1rem]">Your collection</span>
        </button>
        <div className="overflow-y-auto scrollable">
          {isLoading ? (
            <>
              <SkeletoSideBarBadge />
              <SkeletoSideBarBadge />
              <SkeletoSideBarBadge />
              <SkeletoSideBarBadge />
            </>
          ) : (
            <>
              {data?.items.map((item) => (
                <Link key={item.id + "-sidebar"} to={`/${item.type}/${item.id}`}>
                  <SideBarBadge
                    img={item.images.at(-1)?.url as string}
                    owner={item.owner.display_name}
                    title={item.name}
                    type="playlist"
                  />
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </nav>
  );
});

export default SideBar;
