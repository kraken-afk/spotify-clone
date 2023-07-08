/// <reference types="./spotify.d.ts" />

type ServerRoute = (req: Request) => Promise<Response> | Response;

interface ApiState {
  status: boolean;
  credential: Credential | null;
}

interface XFetchOption extends RequestInit {
  headers: HeadersInit;
  body: any;
}