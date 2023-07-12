import { useQuery } from "@tanstack/react-query";

export default function getCredential() {
  return useQuery({
    queryKey: ["credential"],
    queryFn: async () => {
      const raw = await fetch(`${window.location.href}api/credential`, {
        method: "POST",
        body: JSON.stringify({
          key: import.meta.env.VITE_API_KEY
        })
      });
      const data = await raw.json();
      return data.data as Credential;
    },
    cacheTime: 3600,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}
