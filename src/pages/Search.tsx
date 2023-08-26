import { MouseEventHandler, ReactElement, useContext, useState } from "react";
import SearchBar from "~/components/ui/SearchBar";
import "~/styles/search.scss";
import SearchQ from "./(q)/SearchQ";
import useFetchSpotify from "../hooks/useFetchSpotify";
import CredentialContext from "../context/CredentialContext";
import LocalLoader from "../components/popups/LocalLoader";
import FooterSection from "../components/layouts/FooterSection";

type Filter = "artist" | "album" | "playlist";

export default function Search(): ReactElement {
  const [type, setType] = useState<Filter>("artist");
  const params = new URLSearchParams(location.search);
  const token = useContext(CredentialContext) as Credential;
  const { data, isLoading } = useFetchSpotify<{ categories: ContentResponse<Categories> }>
    ("https://api.spotify.com/v1/browse/categories?limit=50", token);

    if (isLoading) return <LocalLoader />

  const q = params.get("q");
  const { categories } = data as { categories: ContentResponse<Categories> }


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
      <div className="p-4">
        <h2 className="sub-title mb-6">Browse by categories</h2>
        <div className="category-container">
          {
            categories.items.map(
              e =>
                <div className="w-[150px] h-[130px] rounded-md bg-black-expose p-4 relative hover:bg-neutral-800 transition-colors cursor-pointer z-0" key={e.id}>
                  <span className="z-0 font-bold">{e.name}</span>
                  <img src={e.icons[0].url} alt={e.name} className="z-[-1] w-24 rounded-md absolute left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%]" />
                </div>
            )
          }
        </div>
      </div>
      <FooterSection />
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
