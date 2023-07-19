import { useQuery } from "@tanstack/react-query";
import base64urlencode from "~/libs/base64urlencode";
import generateRandomString from "~/libs/generateRandomString";
import sha256 from "~/libs/sha256";

// TODO: store token in the backend

export default function useAuthorization() {
  return useQuery({
    queryKey: ["authorization"],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { client_id, client_secret },
      } = await (
        await fetch(`${window.location.origin}/api/auth`, {
          method: "GET",
          headers: {
            Authorization: `Basic ${import.meta.env.VITE_API_KEY}`,
          },
        })
      ).json();

      if (!("X-Verifier" in localStorage)) {
        const verifier = generateRandomString(45);
        const state = generateRandomString(16);
        const encryptedVerifier = await sha256(verifier);
        const endpoint = new URL("https://accounts.spotify.com/authorize");
        const scope =
          "user-read-private user-read-email playlist-read-private playlist-read-collaborative user-library-read user-top-read";

        localStorage.setItem("X-Verifier", verifier);

        endpoint.search = new URLSearchParams({
          client_id,
          state,
          scope,
          response_type: "code",
          redirect_uri: window.location.href,
          code_challange_method: "S256",
          code_challange: base64urlencode(encryptedVerifier),
        } as any) as any;

        window.location.href = endpoint.toString();
        return null;
      }

      if (!("isLogged" in localStorage)) {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code") as string;
        const verifier = localStorage.getItem("X-Verifier") as string;
        let body: Record<string, string> = {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: window.location.origin + "/",
          client_id: client_id,
          client_secret: client_secret,
          code_verifier: verifier,
        };

        const tokenResponse = await fetch(
          "https://accounts.spotify.com/api/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(body),
          }
        );

        const token = (await tokenResponse.json()) as Credential;

        if ("error" in token) return;

        localStorage.setItem("isLogged", "true");
        localStorage.setItem("refresh_token", token.refresh_token);

        return token as Credential;
      } else {
        const body = {
          grant_type: "refresh_token",
          refresh_token: localStorage.getItem("refresh_token") as string,
          client_id: client_id,
          client_secret: client_secret,
        };

        const tokenResponse = await fetch(
          "https://accounts.spotify.com/api/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(body),
          }
        );

        const token = (await tokenResponse.json()) as Credential;

        return token;
      }
    },
  });
}
