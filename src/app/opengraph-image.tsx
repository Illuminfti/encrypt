import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Encrypt — Confidential Execution for Solana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #050816 0%, #0B1123 50%, #050816 100%)",
          position: "relative",
        }}
      >
        {/* Ultraviolet orb */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(122,92,255,0.15) 0%, transparent 70%)",
            top: 60,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        {/* Veilray silhouette — simplified manta shape */}
        <svg
          width="320"
          height="120"
          viewBox="0 0 320 120"
          style={{ position: "absolute", top: 180, opacity: 0.05 }}
        >
          <path
            d="M160,60 Q120,20 40,30 Q0,40 10,60 Q0,80 40,90 Q120,100 160,60 Z M160,60 Q200,20 280,30 Q320,40 310,60 Q320,80 280,90 Q200,100 160,60 Z"
            fill="#7A5CFF"
          />
        </svg>

        {/* 64-cell word bar motif */}
        <div
          style={{
            display: "flex",
            gap: 2,
            marginBottom: 48,
          }}
        >
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background:
                  i < 10
                    ? "#1CF2C7"
                    : i < 22
                      ? "#7A5CFF"
                      : "#46CFFF",
                opacity: 0.6 + (i % 3) * 0.15,
              }}
            />
          ))}
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#F6F8FF",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Encrypt
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#91A2C7",
            letterSpacing: "0.01em",
          }}
        >
          Confidential execution for Solana
        </div>
      </div>
    ),
    { ...size }
  );
}
