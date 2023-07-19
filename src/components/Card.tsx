import { forwardRef, type ReactElement } from "react";
import "~/styles/card.scss";

interface CardContent {
  coverImage: string;
  title: string;
  description?: string;
  className?: string;
}

const Card = forwardRef<HTMLDivElement, CardContent>((props, ref): ReactElement => {
  return (
    <div
      ref={ref}
      className={`w-48 h-64 p-4 rounded-md bg-black-expose shadow-md hover:bg-neutral-800 transition-all duration-300 cursor-pointer relative card ${props.className}`}
    >
      <picture className="block h-[158px] w-full object-center rounded-sm overflow-hidden shadow-sm bg-neutral-700 animate-pulse">
        <img src={props.coverImage} alt="image" loading="lazy" onLoad={({ target }) => {
          (target as HTMLElement).parentElement?.classList.remove(
            "bg-neutral-700",
            "animate-pulse"
          );
        }}  />
      </picture>
      <h3 className="truncate font-bold mt-2">{props.title}</h3>
      <p
        className="text-sm font-bold text-[.8rem] text-essential-sub truncate"
        dangerouslySetInnerHTML={{ __html: props.description as string }}
      ></p>
      <div className="absolute shadow-lg right-6 bottom-20 h-12 w-12 bg-green opacity-0 rounded-full flex justify-center items-center play-btn transition-all duration-300">
        <svg
          className="block translate-x-[2px]"
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="#000"
        >
          <path d="M7 6v12l10-6z"></path>
        </svg>
      </div>
    </div>
  );
})

export default Card;
