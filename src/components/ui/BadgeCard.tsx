import { forwardRef } from "react";

interface BadgeCardProps {
  img: string;
  title: string;
  description: string;
}

const BadgeCard = forwardRef<HTMLDivElement, BadgeCardProps>((props, ref) => {
  return (
    <div
      ref={ref}
      className="flex gap-2 w-[300px]  bg-black-expose rounded-sm overflow-hidden hover:bg-neutral-700 transition-all duration-75 cursor-pointer"
    >
      <picture className="block w-[60px] h-[60px] bg-neutral-800">
        <img src={props.img} alt={props.title + " cover image"} className="block" width={60} />
      </picture>
      <div className="max-w-[200px] flex flex-col justify-center">
        <p className="font-bold truncate">{props.title}</p>
        <p
          className="font-bold truncate text-[.8em] text-essential-sub"
          dangerouslySetInnerHTML={{ __html: props.description }}
        ></p>
      </div>
    </div>
  );
});

export default BadgeCard;
