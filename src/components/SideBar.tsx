import { ReactElement, forwardRef, type MutableRefObject } from "react";
import { Link } from "react-router-dom";
import logoFull from "~/images/logo-full.svg";
import logo from "~/images/logo-mobile.svg";

const SideBar = forwardRef((_props, ref): ReactElement => {
  return (
    <nav className="p-2 px-0" ref={ref as MutableRefObject<HTMLDivElement>}>
      <picture className="block mb-2 py-[.7rem] px-[.3rem overflow-hidden">
        <source  media="(min-width: 640px )" srcSet={logoFull} />
        <img src={logo} alt="Spotify logo" draggable="false" className="min-w-max" />
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
    </nav>
  );
});

export default SideBar;
