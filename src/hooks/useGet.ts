export default async function useGet<T>(
  url: string,
  metadata?: RequestInit,
  token?: Credential
) {
  const meta: Record<string, any> = { ...metadata };

  if (token) {
    if ("headers" in meta)
      meta.headers["Authorization"] = `${token.token_type} ${token.access_token}`;
    else
      meta.headers = {
        Authorization: `${token.token_type} ${token.access_token}`,
      };
  }

  const response = await fetch(url, meta);
  const data = await response.json();

  return data as T;
}
