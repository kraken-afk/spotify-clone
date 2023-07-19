import { useContext, type ReactElement } from "react";
import Section from "./Section";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import CredentialContext from "~/context/CredentialContext";

export default function ShowSection(): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const { data, isLoading } = useFetchSpotify<Shows>(
    "https://api.spotify.com/v1/me/episodes",
    token,
    { method: "GET" }
  );

  if (isLoading)
    return <h1>Loading..</h1>

    // console.log(data);

  return (
    <Section>
      <h2 className="sub-title mb-4">Your shows</h2>
      <p>Hello World</p>
    </Section>
  );
}