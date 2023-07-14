import { type ReactElement, useContext } from "react";
import CredentialContext from "~/context/CredentialContext";
import useFetchSpotify from "../../hooks/useFetchSpotify";

export default function Home(): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const { data, isLoading } = useFetchSpotify("https://api.spotify.com/v1/me", token, { method: "GET" });

  if (isLoading)
    return <h1>Loading..</h1>;

    console.log(data);

 return (
  <h1>Home</h1>
 );
}