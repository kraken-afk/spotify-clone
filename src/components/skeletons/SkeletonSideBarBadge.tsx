import { ReactElement } from "react";

export default function SkeletoSideBarBadge(): ReactElement {
  return (
    <div className="h-[64px] w-full flex gap-4 items-center">
      <picture className="block bg-neutral-700  w-[60px] h-[60px] rounded-md overflow-hidden"></picture>
      <div
        style={{
          width: "calc(100% - (60px + 16px))",
        }}
        className="bg-neutral-700 flex h-[35px] rounded-2xl"
      ></div>
    </div>
  );
}
