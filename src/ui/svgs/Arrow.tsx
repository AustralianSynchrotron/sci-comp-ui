const SvgArrow = (props: React.SVGAttributes<SVGElement>) => (
  <svg aria-hidden role="presentation" viewBox="0 0 32 32" {...props}>
    <path d="m32 10.427-3.76-3.76L16 18.88 3.76 6.667 0 10.426l16 16 16-16Z" />
  </svg>
);

export { SvgArrow };
