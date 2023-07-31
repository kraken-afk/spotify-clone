import { useRef, type ReactElement } from "react";
import Loader from "./components/popups/Loader";
import SideBar from "./components/layouts/SideBar";
import Split from "./components/Split";
import useAuthorization from "./hooks/useAuthorization";
import ErrorModal from "./components/popups/ErrorModal";
import CredentialContext from "./context/CredentialContext";
import AppRoute from "./routes";
import "./styles/main.scss";

export default function App(): ReactElement {
  const navBarRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const refs = { prevRef: navBarRef, nextRef: mainRef };
  const { data: token, isLoading, error } = useAuthorization();

  if (error) return <ErrorModal />;

  if (!token || isLoading) return <Loader />;

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
