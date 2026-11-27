const SvgHamburgerClose = (props: React.SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 32 32" aria-hidden role="presentation" {...props}>
    <defs>
      <linearGradient
        id="close-gradient--mid"
        x1="2.56"
        x2="34.88"
        y1="-.96"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#FFF" />
        <stop offset=".5" stopColor="var(--color-gradient-dark)" />
        <stop offset="1" stopColor="var(--color-gradient-dark)" />
      </linearGradient>
      <path
        id="close-path"
        fillRule="evenodd"
        d="M32 3.2L28.8 0 16 12.8 3.2 0 0 3.2 12.8 16 0 28.8 3.2 32 16 19.2 28.8 32l3.2-3.2L19.2 16 32 3.2z"
      />
      <mask
        id="close-mask"
        maskContentUnits="userSpaceOnUse"
        maskUnits="userSpaceOnUse"
      >
        <use fill="#fff" href="#close-path" />
      </mask>
    </defs>
    <g mask="url(#close-mask)">
      <rect width="32" height="32" fill="#FFF" rx="0" ry="0" />
      <rect
        className="transition--mid"
        fill="url(#close-gradient--mid)"
        height="32"
        rx="0"
        ry="0"
        width="32"
      />
      <rect
        className="transition--full"
        fill="var(--color-gradient-dark)"
        height="32"
        rx="0"
        ry="0"
        width="32"
      />
    </g>
  </svg>
);

export { SvgHamburgerClose };
