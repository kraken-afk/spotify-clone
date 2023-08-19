import { ReactElement, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "~/routes";
import ExplicitContent from "~/components/icons/ExplicitContent";
import HeartSolid from "~/components/icons/HeartSolid";
import Heart from "~/components/icons/Heart";
import Play from "~/components/icons/Play";
import msToTime, { TimeConverterEnum } from "~/libs/msToTime";



interface ToptrackListProps {
  tracks: Track[]
  savedTracks: Array<{
    added_at: string;
    track: Track;
  }>;
}

export default function TopTrackSection({ tracks, savedTracks }: ToptrackListProps): ReactElement {
  const [isExpand, setIsExpand] = useState(false);
  const location = useLocation();

  return (
    <div>
      {tracks.slice(0, isExpand ? undefined : 5).map((item, index) => (
        <div
          key={item.id}
          className="cursor-pointer hover:bg-main-black song-row flex justify-between"
        >
          <div className="flex gap-3 items-center">
            <div className="text-sm py-4 px-4 text-essential-sub text-right relative">
              <span className="number absolute right-1/3 top-1/2 translate-y-[-50%]">
                {index + 1}
              </span>
              <span className="play-btn hidden absolute right-0 top-1/2 translate-y-[-50%]">
                <Play size={24} className="fill-essential-sub inline" />
              </span>
            </div>
            <div className="text-sm py-4">
              <div className="flex items-center gap-4">
                <div className="w-[48px] h-[48px] bg-neutral-700 overflow-hidden">
                  <img
                    src={item.album.images.at(-1)?.url}
                    alt="album profile"
                    loading="lazy"
                    width={48}
                  />
                </div>
                <div className="flex flex-col px-2">
                  <span className="truncate max-w-[120px] sm:max-w-[250px] hover:underline underline-offset-2">
                    {item.name}
                  </span>
                  <span className="text-essential-sub">
                    {item.explicit ? <ExplicitContent /> : ""}
                    {!/^\/artist\/.+/.test(location.pathname) &&
                      item.artists.map((artist) => (
                        <Link
                          key={artist.id}
                          to={`/artist/${artist.id}`}
                          className="first-of-type:ml-1 hover:underline underline-offset-2"
                        >
                          {artist.name}
                          {index === item.artists.length - 1 ? "" : ", "}
                        </Link>
                      ))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-6 items-center">
            <div className="p-4 relative flex items-center justify-center">
              {savedTracks.find(({ track }) => {
                return track.id === item.id;
              }) ? (
                <button
                  type="button"
                  className="bg-transparent border-none w-min h-min heart-solid"
                  onClick={() => alert("unlove")}
                >
                  <HeartSolid size={20} className=" fill-green" />
                </button>
              ) : (
                ""
              )}
              <button
                type="button"
                className="hidden bg-transparent border-none w-min h-min heart-btn"
                onClick={() => alert("love")}
              >
                <Heart size={20} className="fill-essential-sub" />
              </button>
            </div>
            <div className="text-sm py-4">
              {msToTime(item.duration_ms, TimeConverterEnum.DURATION)}
            </div>
            <div>
              <div
                className="flex gap-1 items-center cursor-pointer opacity-30 transition-all duration-0 hover:opacity-100 p-4 lg:flex-row flex-col"
                onClick={() => alert("menu")}
              >
                <div className="w-[2px] h-[2px] bg-essential-sub rounded-full"></div>
                <div className="w-[2px] h-[2px] bg-essential-sub rounded-full"></div>
                <div className="w-[2px] h-[2px] bg-essential-sub rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        role="button"
        className="text-essential-sub font-bold hover:text-white"
        onClick={() => setIsExpand((prev) => !prev)}
      >
        {isExpand ? "See less." : "See more."}
      </button>
    </div>
  );
}
