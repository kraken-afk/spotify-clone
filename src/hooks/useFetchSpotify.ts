import { useQuery } from "@tanstack/react-query";

export default function useFetchSpotify<T = unknown>(
  url: string,
  token: Credential,
  metadata?: RequestInit
) {
  return useQuery({
    queryKey: [new URL(url).pathname],
    cacheTime: 3600,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const meta: Record<string, any> = { ...metadata };

      if ("headers" in meta)
        meta.headers["Authorization"] = `${token.token_type} ${token.access_token}`;
      else
        meta.headers = {
          Authorization: `${token.token_type} ${token.access_token}`,
        };

      const response = await fetch(url, { ...meta });
      const data = await response.json();

      return data as T;
    },
  });
}
