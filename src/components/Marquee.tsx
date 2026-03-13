"use client";

import React, { useId } from "react";

interface MarqueeProps {
  children: React.ReactNode[];
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const id = useId().replace(/:/g, "");

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        maskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes marquee-${id} {
  from { transform: translateX(0) }
  to { transform: translateX(-50%) }
}
.marquee-track-${id} {
  display: flex;
  gap: 24px;
  width: max-content;
  will-change: transform;
  animation: marquee-${id} ${speed}s linear infinite;
  animation-direction: ${direction === "right" ? "reverse" : "normal"};
}
${pauseOnHover ? `.marquee-track-${id}:hover { animation-play-state: paused; }` : ""}
@media (prefers-reduced-motion: reduce) {
  .marquee-track-${id} { animation: none; }
}`,
        }}
      />
      <div className={`marquee-track-${id}`}>
        {children.map((child, i) => (
          <div key={i} className="flex-shrink-0">
            {child}
          </div>
        ))}
        {children.map((child, i) => (
          <div key={`dup-${i}`} className="flex-shrink-0" aria-hidden="true">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
