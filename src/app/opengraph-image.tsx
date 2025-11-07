import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/profile";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  const skillHighlight = PROFILE.skills[0]?.items.slice(0, 3).join(" / ") ?? "Next.js / React / Supabase";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px",
          background: "radial-gradient(circle at top, #f6fffb 0%, #e8f5f2 45%, #fafafa 100%)",
          color: "#0f172a",
          fontFamily: "Plus Jakarta Sans, Inter, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: "0.3em", textTransform: "uppercase" }}>
          <span>Portfolio</span>
          <span>{skillHighlight}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 920 }}>
          <div style={{ fontSize: 60, fontWeight: 600 }}>{PROFILE.person.name}</div>
          <div style={{ fontSize: 30 }}>{PROFILE.person.role}</div>
          <p style={{ fontSize: 20, lineHeight: 1.4 }}>{PROFILE.person.summary}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 16, textTransform: "uppercase", letterSpacing: "0.3em", opacity: 0.6 }}>Location</div>
            <p>{PROFILE.person.location}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 16, textTransform: "uppercase", letterSpacing: "0.3em", opacity: 0.6 }}>Availability</div>
            <p>{PROFILE.person.availability}</p>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
