import { forwardRef, type LegacyRef, type ReactElement } from "react";
import "~/styles/card.scss";

interface CardContent {
  coverImage: string;
  title: string;
  description?: string;
  className?: string;
}

const Card = forwardRef((props: CardContent, ref: LegacyRef<HTMLDivElement>): ReactElement => {
  return (
    <div
      ref={ref}
      className={`w-48 h-64 p-4 rounded-md bg-black-expose shadow-md hover:bg-neutral-800 transition-all duration-300 cursor-pointer relative card ${props.className}`}
    >
      <picture className="block h-[158px] w-full object-center rounded-sm overflow-hidden shadow-sm">
        <img src={props.coverImage} alt="image" />
      </picture>
      <h3 className="truncate font-bold mt-2">{props.title}</h3>
      <p className="text-sm font-bold text-[.8rem] text-essential-sub truncate">
        {props.description}
      </p>
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
