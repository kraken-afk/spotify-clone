import { forwardRef, type MutableRefObject, type ReactElement } from "react";
import { Route } from "wouter";
import Home from "~/pages/home";
import Search from "~/pages/search";
import Playlist from "~/pages/[playlist]";

const AppRoute = forwardRef((_props, ref): ReactElement => {

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
        {(params) => <Playlist id={params.id} />}
      </Route>
    </main>
  );
});

export default AppRoute;
