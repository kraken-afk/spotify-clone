import { PropsWithChildren, useContext, type ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import NavBar from "./ui/NavBar";
import CredentialContext from "~/context/CredentialContext";
import LocalLoader from "./popups/LocalLoader";
import GenericContext from "~/context/GenericContext";
import useGet from "~/hooks/useGet";
import no_icon from "~/assets/no-icon.png";

export default function Shell({ children }: PropsWithChildren): ReactElement {
  const token = useContext(CredentialContext) as Credential;
  const { data, isLoading } = useQuery({
    queryKey: ["track"],
    cacheTime: 3600,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const profile = await useGet<CurrentProfile>(
        "https://api.spotify.com/v1/me",
        { method: "GET" },
        token
      );
      const tracks = await useGet<SavedTracks>(
        "https://api.spotify.com/v1/me/tracks?limit=50",
        { method: "GET" },
        token
      );

      return { profile, tracks };
    },
  });

  if (isLoading) return <LocalLoader />;

  const { images } = data?.profile as CurrentProfile;

  return (
    <GenericContext.Provider value={data}>
      <NavBar profile={images[0]?.url ?? no_icon} />
      {children}
    </GenericContext.Provider>
  );
}
