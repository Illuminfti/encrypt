"use client";

import Link from "next/link";

interface SpinningBorderButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function SpinningBorderButton({
  children,
  href,
  className = "",
  variant = "primary",
}: SpinningBorderButtonProps) {
  const gradient =
    variant === "primary"
      ? "conic-gradient(from 0deg, #7A5CFF, #1CF2C7, #46CFFF, #7A5CFF)"
      : "conic-gradient(from 0deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05), rgba(255,255,255,0.2))";

  return (
    <Link
      href={href}
      className={`group relative inline-flex overflow-hidden rounded-xl ${className}`}
      style={{ padding: "1.5px" }}
    >
      {/* Rotating gradient layer */}
      <div
        className="absolute inset-[-50%] animate-spin-border"
        style={{
          background: gradient,
        }}
      />
      {/* Inner content with arrow-slide hover */}
      <div className="relative z-10 rounded-[10.5px] bg-[#080810] px-6 py-3 font-display text-sm font-semibold text-cloud transition-all duration-300 group-hover:bg-[#0e0e1a] group-hover:shadow-[0_0_24px_rgba(122,92,255,0.25)] flex items-center gap-2">
        {children}
        {/* Arrow that slides through on hover */}
        <span className="relative inline-flex w-4 h-4 overflow-hidden">
          <svg
            className="absolute w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.51,0,0.08,1)] group-hover:translate-x-[200%]"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
          <svg
            className="absolute w-4 h-4 -translate-x-[200%] transition-transform duration-300 ease-[cubic-bezier(0.51,0,0.08,1)] group-hover:translate-x-0"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
