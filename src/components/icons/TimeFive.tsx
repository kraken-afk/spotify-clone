import { type ReactElement } from "react";
import { type IconsProps } from "./icons";

export default function TimeFive(props: IconsProps): ReactElement {
  const size = props?.size ?? 24;
  return (
    <svg
      className={props?.className ?? "inline-block"}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
      <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
    </svg>
  );
}
