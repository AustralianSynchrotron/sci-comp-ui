declare module '*.css' {
  const content: string;
  export default content;
}

declare module 'prismjs/themes/prism.css';

/**
 * Global macro for package version injected by Vite plugin
 * This is replaced at build time with the actual version from package.json
 */
declare const __PACKAGE_VERSION__: string;
