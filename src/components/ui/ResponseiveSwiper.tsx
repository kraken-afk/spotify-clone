import { useLayoutEffect, useState, type RefObject, PropsWithChildren } from "react";
import { Scrollbar, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { screen } from "~/global/constants";
import SkeletonCard from "~/components/skeletons/SkeletonCard";
import isDeviceWidthLT from "~/libs/isDeviceWidthLT";
import "swiper/css";
import "swiper/css/scrollbar";
import "~/styles/utils.scss";

interface ResponsiveSwiperProps {
  isLoading: boolean;
  containerRef: RefObject<HTMLElement>;
}

export default function ResponsiveSwiper({
  isLoading,
  children,
  containerRef,
}: ResponsiveSwiperProps & PropsWithChildren) {
  const [slidesCount, setSlidesCount] = useState<number>(0);

  useLayoutEffect(() => {
    if (slidesCount || isLoading) return;

    const containerX = containerRef.current?.clientWidth as number;
    const cardX = isDeviceWidthLT(screen.MD) ? 120 : 192;
    let count = 0;

    while (count + cardX <= containerX) count += cardX;

    setSlidesCount(count / cardX);
  }, [isLoading]);

  if (isLoading || !slidesCount)
    return (
      <div className="flex gap-4">
        <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
      </div>
    );

  return (
    <Swiper
      className="py-4"
      spaceBetween={16}
      slidesPerView={slidesCount}
      scrollbar={{ draggable: true }}
      modules={[Scrollbar, Virtual]}
    >
      {(children as any[]).map((node, index) => (
        <SwiperSlide key={index.toString().concat("-swiperslide")}>{node}</SwiperSlide>
      ))}
    </Swiper>
  );
}
