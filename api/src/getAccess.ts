/// <reference path="../spotify.d.ts" />
/// <reference path="../server.d.ts" />

import XFetch from "./utils/XFetch.ts";

export const getAccess = async (client_id: string, client_secret: string) => {
  const credential: Credential = await XFetch(
    "https://accounts.spotify.com/api/token",
    "POST",
    {
      body: {
        grant_type: "client_credentials",
        client_id: client_id,
        client_secret: client_secret,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return credential;
};
