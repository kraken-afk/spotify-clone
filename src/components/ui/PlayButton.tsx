import { type ReactElement } from "react";

interface PlayButtonProps {
  className?: string;
  svgSize?: number;
}

export default function PlayButton(props: PlayButtonProps): ReactElement {
  const svgSize = props?.svgSize ? props.svgSize : 38;

  return (
    <div
      className={`h-12 w-12 bg-green rounded-full flex justify-center items-center transition-all duration-300`.concat(
        " ",
        props?.className ? props.className : ""
      )}
    >
      <svg
        className="block translate-x-[2px]"
        xmlns="http://www.w3.org/2000/svg"
        width={svgSize}
        height={svgSize}
        viewBox="0 0 24 24"
        fill="#000"
      >
        <path d="M7 6v12l10-6z"></path>
      </svg>
    </div>
  );
}
