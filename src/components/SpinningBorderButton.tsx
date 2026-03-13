"use client";

import Link from "next/link";

interface SpinningBorderButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: "primary" | "secondary";
}

const spinKeyframes = `
@keyframes spin-border {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

export default function SpinningBorderButton({
  children,
  href,
  className = "",
  variant = "primary",
}: SpinningBorderButtonProps) {
  const gradient =
    variant === "primary"
      ? "conic-gradient(from 0deg, #7A5CFF, #1CF2C7, #7A5CFF)"
      : "conic-gradient(from 0deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05), rgba(255,255,255,0.2))";

  const hoverGlow =
    variant === "primary"
      ? "0 0 24px rgba(122,92,255,0.3)"
      : "0 0 24px rgba(255,255,255,0.1)";

  return (
    <>
      <style>{spinKeyframes}</style>
      <Link
        href={href}
        className={`group relative inline-flex overflow-hidden rounded-xl ${className}`}
        style={{ padding: "1.5px" }}
      >
        {/* Rotating gradient layer */}
        <div
          className="absolute inset-[-50%] will-change-transform"
          style={{
            background: gradient,
            animation: "spin-border 3s linear infinite",
            willChange: "transform",
          }}
        />
        {/* Inner content */}
        <div
          className="relative z-10 rounded-[10.5px] bg-[#0a0a0f] px-6 py-3 font-display text-sm font-semibold text-cloud transition-all duration-300 group-hover:bg-[#12121a]"
          style={{ boxShadow: "none", transition: "background 0.3s, box-shadow 0.3s" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = hoverGlow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {children}
        </div>
      </Link>
    </>
  );
}
