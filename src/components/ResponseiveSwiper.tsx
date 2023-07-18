import {
  useLayoutEffect,
  useState,
  type RefObject,
  PropsWithChildren
} from "react";
import { Scrollbar, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "~/styles/utils.scss";
import SkeletonCard from "./skeletons/SkeletonCard";

interface ResponsiveSwiperProps {
  isLoading: boolean;
  containerRef: RefObject<HTMLElement>;
}

export default function ResponsiveSwiper({
  isLoading, children, containerRef
}: ResponsiveSwiperProps & PropsWithChildren) {
  const [slidesCount, setSlidesCount] = useState<number>(0);

  useLayoutEffect(() => {
    if (slidesCount || isLoading) return;

    const containerX = containerRef.current?.clientWidth as number;
    const cardX = 192;
    let count = 0;

    while (count + cardX <= containerX) count += cardX;

    setSlidesCount(count / cardX);
  }, [isLoading]);


  if (isLoading)
    return (
      <div className="flex gap-4">
        <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
      </div>
    );

  return (
    <Swiper
      className="py-4 cursor-grab active:cursor-grabbing"
      spaceBetween={16}
      slidesPerView={slidesCount}
      scrollbar={{ draggable: true }}
      modules={[Scrollbar, Virtual]}
    >
     { (children as any[]).map((node, index) =>
      <SwiperSlide key={index.toString().concat("-swiperslide")}>
        {node}
      </SwiperSlide>
      )}
    </Swiper>
  );
}
