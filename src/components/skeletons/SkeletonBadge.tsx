import { type ReactElement } from "react";
import isDeviceWidthLT from "~/libs/isDeviceWidthLT";
import { screen } from "~/global/constants";

export default function SkeletonBadge(): ReactElement {
  return (
    <div className="flex gap-2 w-min md:w-[300px]  bg-black-expose rounded-sm overflow-hidden hover:bg-neutral-700 transition-all duration-75 cursor-pointer items-center">
      <picture className="block w-[60px] h-[60px] bg-neutral-800 animate-pulse"></picture>
      {isDeviceWidthLT(screen.MD) && (
        <div className="w-[200px] h-[30px] flex flex-col justify-center bg-neutral-800 animate-pulse rounded-lg"></div>
      )}
    </div>
  );
}
