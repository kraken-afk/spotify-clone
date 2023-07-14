import { type ReactElement, forwardRef, useRef, type MutableRefObject } from "react";
import { Route } from "wouter";
import Loader from "./components/Loader";
import NavBar from "./components/NavBar";
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
          <NavBar ref={navBarRef} />
          <AppRoute ref={mainRef} />
        </Split>
      </div>
    </CredentialContext.Provider>
  );
}

const AppRoute = forwardRef((_props, ref): ReactElement => {
  return (
    <main
      className="p-4 rounded-[7px] bg-base transition-all"
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
