import { SVGProps } from "react";

function base(props: SVGProps<SVGSVGElement>) {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M14 21v-7h2.5l.5-3H14V9.2c0-.9.3-1.6 1.7-1.6H17V5.1C16.6 5 15.7 5 14.6 5 12.4 5 11 6.3 11 8.8V11H8.5v3H11v7" />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.5 15 12l-4.5 2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PinterestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 19c1-3 1.6-5.4 2.1-7.6.4-1.7 2.9-1.9 3.5-.3.4 1.1-.2 2.6-.6 3.7-.6 1.7.9 3.2 2.5 2.4 1.9-1 2.7-3.9 2-6.1-1-3-4.4-4.3-7.4-3.4-3.5 1-4.9 4.8-3.4 7.5" />
    </svg>
  );
}
