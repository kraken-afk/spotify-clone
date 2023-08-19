import { type TargetAndTransition, type VariantLabels, motion } from "framer-motion";
import { Link } from "~/routes";
import { useRef, type ReactElement, useEffect } from "react";
import BackBtn from "~/components/ui/BackBtn";
import NextBtn from "~/components/ui/NextBtn";

interface HomeNavBarProps {
  profile: string;
  id: string;
}

export default function NavBar({ profile, id }: HomeNavBarProps): ReactElement {
  const navRef = useRef<HTMLDivElement>(null);
  const whileHoverValue: VariantLabels | TargetAndTransition = {
    scale: 1.05,
    opacity: 0.8,
  };

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: document.querySelector(".main"),
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(([entries]) => {
      if (entries.intersectionRatio < 1)
        navRef.current?.classList.replace("bg-transparent", "bg-black");
      else navRef.current?.classList.replace("bg-black", "bg-transparent");
    }, options);

    observer.observe(navRef.current as Element);
  }, [navRef]);

  return (
    <div
      id="navbar"
      className="bg-opacity-40 transition-all duration-300 flex justify-between items-center sticky top-[-1px] left-0 z-10 backdrop-blur bg-transparent p-4"
      ref={navRef}
    >
      <div className="flex">
        <BackBtn />
        <NextBtn />
      </div>
      <div className="flex items-center">
        <motion.button
          type="button"
          aria-label="Install the apps"
          className="flex mr-2 font-bold bg-black p-1 px-2 rounded-2xl"
          whileHover={whileHoverValue}
        >
          <svg
            className="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#fff"
            aria-hidden
          >
            <path d="M12 1.993C6.486 1.994 2 6.48 2 11.994c0 5.513 4.486 9.999 10 10 5.514 0 10-4.486 10-10s-4.485-10-10-10.001zm0 18.001c-4.411-.001-8-3.59-8-8 0-4.411 3.589-8 8-8.001 4.411.001 8 3.59 8 8.001s-3.589 8-8 8z"></path>
            <path d="M13 8h-2v4H7.991l4.005 4.005L16 12h-3z"></path>
          </svg>
          <span aria-hidden>Install the apps</span>
        </motion.button>
        <motion.picture
          whileHover={whileHoverValue}
          className="overflow-hidden rounded-full border-[5px] border-black border-solid cursor-pointer"
        >
          <Link to={`/user/${id}`}>
            <img src={profile} alt="Profile image" width={32} height={32} />
          </Link>
        </motion.picture>
      </div>
    </div>
  );
}
