import { type TargetAndTransition, type VariantLabels, motion } from "framer-motion";
import { type ReactElement } from "react";

interface HomeNavBarProps {
  profile: string;
}

export default function NavBar({ profile }: HomeNavBarProps): ReactElement {
  const whileHoverValue: VariantLabels | TargetAndTransition = {
    scale: 1.05,
    opacity: .8,
  };

  return (
    <div className="flex justify-between">
      <div className="flex">
        <button
          type="button"
          className="w-[32px] h-[32px] bg-black rounded-full flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed first:mr-2"
          disabled
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
          </svg>
        </button>
        <button
          type="button"
          className="w-[32px] h-[32px] bg-black rounded-full flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
          </svg>
        </button>
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
        <motion.picture whileHover={whileHoverValue} className="overflow-hidden rounded-full border-[5px] border-black border-solid cursor-pointer">
          <img src={profile} alt="Profile image" width={32} height={32} />
        </motion.picture>
      </div>
    </div>
  );
}