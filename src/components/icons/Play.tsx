import { type ReactElement } from "react";
import { type IconsProps } from "./icons";

export default function Heart(props: IconsProps): ReactElement {
  const size = props?.size ?? 24;
  return (
    <svg
      className={props?.className ?? "inline-block"}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path d="M7 6v12l10-6z"></path>
    </svg>
  );
}
