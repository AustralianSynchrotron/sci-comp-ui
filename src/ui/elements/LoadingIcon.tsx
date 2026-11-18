import * as React from "react";

import { cn } from "../../lib/utils";

import styles from "./loadingIcon.module.css";

const LoadingIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    viewBox="0 0 46 38"
    aria-hidden
    role="presentation"
    className={cn(styles.svg, className)}
    {...props}
  >
    <path
      className="loading-seafoam"
      fill="rgb(53,191,201)"
      d="M27.8253579.07252211c-.71487369 24.5213901-2.73222106 21.89097748 17.31278947 31.43892948L27.82535789.0725221z"
    />
    <path
      className="loading-blue"
      fill="rgb(0,120,193)"
      d="M26.54905263 0C24.7743579 25.16220023 27.54166843 20.9654289 0 36.1094723L26.54905263 0z"
    />
    <path
      className="loading-flag"
      fill="rgb(32,61,121)"
      d="M.62982632 37.24188723c15.05754736-3.1612507 33.72038947-4.68302614 43.8261579-4.68302614-21.02394738-8.88276969-16.52000527-9.3089857-43.8261579 4.68302614"
    />
  </svg>
);

export { LoadingIcon };
