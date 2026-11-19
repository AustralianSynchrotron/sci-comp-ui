const SvgDetector = (props: React.SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden role="presentation" {...props}>
    <path d="M12 18a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z" />
    <path d="M19.2 7.2h1.596A3.995 3.995 0 0 0 16.8 3.204V4.8c1.332 0 2.4 1.068 2.4 2.4Zm3.204 0H24C24 3.228 20.772 0 16.8 0v1.596A5.603 5.603 0 0 1 22.404 7.2ZM15.6 6V2.4H8.4L6.204 4.8H0V24h24V8.4h-6C18 7.08 16.92 6 15.6 6ZM12 20.4c-3.312 0-6-2.688-6-6s2.688-6 6-6 6 2.688 6 6-2.688 6-6 6Z" />
  </svg>
);

export { SvgDetector };
