import { type ReactElement } from "react";
import "~/styles/local-loader.scss";

export default function LocalLoader(): ReactElement {
  return (
    <div className="absolute top-0 left-0 bg-neutral-900 w-full h-full flex justify-center items-center">
      <div className="loader">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </div>
  );
}
