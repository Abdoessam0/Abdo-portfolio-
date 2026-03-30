import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/profile";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          height: "100%",
          width: "100%",
          overflow: "hidden",
          background: "#060816",
          color: "white",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(91,124,255,0.32), transparent 30%), radial-gradient(circle at 80% 10%, rgba(139,109,255,0.24), transparent 24%), radial-gradient(circle at 50% 90%, rgba(53,214,164,0.14), transparent 22%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 26,
            borderRadius: 36,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            height: "100%",
            width: "100%",
            padding: "62px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}
          >
            <div
              style={{
                display: "flex",
                width: 96,
                height: 96,
                borderRadius: 28,
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(145deg, rgba(91,124,255,0.95), rgba(139,109,255,0.92), rgba(53,214,164,0.85))",
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: "-0.14em",
              }}
            >
              {"</>"}
            </div>
            <div
              style={{
                marginTop: 34,
                fontSize: 62,
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: "-0.06em",
              }}
            >
              {PROFILE.person.name}
            </div>
            <div style={{ marginTop: 18, fontSize: 28, color: "#c7d2ea" }}>
              {PROFILE.person.role}
            </div>
            <div
              style={{
                marginTop: 20,
                fontSize: 24,
                color: "#94a3c3",
                lineHeight: 1.45,
              }}
            >
              {PROFILE.person.summary}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                padding: "24px 26px",
                borderRadius: 28,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: 22,
                color: "#c7d2ea",
              }}
            >
              <span>Frontend systems</span>
              <span>Production platforms</span>
              <span>SEO / performance / UI quality</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
