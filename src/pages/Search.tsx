import { MouseEventHandler, ReactElement, useState } from "react";
import SearchBar from "~/components/ui/SearchBar";
import "~/styles/search.scss";
import SearchQ from "./(q)/SearchQ";

type Filter = "artist" | "album" | "playlist";

export default function Search(): ReactElement {
  const [type, setType] = useState<Filter>("artist");
  const params = new URLSearchParams(location.search);
  const q = params.get("q");

  if (q) return <SearchQ />;

  return (
    <>
      <div className="my-8 mx-auto px-4 sm:px-8">
        <div className="mb-4 flex gap-4 w-min mx-auto">
          <button
            onClick={filterClickHandler(setType)}
            data-type="artist"
            className="px-6 py-1 border-[1px] rounded-2xl border-neutral-700 hover:bg-neutral-800 btn-filter-active"
          >
            Artists
          </button>
          <button
            onClick={filterClickHandler(setType)}
            data-type="playlist"
            className="px-6 py-1 border-[1px] rounded-2xl border-neutral-700 hover:bg-neutral-800"
          >
            Playlist
          </button>
          <button
            onClick={filterClickHandler(setType)}
            data-type="album"
            className="px-6 py-1 border-[1px] rounded-2xl border-neutral-700 hover:bg-neutral-800"
          >
            Album
          </button>
        </div>
        <SearchBar searchType={type} />
      </div>
      <div>
        <h2>Browse</h2>
        <div className="category-container">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

function filterClickHandler(dispatch: React.Dispatch<React.SetStateAction<Filter>>) {
  const fn: MouseEventHandler<HTMLButtonElement> = (event) => {
    const element = event.target as HTMLElement;
    const childs = ((event.target as HTMLElement).parentElement as HTMLElement)
      .children as HTMLCollection;

    for (const child of childs) child.classList.remove("btn-filter-active");

    element.classList.add("btn-filter-active");
    dispatch(element.dataset.type as Filter);
  };

  return fn;
}
