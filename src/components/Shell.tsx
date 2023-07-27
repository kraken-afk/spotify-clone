import { PropsWithChildren, useContext, type ReactElement } from "react";
import NavBar from "./ui/NavBar";
import CredentialContext from "~/context/CredentialContext";
import useFetchSpotify from "~/hooks/useFetchSpotify";
import LocalLoader from "./popups/LocalLoader";
import GenericContext from "~/context/GenericContext";

export default function Shell({ children }: PropsWithChildren): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const { data, isLoading } = useFetchSpotify("https://api.spotify.com/v1/me", token, {
    method: "GET",
  });

  if (isLoading) return <LocalLoader />;

  const { images } = data as CurrentProfile;

  return (
    <GenericContext.Provider value={data}>
      <NavBar profile={images[0].url} />
      {children}
    </GenericContext.Provider>
  );
}
