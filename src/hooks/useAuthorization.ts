import { useQuery } from "@tanstack/react-query";
import base64urlencode from "~/libs/base64urlencode";
import generateRandomString from "~/libs/generateRandomString";
import sha256 from "~/libs/sha256";

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

        localStorage.setItem("X-Verifier", verifier);

        endpoint.search = new URLSearchParams({
          client_id,
          state,
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

        const body: Record<string, string> = {
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

        return token as Credential;
      }
    },
  });
}
