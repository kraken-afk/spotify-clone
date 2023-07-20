import { useQueries } from "@tanstack/react-query";

type useFetchSpotifyBatchUrls = Record<string, { url: string } & RequestInit>;

// TODO: improve type safety

export default function useFetchSpotifyBatch<T = unknown>(
  endpointInit: useFetchSpotifyBatchUrls,
  token: Credential
) {
  return useQueries({
    queries: Object.keys(endpointInit).map((key, index) => {
      return {
        queryKey: [key, index + 1],
        cacheTime: 3600,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        queryFn: async () => {
          const url = endpointInit[key].url;

          const meta: Record<string, any> = { ...endpointInit[key] };

          delete meta.url;

          if ("headers" in meta)
            meta.headers[
              "Authorization"
            ] = `${token.token_type} ${token.access_token}`;
          else
            meta.headers = {
              Authorization: `${token.token_type} ${token.access_token}`,
            };

          const response = await fetch(url, { ...meta });
          const data = await response.json();

          return data as T;
        },
      };
    }),
  });
}
