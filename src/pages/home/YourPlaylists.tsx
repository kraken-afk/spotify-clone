import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  useContext
} from "react";
import { Scrollbar, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "~/components/Card";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import CredentialContext from "~/context/CredentialContext";
import "swiper/css";
import "swiper/css/scrollbar";
import "~/styles/utils.scss";
import SkeletonCard from "~/components/skeletons/SkeletonCard";

export default function YourPlaylists(): ReactElement {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [slidesCount, setSlidesCount] = useState<number>(0);
  const token = useContext(CredentialContext) as Credential;
  const { data, isLoading } = useFetchSpotify<CurrentProfilePlaylist>(
    "https://api.spotify.com/v1/me/playlists?limit=10",
    token,
    { method: "GET" }
  );

  useLayoutEffect(() => {
    if (slidesCount || isLoading) return;

    const containerX = containerRef.current?.clientWidth as number;
    const cardX = cardRef.current?.clientWidth as number;
    let count = 0;

    while (count + cardX <= containerX) count += cardX;

    setSlidesCount(count / cardX);
  }, [isLoading]);

  return (
    <section ref={containerRef} className="my-4 overflow-hidden">
      <h2 className="sub-title mb-4">Your playlist</h2>
      {isLoading ? (
        <div className="flex gap-4">
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
        </div>
      ) : (
        <Swiper
          className="py-4 cursor-grab active:cursor-grabbing"
          spaceBetween={16}
          slidesPerView={slidesCount}
          scrollbar={{ draggable: true }}
          modules={[Scrollbar, Virtual]}
        >
          {data?.items.map((item, index) => {
            return (
              <SwiperSlide key={item.id}>
                <Card
                  ref={index === 0 ? cardRef : null}
                  coverImage={item.images[0].url}
                  title={item.name}
                  description={
                    item.description.length
                      ? item.description
                      : `by ${item.owner.display_name}`
                  }
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
}
