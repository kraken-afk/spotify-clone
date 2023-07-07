import { ReactElement } from "react";
import { Route } from "wouter";
import Home from "./pages/home";
import Search from "./pages/search";
import NavBar from "./components/NavBar";
import Split from "./components/Split";
import "./styles/main.scss";

export default function App(): ReactElement {
  console.log("App");
  return (
    <>
      <div className="app">
        <Split>
          <NavBar />
          <AppRoute />
        </Split>
      </div>
    </>
  );
}

function AppRoute(): ReactElement {
  return (
    <div className="p-4 rounded-[7px] bg-base transition-all">
      <Route path="/">
        <Home />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
    </div>
  );
}