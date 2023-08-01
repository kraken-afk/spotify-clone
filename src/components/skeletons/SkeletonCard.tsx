import { forwardRef, type ReactElement } from "react";
import "~/styles/card.scss";

const SkeletonCard = forwardRef<HTMLDivElement>((_props, ref): ReactElement => {
  return (
    <div
      ref={ref}
      className={`mt-4 md:mt-0 w-[120px] md:w-48 md:h-64 md:p-4 rounded-md md:bg-black-expose shadow-md md:hover:bg-neutral-800 transition-all duration-300 cursor-pointer relative card`}
    >
      <picture className="block md:h-[158px] h-[120px] w-[120px] md:w-full rounded-sm shadow-sm bg-neutral-700 animate-pulse"></picture>
      <div className="bg-neutral-700 w-auto h-4 mt-4 animate-pulse rounded-xl"></div>
    </div>
  );
});

export default SkeletonCard;
