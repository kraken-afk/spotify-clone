/// <reference types="vite/client" />

declare module "*.svg" {
  const content: string;
  export default content;
}

interface SplitComponentProps {
  children: ReactNode[];
  refs: { prevRef: MutableRefObject<HTMLElement>, nextRef: MutableRefObject<HTMLElement> }
}