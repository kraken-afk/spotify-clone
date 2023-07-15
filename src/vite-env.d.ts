/// <reference types="vite/client" />
/// <reference path="./spotify.d.ts" />


declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "typed.js" {
  const content: any;
  export default content;
}

interface SplitComponentProps {
  children: ReactNode[];
  refs: { prevRef: MutableRefObject<HTMLElement>, nextRef: MutableRefObject<HTMLElement> }
}

interface Credential {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
}
