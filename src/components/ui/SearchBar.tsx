import { ReactElement, useState, HTMLAttributes, useContext } from "react";
import { Link } from "~/routes";
import { useNavigate } from "react-router-dom";
import CredentialContext from "~/context/CredentialContext";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import LocalLoader from "~/components/popups/LocalLoader";

interface SearchBarProps extends HTMLAttributes<HTMLInputElement> {
  searchType: string;
}

export default function SearchBar(props: SearchBarProps): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data, isLoading } = useFetchSpotify<SearchResponse>(
    `https://api.spotify.com/v1/search?q=${query}&type=${props.searchType}&limit=10`,
    token
  );

  return (
    <div className="relative flex justify-center max-w-lg mx-auto">
      <input
        type="text"
        placeholder={`Search ${props.searchType}`}
        className="w-full h-12 rounded-md px-4 bg-base focus-visible:outline-none border-[1px] border-neutral-800 focus-visible:border-neutral-700"
        onKeyUp={(event) => {
          // @ts-ignore
          const value = event.target.value;

          if (event.key === "Enter") navigate(`/search?q=${query}&type=${props.searchType}`);

          setQuery(value);
        }}
      />
      {query && (
        <div className="absolute top-full left-0 w-full flex flex-col rounded-b-lg border-[1px] border-neutral-800 h-[300px] overflow-y-auto bg-black-expose dropdown">
          {isLoading && <LocalLoader />}
          {data?.artists &&
            data?.artists.items.map((v) => (
              <Link
                key={v.id}
                to={`/artist/${v.id}`}
                className="px-3 py-2 border-b-[1px] border-b-neutral-800 hover:bg-neutral-700 cursor-pointer recomendation-list"
              >
                <picture className="w-10 h-10 overflow-hidden rounded-full bg-neutral-700">
                  <img
                    loading="lazy"
                    src={v.images.at(-1)?.url}
                    alt={v.name.concat(" picture")}
                    className="w-full object-center"
                  />
                </picture>
                <div className="flex flex-col gap-1">
                  <span className="max-w-[250px] truncate">{v.name}</span>
                  <span className="text-sm text-neutral-500">{v.type}</span>
                </div>
              </Link>
            ))}
          {data?.albums &&
            data?.albums.items.map((v) => (
              <Link
                key={v.id}
                to={`/album/${v.id}`}
                className="px-3 py-2 border-b-[1px] border-b-neutral-800 hover:bg-neutral-700 cursor-pointer recomendation-list"
              >
                <picture className="w-10 h-10 overflow-hidden rounded-full bg-neutral-700">
                  <img
                    loading="lazy"
                    src={v.images.at(-1)?.url}
                    alt={v.name.concat(" picture")}
                    className="w-full object-center"
                  />
                </picture>
                <div className="flex flex-col gap-1">
                  <span className="max-w-[250px] truncate">{v.name}</span>
                  <span className="text-sm text-neutral-500">
                    {v.type} &bull; {v.artists.map((artist) => artist.name).join(", ")}
                  </span>
                </div>
              </Link>
            ))}
          {data?.playlists &&
            data?.playlists.items.map((v) => (
              <Link
                key={v.id}
                to={`/playlist/${v.id}`}
                className="px-3 py-2 border-b-[1px] border-b-neutral-800 hover:bg-neutral-700 cursor-pointer recomendation-list"
              >
                <picture className="w-10 h-10 overflow-hidden rounded-full bg-neutral-700">
                  <img
                    loading="lazy"
                    src={v.images.at(-1)?.url}
                    alt={v.name.concat(" picture")}
                    className="w-full object-center"
                  />
                </picture>
                <div className="flex flex-col gap-1">
                  <span className="max-w-[250px] pb-3 truncate">{v.name}</span>
                  <span className="text-sm text-neutral-500 basis-full">
                    {v.type} &bull; {v.owner.display_name}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
