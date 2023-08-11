import { forwardRef, type ReactElement, type MouseEventHandler } from "react";
import { screen } from "~/global/constants";
import PlayButton from "./PlayButton";
import isDeviceWidthLT from "~/libs/isDeviceWidthLT";
import "~/styles/card.scss";

interface CardContent {
  coverImage: string;
  name: string;
  className?: string;
  type?: string;
  onClick?: MouseEventHandler;
}

const CreatorCard = forwardRef<HTMLDivElement, CardContent>((props, ref): ReactElement => {
  return (
    <div
      onClick={props.onClick}
      ref={ref}
      className={`w-[120px] md:w-48 md:h-64 md:p-4 rounded-md md:bg-black-expose shadow-md md:hover:bg-neutral-800 transition-all duration-300 cursor-pointer relative card ${props.className}`}
    >
      <picture className="block md:h-[158px] h-[120px] w-[120px] md:w-full object-center rounded-full overflow-hidden shadow-2xl  bg-neutral-700 animate-pulse">
        <img
          src={props.coverImage}
          alt="image"
          loading="lazy"
          onLoad={({ target }) => {
            (target as HTMLElement).parentElement?.classList.remove(
              "bg-neutral-700",
              "animate-pulse"
            );
          }}
        />
      </picture>
      <h3 className="truncate font-bold mt-2">{props.name}</h3>
      {!isDeviceWidthLT(screen.MD) && (
        <p className="text-xs md:text-sm font-bold text-[.8em] text-essential-sub truncate">
          {props.type}
        </p>
      )}
      {props?.type !== "show" && !isDeviceWidthLT(screen.MD) && (
        <PlayButton className=" absolute shadow-lg right-6 bottom-20 opacity-0 play-btn" />
      )}
    </div>
  );
});

export default CreatorCard;
