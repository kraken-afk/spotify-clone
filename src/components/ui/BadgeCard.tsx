import { forwardRef } from "react";
import isDeviceWidthLT from "~/libs/isDeviceWidthLT";
import { screen } from "~/global/constants";

interface BadgeCardProps {
  img: string;
  title: string;
  description: string;
}

const BadgeCard = forwardRef<HTMLDivElement, BadgeCardProps>((props, ref) => {
  return (
    <div
      ref={ref}
      className="flex gap-2 w-min md:w-[300px]  bg-black-expose rounded-sm overflow-hidden md:hover:bg-neutral-700 transition-all duration-75 cursor-pointer hover:opacity-70"
    >
      <picture className="block w-[60px] h-[60px] bg-neutral-800">
        <img src={props.img} alt={props.title + " cover image"} className="block" width={60} />
      </picture>
      {!isDeviceWidthLT(screen.MD) && (
        <div className="max-w-[200px] flex flex-col justify-center">
          <p className="font-bold truncate">{props.title}</p>
          <p
            className="font-bold truncate text-[.8em] text-essential-sub"
            dangerouslySetInnerHTML={{ __html: props.description }}
          ></p>
        </div>
      )}
    </div>
  );
});

export default BadgeCard;
