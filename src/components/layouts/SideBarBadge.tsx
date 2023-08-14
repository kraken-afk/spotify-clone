import { ReactElement } from "react";

interface SideBarBadgeProps {
  img: string;
  title: string;
  owner: string;
  type: string;
}

export default function SideBarBadge(props: SideBarBadgeProps): ReactElement {
  return (
    <div className="h-[64px] w-full items-center badge-container-sidebar cursor-pointer">
      <picture className="block bg-neutral-700  w-[50px] h-[50px] rounded-md overflow-hidden">
        <img src={props.img} alt="" width={50} loading="lazy" />
      </picture>
      <div>
        <span className="font-semibold truncate hover:underline">{props.title}</span>
        <div className="text-essential-sub text-sm desc flex">
          <span className="truncate">{props.type}</span>
          <span className="px-1">&#x2022;</span>
          <span className="truncate">{props.owner}</span>
        </div>
      </div>
    </div>
  );
}
