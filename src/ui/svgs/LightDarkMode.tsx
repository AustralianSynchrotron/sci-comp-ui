const SvgLightDarkMode = (props: React.SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden role="presentation" {...props}>
    <defs>
      <linearGradient
        id="lightdark-gradient--mid"
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
        id="lightdark-path"
        d="M20.488 15.512 24 12l-3.512-3.512V3.512h-4.976L12 0 8.488 3.512H3.512v4.976L0 12l3.512 3.512v4.976h4.976L12 24l3.512-3.512h4.976v-4.976ZM12 18.366V5.634A6.371 6.371 0 0 1 18.366 12 6.371 6.371 0 0 1 12 18.366Z"
      />
      <mask
        id="lightdark-mask"
        maskContentUnits="userSpaceOnUse"
        maskUnits="userSpaceOnUse"
      >
        <use fill="#fff" href="#lightdark-path" />
      </mask>
    </defs>
    <g mask="url(#lightdark-mask)">
      <rect width="24" height="24" fill="#FFF" rx="0" ry="0" />
      <rect
        className="transition--mid"
        fill="url(#lightdark-gradient--mid)"
        height="24"
        rx="0"
        ry="0"
        width="24"
      />
      <rect
        className="transition--full"
        fill="var(--color-gradient-dark)"
        height="24"
        rx="0"
        ry="0"
        width="24"
      />
    </g>
  </svg>
);

export { SvgLightDarkMode };
