import { type ReactElement } from "react";

export default function FooterSection(): ReactElement {
  return (
    <footer className="text-sm sm:text-lg my-4 sm:my-16 sm:min-h-[7rem] border-t-neutral-700 border-t-[1px] border-solid flex justify-center items-center flex-col text-center">
      <p className="mb-4 mt-3 sm:mb-0 sm:mt-0">
        Built by{" "}
        <a
          className="underline text-blue-600 font-bold"
          target="_blank"
          href="https://github.com/kraken-afk"
        >
          Romeo Noveanre
        </a>{" "}
        using{" "}
        <a
          className="underline text-blue-600 font-bold"
          target="_blank"
          href="https://react.dev/"
        >
          React
        </a>{" "}
        and{" "}
        <a
          className="underline text-blue-600 font-bold"
          target="_blank"
          href="https://tailwindcss.com/"
        >
          TailwindCSS
        </a>
      </p>
      <p>
        &#169; {new Date().getFullYear()} |{" "}
        <a
          className="underline text-blue-600 font-bold"
          target="_blank"
          href="https://github.com/kraken-afk/spotify-clone"
        >
          Kraken-afk
        </a>
      </p>
    </footer>
  );
}
