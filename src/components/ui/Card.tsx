import { forwardRef, type ReactElement, type MouseEventHandler } from "react";
import PlayButton from "./PlayButton";
import "~/styles/card.scss";
import isDeviceWidthLT from "~/libs/isDeviceWidthLT";
import { screen } from "~/global/constants";

interface CardContent {
  coverImage: string;
  title: string;
  description?: string;
  className?: string;
  type?: string;
  onClick?: MouseEventHandler;
}

const Card = forwardRef<HTMLDivElement, CardContent>((props, ref): ReactElement => {
  return (
    <div
      onClick={props.onClick}
      ref={ref}
      className={`w-[120px] md:w-48 md:h-64 md:p-4 rounded-md md:bg-black-expose shadow-md md:hover:bg-neutral-800 transition-all duration-300 cursor-pointer relative card ${props.className}`}
    >
      <picture className="block md:h-[158px] h-[120px] w-[120px] md:w-full object-center rounded-sm overflow-hidden shadow-sm bg-neutral-700 animate-pulse">
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
      <h3 className="truncate font-bold mt-2">{props.title}</h3>
      <p
        className="text-xs md:text-sm font-bold text-[.8em] text-essential-sub truncate"
        dangerouslySetInnerHTML={{ __html: props.description as string }}
      ></p>
      {props?.type !== "show" && !isDeviceWidthLT(screen.MD) && (
        <PlayButton className=" absolute shadow-lg right-6 bottom-20 opacity-0 play-btn" />
      )}
    </div>
  );
});

export default Card;
