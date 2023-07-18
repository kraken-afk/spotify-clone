import { forwardRef, type ReactElement } from "react";
import "~/styles/card.scss";

const SkeletonCard = forwardRef<HTMLDivElement>((_props, ref): ReactElement => {
return (
    <div ref={ref}
      className={`w-48 h-64 p-4 rounded-md bg-black-expose shadow-md hover:bg-neutral-800 transition-all duration-300 cursor-pointer relative card`}
    >
      <picture className="block h-[158px] w-full object-center rounded-sm overflow-hidden shadow-sm">
        <div className="bg-neutral-700 w-auto h-full animate-pulse rounded-2xl"></div>
      </picture>
      <div className="bg-neutral-700 w-auto h-10 mt-4 animate-pulse rounded-xl"></div>
    </div>
  );
});

export default SkeletonCard;
