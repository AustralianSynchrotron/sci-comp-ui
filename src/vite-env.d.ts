/// <reference types="vite/client" />

declare module "*.css" {
  const content: string;
  export default content;
}

// Declaration for the source embedding plugin
declare const __SOURCE__: string
