import { type ReactElement } from "react";
import { Route as R, useLocation, type DefaultParams, type RouteProps as RProps } from "wouter";

// TODO: figure it out

window.addEventListener("popstate", () => {
  // when user click the navigation button, back or forward.
  // this block will executed
});

function createUnique() {
  return Symbol(new Date().getTime());
}

export default function Route({ children, path }: RProps): ReactElement {
  const [location] = useLocation();
  const child = (params: DefaultParams) => {

    // every url change, this block will executed
    return typeof children === "function" ? children(params) : children;
  };

  return <R path={path}>{child}</R>;
}
