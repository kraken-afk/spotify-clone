import { ReactElement } from "react";
import { Route } from "wouter";
import Home from "./pages/home";
import Search from "./pages/search";
import NavBar from "./components/NavBar";
import "./styles/main.scss";

export default function App(): ReactElement {
  return (
    <>
      <div className="app">
        <NavBar />
        <AppRoute />
      </div>
    </>
  );
}

function AppRoute(): ReactElement {
  return (
    <div className="p-4 rounded-[7px] bg-base m-[.6rem] ml-0">
      <Route path="/">
        <Home />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
    </div>
  );
}