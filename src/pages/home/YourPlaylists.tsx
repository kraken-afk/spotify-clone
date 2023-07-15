import { useLayoutEffect, useRef, useState, type ReactElement, useContext } from "react";
import { Scrollbar, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "~/components/Card";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import CredentialContext from "~/context/CredentialContext";
import "swiper/css";
import "swiper/css/scrollbar";
import "~/styles/utils.scss";

export default function YourPlaylists(): ReactElement {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [slidesCount, setSlidesCount] = useState<number>(0);
  const token = useContext(CredentialContext) as Credential;
  const { data } = useFetchSpotify("https://api.spotify.com/v1/me/playlists?limit=10", token, { method: "GET" });

  console.log(data)

  useLayoutEffect(() => {
    if (slidesCount) return;

    const containerX = containerRef.current?.clientWidth as number;
    const cardX = cardRef.current?.clientWidth as number;
    let count = 0;

    while (count + cardX <= containerX) count += cardX;

    setSlidesCount(count / cardX);
  }, []);

  return (
    <section ref={containerRef} className="my-4 overflow-hidden">
      <h2 className="sub-title mb-4">Your playlist</h2>
      <Swiper
        className="py-4 cursor-grab active:cursor-grabbing"
        spaceBetween={16}
        slidesPerView={slidesCount}
        scrollbar={{ draggable: true }}
        modules={[Scrollbar, Virtual]}
      >
        <SwiperSlide>
          <Card
            ref={cardRef}
            coverImage="https://picsum.photos/300"
            title="Indie Gaming"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero quisquam veritatis provident aperiam cupiditate officiis. Vitae error iure repellat officiis debitis, facilis cumque enim consequatur! Accusamus expedita repellendus tenetur dolorem."
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
