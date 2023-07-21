import { forwardRef, type MutableRefObject, type ReactElement } from "react";
import Home from "~/pages/home";
import Search from "~/pages/search";
import Playlist from "~/pages/[playlist]";
import Route from "./Route";

const AppRoute = forwardRef((_props, ref): ReactElement => {
  console.log("<AppRoute />");
  return (
    <main
      className="rounded-[7px] transition-all bg-base w-full main relative"
      ref={ref as MutableRefObject<HTMLDivElement>}
    >
      <Route path="/">
        <Home />
      </Route>

      <Route path="/search">
        <Search />
      </Route>

      <Route path="/playlist/:id">
        {(params) => <Playlist id={params.id as string} />}
      </Route>
    </main>
  );
});

export default AppRoute;
