import { type UseQueryResult, useQuery } from "@tanstack/react-query";

export default function useGet<T>(url: string, metadata?: RequestInit): UseQueryResult<T> {
  return useQuery({
    cacheTime: 1800,
    queryFn: async () => {
      const response = await fetch(url, metadata);
      const data = await response.json();

      return data;
    },
    refetchOnWindowFocus: false,
  })
}