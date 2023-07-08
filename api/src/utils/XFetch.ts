/// <reference path="../../spotify.d.ts" />
/// <reference path="../../server.d.ts" />

export default async function XFetch(url: string, method: string, options?: Partial<XFetchOption>) {
  const result = await fetch(url, {
    method, headers: options?.headers,
    body: options?.body ? new URLSearchParams(options.body) : null,
  });

  return (await result.json());
}
