import { type ReactElement } from "react";
import {
  Route as R,
  useLocation,
  type DefaultParams,
  type RouteProps as RProps,
} from "wouter";

const _history: Array<{path: string, unique: Symbol}> = [{ path: "/", unique: Symbol(new Date().toLocaleTimeString()) }]

let _index: number = 0;
let currentUnique: Symbol = _history[0].unique;
let uniqueHistory: Symbol[] = [currentUnique];
// is navigate button clicked
let isNavigate: boolean = false;

// Popstate will run first
window.addEventListener("popstate", () => {
  if (_index > 0 && uniqueHistory[_index - 1] === _history[_index - 1].unique) {
    _index -= 1;
  } else {
    _index += 1;
  }

  isNavigate = true;
});

export default function Route({ children, path }: RProps): ReactElement {
  const [location] = useLocation();

  // Then component re-render
  const child = (params: DefaultParams) => {
    // prevent twice rendering
    if (_history.at(-1)?.path !== location) {
      // if user click navigation button
      // FIXME: add history is executed after onpopstate trigerred
      // TODO: try to abstract each task to more manageable tasks
      if (isNavigate) {
        currentUnique = _history[_index].unique;
      } else {
        // if user click Link
        // new history added here
        if (_history[_index].path !== location) {
          _history.push({
            path: location,
            unique: Symbol(new Date().toLocaleTimeString()),
          });
          _index += 1;
          currentUnique = _history.at(-1)?.unique as Symbol;
          uniqueHistory.push(currentUnique);
        }
      }
      isNavigate = false;
    }

    console.log(_index, currentUnique);
    return typeof children === "function" ? children(params) : children;
  };

  return <R path={path}>{child}</R>;
}
