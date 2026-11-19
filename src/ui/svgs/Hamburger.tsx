const SvgHamburger = (props: React.SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 32 32" aria-hidden role="presentation" {...props}>
    <defs>
      <linearGradient
        id="hamburger-gradient"
        x1=".96"
        x2="35.52"
        y1="4.16"
        y2="27.84"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="var(--color-gradient-dark)" />
        <stop offset=".5" stopColor="var(--color-gradient-medium)" />
        <stop offset="1" stopColor="var(--color-gradient-light)" />
      </linearGradient>
      <linearGradient
        id="hamburger-gradient--mid"
        x1=".96"
        x2="35.52"
        y1="4.16"
        y2="27.84"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="var(--color-gradient-medium)" />
        <stop offset=".5" stopColor="var(--color-gradient-light)" />
        <stop offset="1" stopColor="var(--color-gradient-light)" />
      </linearGradient>
      <path
        id="hamburger-path"
        fillRule="evenodd"
        d="M0 8.889V5.333h32V8.89H0zm0 8.889h32v-3.556H0v3.556zm0 8.889h32V23.11H0v3.556z"
      />
      <mask
        id="hamburger-mask"
        maskContentUnits="userSpaceOnUse"
        maskUnits="userSpaceOnUse"
      >
        <use fill="#fff" href="#hamburger-path" />
      </mask>
    </defs>
    <g mask="url(#hamburger-mask)">
      <rect
        width="32"
        height="32"
        fill="url(#hamburger-gradient)"
        rx="0"
        ry="0"
      />
      <rect
        className="transition--mid"
        fill="url(#hamburger-gradient--mid)"
        height="32"
        rx="0"
        ry="0"
        width="32"
      />
      <rect
        className="transition--full"
        fill="var(--color-gradient-light)"
        height="32"
        rx="0"
        ry="0"
        width="32"
      />
    </g>
  </svg>
);

export { SvgHamburger };
