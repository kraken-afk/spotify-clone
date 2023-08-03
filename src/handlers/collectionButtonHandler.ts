import { animate as _animate } from "framer-motion";
import isDeviceWidthLT from "~/libs/isDeviceWidthLT";
import { screen } from "~/global/constants";

let isActive = !isDeviceWidthLT(screen.MD);
let isMidScreen = isDeviceWidthLT(screen.MD);

export default function collectionButtonHandler(animate: typeof _animate): () => void {
  return () => {
    const app = document.querySelector(".app") as HTMLDivElement;
    const collection = document.querySelector(".collection") as HTMLElement;
    const main = document.querySelector("main") as HTMLElement;

    console.log("click");
    if (isMidScreen) animate(main, { left: isActive ? 0 : "1vw" });
    animate(app, { gridTemplateColumns: `${isActive ? "50px" : "296px"} .4rem 1fr` });
    animate(
      collection,
      { height: isActive ? "63px" : "calc(100vh - 170px)" },
      { type: "decay" }
    );
    isActive = !isActive;
    app.dataset.active = (+isActive).toString()
  };
}
