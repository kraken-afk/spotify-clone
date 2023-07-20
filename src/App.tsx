import { useRef, type ReactElement } from "react";
import Loader from "./components/Loader";
import SideBar from "./components/SideBar";
import Split from "./components/Split";
import useAuthorization from "./hooks/useAuthorization";
import ErrorModal from "./components/ErrorModal";
import CredentialContext from "./context/CredentialContext";
import AppRoute from "./routes";
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


