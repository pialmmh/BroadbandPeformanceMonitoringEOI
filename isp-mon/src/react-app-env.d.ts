/// <reference types="react-scripts" />

declare module 'react-dom/client' {
  import { ReactElement } from 'react';
  
  export interface Root {
    render(children: ReactElement): void;
    unmount(): void;
  }
  
  export function createRoot(container: Element | DocumentFragment): Root;
  export function hydrateRoot(container: Element | Document, children: ReactElement): Root;
}

declare module 'web-vitals' {
  export function onCLS(callback: (metric: any) => void): void;
  export function onINP(callback: (metric: any) => void): void;
  export function onFCP(callback: (metric: any) => void): void;
  export function onLCP(callback: (metric: any) => void): void;
  export function onTTFB(callback: (metric: any) => void): void;
}