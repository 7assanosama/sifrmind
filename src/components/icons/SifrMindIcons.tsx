import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function DashboardIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="11" y="2" width="7" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="11" y="7" width="7" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function SparklesIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <path
        d="M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5L10 2z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M15 12l.75 2.25L18 15l-2.25.75L15 18l-.75-2.25L12 15l2.25-.75L15 12z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} {...props}>
      <path
        d="M4 8l2.5 2.5L12 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LayersIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <path
        d="M10 3l7 4-7 4-7-4 7-4z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M3 10l7 4 7-4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 13l7 4 7-4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EyeIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <path
        d="M1.5 10s3.5-6 8.5-6 8.5 6 8.5 6-3.5 6-8.5 6-8.5-6-8.5-6z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function WorkflowIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="15" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="10" cy="15" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 7v3.5a2 2 0 002 2h1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M15 7v3.5a2 2 0 01-2 2h-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function CompassIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M12.5 7.5l-2 5-3.5-1.5 2-5 3.5 1.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UsersIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <circle cx="7" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M2 16c0-2.8 2.2-5 5-5s5 2.2 5 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="14" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M14 11c2 0 4 1.8 4 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChartIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <rect x="3" y="10" width="3" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8.5" y="6" width="3" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="14" y="3" width="3" height="13" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ZapIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <path
        d="M11 2L4 11h5l-1 7 7-9h-5l1-7z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <path
        d="M10 2.5l6.5 3v4.5c0 3.5-2.8 6.3-6.5 7.5-3.7-1.2-6.5-4-6.5-7.5V5.5L10 2.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10l1.5 1.5L12.5 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
