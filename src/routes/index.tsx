import { forwardRef, type MutableRefObject, type ReactElement } from "react";
import Home from "~/pages/home";
import Search from "~/pages/search";
import Playlist from "~/pages/playlist";
import { Route, Routes } from "react-router-dom";

const AppRoute = forwardRef((_props, ref): ReactElement => {
  return (
    <main
      className="rounded-[7px] transition-all bg-base w-full main relative"
      ref={ref as MutableRefObject<HTMLDivElement>}
    >
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/playlist/:id" element={<Playlist />}/>
      </Routes>
    </main>
  );
});

export default AppRoute;
