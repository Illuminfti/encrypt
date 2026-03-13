"use client";

import { useReducedMotion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const CIPHER_CHARS = "0123456789abcdef!@#$%&*";

interface ScrambleTextProps {
  children: string;
  className?: string;
  delay?: number;
  scrambleDuration?: number;
  trigger?: "mount" | "inView";
}

export default function ScrambleText({
  children,
  className,
  delay = 0,
  scrambleDuration = 1.5,
  trigger = "inView",
}: ScrambleTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [display, setDisplay] = useState<string[]>(() => children.split(""));
  const [resolved, setResolved] = useState<boolean[]>(() =>
    new Array(children.length).fill(false)
  );
  const [done, setDone] = useState(false);
  const hasStarted = useRef(false);

  const randomChar = useCallback(
    () => CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)],
    []
  );

  const shouldTrigger = trigger === "mount" || isInView;

  useEffect(() => {
    if (prefersReducedMotion || !shouldTrigger || hasStarted.current) return;
    hasStarted.current = true;

    const chars = children.split("");
    const len = chars.length;
    const durationMs = scrambleDuration * 1000;
    const delayMs = delay * 1000;

    // Each character gets a resolve time based on its position (left-to-right stagger).
    // Characters cycle through random cipher chars until their resolve time.
    const resolveTimes = chars.map((_, i) => {
      // First char resolves at ~30% of duration, last at 100%
      const progress = len === 1 ? 1 : i / (len - 1);
      return delayMs + durationMs * (0.3 + 0.7 * progress);
    });

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const nextDisplay: string[] = [];
      const nextResolved: boolean[] = [];
      let allDone = true;

      for (let i = 0; i < len; i++) {
        if (chars[i] === " ") {
          // Preserve spaces
          nextDisplay.push(" ");
          nextResolved.push(true);
          continue;
        }

        if (elapsed >= resolveTimes[i]) {
          nextDisplay.push(chars[i]);
          nextResolved.push(true);
        } else if (elapsed >= delayMs) {
          // Still scrambling — pick a random cipher character
          nextDisplay.push(randomChar());
          nextResolved.push(false);
          allDone = false;
        } else {
          // Hasn't started yet — show cipher placeholder
          nextDisplay.push(randomChar());
          nextResolved.push(false);
          allDone = false;
        }
      }

      setDisplay(nextDisplay);
      setResolved(nextResolved);

      if (allDone) {
        setDone(true);
        return;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    shouldTrigger,
    prefersReducedMotion,
    children,
    scrambleDuration,
    delay,
    randomChar,
  ]);

  // Reduced motion: just render plain text
  if (prefersReducedMotion) {
    return (
      <span ref={containerRef} className={className}>
        {children}
      </span>
    );
  }

  return (
    <span
      ref={containerRef}
      className={className}
      aria-label={children}
    >
      {display.map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={
            done
              ? "" // After completion, revert to fully normal rendering
              : resolved[i]
                ? "transition-colors duration-300"
                : "text-mist/50 transition-colors duration-300"
          }
          style={
            done
              ? undefined
              : {
                  display: "inline-block",
                  minWidth: char === " " ? "0.25em" : "0.6em",
                  textAlign: "center",
                }
          }
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
