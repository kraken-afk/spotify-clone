/// <reference types="vite/client" />

declare module "*.svg" {
  const content: string;
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
}

interface CacheState<T> {
  fromCache: boolean;
  data: T | null;
}
