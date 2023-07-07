import { ReactElement, forwardRef, useRef, type MutableRefObject } from "react";
import { Route } from "wouter";
import Home from "./pages/home";
import Search from "./pages/search";
import NavBar from "./components/NavBar";
import Split from "./components/Split";
import "./styles/main.scss";

export default function App(): ReactElement {
  const navBarRef = useRef<HTMLElement>();
  const mainRef = useRef<HTMLElement>();
  const refs = { prevRef: navBarRef, nextRef: mainRef };

  return (
    <>
      <div className="app">
        <Split refs={refs}>
          <NavBar ref={navBarRef} />
          <AppRoute ref={mainRef} />
        </Split>
      </div>
    </>
  );
}

const AppRoute = forwardRef((_props, ref): ReactElement => {
  return (
    <main className="p-4 rounded-[7px] bg-base transition-all" ref={ref as MutableRefObject<HTMLDivElement>}>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
    </main>
  );
})