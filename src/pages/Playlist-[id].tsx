import { Fragment, type ReactElement } from "react";
import { useParams } from "react-router-dom";

export default function Playlist(): ReactElement {
  const { id } = useParams();

  return (
    <Fragment>
      {id}
    </Fragment>
  );
}
