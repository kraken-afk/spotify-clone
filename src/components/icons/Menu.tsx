import { type ReactElement } from "react";
import { type IconsProps } from "./icons";

export default function Menu(props: IconsProps): ReactElement {
  const size = props?.size ?? 24;
  return (
    <svg
      className={props?.className ?? "inline-block"}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
    </svg>
  );
}
