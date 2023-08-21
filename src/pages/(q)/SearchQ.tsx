import { ReactElement } from "react";

export default function SearchQ(): ReactElement {
  const q = new URLSearchParams(location.search).get("q");
  return (
    <>
      <h1>{q}</h1>
    </>
  );
}
