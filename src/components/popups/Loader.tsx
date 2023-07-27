import { type ReactElement } from "react";
import "~/styles/loader.scss";
import Modal from "./Modal";

interface LoaderProps {
  title?: string;
}

export default function Loader({ title }: LoaderProps): ReactElement {
  return (
    <Modal>
      <div className="loader-wrapper">
        <div className="loader">
          <div className="square" id="sq1"></div>
          <div className="square" id="sq2"></div>
          <div className="square" id="sq3"></div>
          <div className="square" id="sq4"></div>
          <div className="square" id="sq5"></div>
          <div className="square" id="sq6"></div>
          <div className="square" id="sq7"></div>
          <div className="square" id="sq8"></div>
          <div className="square" id="sq9"></div>
        </div>
        {title ? (
          <span className="block text-2xl bold text-white translate-y-[4.5rem] capitalize"></span>
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
}
