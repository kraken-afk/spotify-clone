import { useQuery } from "@tanstack/react-query";

export default function useFetchSpotify<T = unknown>(url: string, accessToken: string, metadata?: RequestInit) {
  return useQuery({
    queryKey: [new URL(url).pathname],
    cacheTime: 3600,
    queryFn: async () => {
      // TODO: undone
    },
  });
}