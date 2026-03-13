"use client";

import { useCallback, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
}

export default function TiltCard({
  children,
  className = "",
  tiltAmount = 4,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0, spotX: 50, spotY: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setTilt({
        x: (0.5 - y) * tiltAmount,
        y: (x - 0.5) * tiltAmount,
        spotX: x * 100,
        spotY: y * 100,
      });
    },
    [prefersReducedMotion, tiltAmount],
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, spotX: 50, spotY: 50 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{
        willChange: "transform",
        transition: "transform 0.15s ease-out",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
        style={{
          opacity: tilt.x !== 0 || tilt.y !== 0 ? 1 : 0,
          background: `radial-gradient(circle at ${tilt.spotX}% ${tilt.spotY}%, rgba(255,255,255,0.04), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
