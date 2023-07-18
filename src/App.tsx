import { type ReactElement, forwardRef, useRef, type MutableRefObject } from "react";
import { Route } from "wouter";
import Loader from "./components/Loader";
import SideBar from "./components/SideBar";
import Split from "./components/Split";
import useAuthorization from "./hooks/useAuthorization";
import Home from "./pages/home";
import Search from "./pages/search";
import ErrorModal from "./components/ErrorModal";
import CredentialContext from "./context/CredentialContext";
import "./styles/main.scss";

export default function App(): ReactElement {
  const navBarRef = useRef<HTMLElement>();
  const mainRef = useRef<HTMLElement>();
  const refs = { prevRef: navBarRef, nextRef: mainRef };
  const { data: token, isLoading, error } = useAuthorization();

  if (error)
    return <ErrorModal />;

  if (!token || isLoading)
    return <Loader title="loading..." />;

  return (
  <CredentialContext.Provider value={token}>
      <div className="app">
        <Split refs={refs}>
          <SideBar ref={navBarRef} />
          <AppRoute ref={mainRef} />
        </Split>
      </div>
    </CredentialContext.Provider>
  );
}

const AppRoute = forwardRef((_props, ref): ReactElement => {
  return (
    <main
      className="rounded-[7px] transition-all bg-base w-full main"
      ref={ref as MutableRefObject<HTMLDivElement>}
    >
      <Route path="/">
        <Home />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
    </main>
  );
});
