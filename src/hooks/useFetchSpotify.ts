import { useQuery } from "@tanstack/react-query";

export default function useFetchSpotify<T = unknown>(
  url: string | null,
  token: Credential,
  metadata?: RequestInit
) {
  return useQuery({
    queryKey: [url],
    cacheTime: 3600,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (url === null) return undefined;

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
