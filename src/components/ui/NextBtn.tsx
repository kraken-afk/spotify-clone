import { useRef, type ReactElement, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isForwardActive } from "~/routes";

export default function NextBtn(): ReactElement {
  const btnRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => ((btnRef.current as HTMLButtonElement).disabled = isForwardActive()), 0);
  }, [location]);

  return (
    <button
      onClick={() => window.history.forward()}
      ref={btnRef}
      type="button"
      className="w-[32px] h-[32px] bg-black rounded-full flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#fff"
      >
        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
      </svg>
    </button>
  );
}
