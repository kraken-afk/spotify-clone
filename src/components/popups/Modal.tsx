import { PropsWithChildren, type ReactElement } from "react";
import { createPortal } from "react-dom";
import "~/styles/modal.scss";

export default function Modal({ children }: PropsWithChildren): ReactElement {
  return (
    <>
      {createPortal(
      <div className="modal-wrapper">
          {children}
        </div>
        ,document.body as HTMLElement
      )}
    </>
  );
}