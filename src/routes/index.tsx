import {
  forwardRef,
  useEffect,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import {
  LinkProps,
  Route,
  Routes,
  useHref,
  useLinkClickHandler,
  useLocation,
} from "react-router-dom";
import Playlist from "~/pages/Playlist-[id]";
import Search from "~/pages/Search";
import Shell from "~/components/Shell";
import Home from "~/pages/Home";


interface HistoryUrl {
  path: string;
  unique: string;
}

const histories: Array<HistoryUrl> = [];
let index: number = 0;
let isPopstateTrigerred: boolean = false;
let isInit: boolean = false;
let isNavigationMode = false;

window.addEventListener("popstate", () => {
  isPopstateTrigerred = true;
  isNavigationMode = true;
});

const AppRoute = forwardRef<HTMLElement, unknown>(
  (_props, ref): ReactElement => {
    const location = useLocation();

    useEffect(() => {
      if (!isInit && location.pathname !== "/") {
        histories.push({ path: "/", unique: "default-first" });
        isInit = true;
        return;
      }
      if (!isPopstateTrigerred && isInit) {
        // First load

        if (!histories.length) index = 0;
        // Second and so on..
        else {
          // when anchor clicked
          index += 1;
        }
        histories.push({ path: location.pathname, unique: location.key });
      } else {
        // if navigation mode, this block invoked
        if (location.key === histories[index - 1]?.unique) {
          index -= 1;
        } else if (location.key === histories[index + 1]?.unique) {
          index += 1;
        }
        isPopstateTrigerred = false;
      }
      if (!isInit) isInit = true;
    }, [location]);

    return (
      <main
        className="rounded-[7px] transition-all bg-base w-full main relative"
        ref={ref}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Shell>
                <Home />
              </Shell>
            }
          />
          <Route
            path="/search"
            element={
              <Shell>
                <Search />
              </Shell>
            }
          />
          <Route
            path="/playlist/:id"
            element={
              <Shell>
                <Playlist />
              </Shell>
            }
          />
        </Routes>
      </main>
    );
  }
);

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref): ReactElement => {
    const href = useHref(props.to);
    const location = useLocation();
    const clickHandler = useLinkClickHandler(props.to, {
      ...props,
      replace: props?.replace ?? false,
    });
    const linkHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
      event.preventDefault();
      if (location.pathname === props.to)  return;
      if (isNavigationMode && index !== histories.length - 1) {
        histories.splice(index + 1);
      }
      clickHandler(event);
    };

    return (
      <a
        ref={ref}
        className={props.className}
        href={href}
        onClick={linkHandler}
      >
        {props.children}
      </a>
    );
  }
);

export const isBackActive = () => !(index > 0);

export const isForwardActive = () => !(isNavigationMode && index < histories.length - 1);

export default AppRoute;
