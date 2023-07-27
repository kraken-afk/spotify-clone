import { useRef, type ReactElement, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isBackActive } from "~/routes";

export default function BackBtn(): ReactElement {
  const btnRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => ((btnRef.current as HTMLButtonElement).disabled = isBackActive()), 0);
  }, [location]);

  return (
    <button
      onClick={() => {
        window.history.back();
      }}
      ref={btnRef}
      type="button"
      className="w-[32px] h-[32px] bg-black rounded-full flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none first:mr-2"
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
  );
}
