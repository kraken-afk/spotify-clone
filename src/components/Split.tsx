import {
  ReactElement,
  useRef,
  useEffect,
  useCallback,
  type LegacyRef,
  type ReactNode,
} from "react";

export default function Split({ children, refs }: SplitComponentProps): ReactElement {
  const gutterRef = useRef<HTMLDivElement>();

  const mouseHandler = useCallback(() => {
    const element = gutterRef.current;
    const leftSide = refs.prevRef.current;
    const rightSide = refs.nextRef.current;

    let x = 0;
    let y = 0;
    let leftWidth = 0;

    element?.addEventListener("mousedown", mouseDownHandler);

    function mouseDownHandler({ clientX, clientY }: MouseEvent) {
      x = clientX;
      y - clientY;
      leftWidth = leftSide?.getBoundingClientRect().width as number;

      document?.addEventListener("mouseup", mouseUpHandler);
      document?.addEventListener("mousemove", mouseMoveHandler);
    }

    function mouseMoveHandler({ clientX }: MouseEvent) {
      clientX = clientX < 65 ? 65 : clientX;
      clientX = clientX > 315 ? 315 : clientX;
      const dx = clientX - x;
      let newLeftWidth =
        ((leftWidth + dx) * 100) /
        (element?.parentElement?.getBoundingClientRect().width as number);

      leftSide.parentElement.style.gridTemplateColumns = `${newLeftWidth}% .4rem 1fr`;

      leftSide.style.userSelect = "none";
      leftSide.style.pointerEvents = "none";

      rightSide.style.userSelect = "none";
      rightSide.style.pointerEvents = "none";
      document.body.style.cursor = "col-resize";
    }

    function mouseUpHandler() {
      document.body.style.removeProperty("cursor");
      document.body.style.removeProperty("cursor");

      leftSide.style.removeProperty("user-select");
      leftSide.style.removeProperty("pointer-events");

      rightSide.style.removeProperty("user-select");
      rightSide.style.removeProperty("pointer-events");

      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    }
  }, []);

  useEffect(mouseHandler, []);

  return (
    <>
      {(children as ReactNode[])[0]}
      <div ref={gutterRef as LegacyRef<HTMLDivElement>} data-type="gutter"></div>
      {(children as ReactNode[])[1]}
    </>
  );
}
