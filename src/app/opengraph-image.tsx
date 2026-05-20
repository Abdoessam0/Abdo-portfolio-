import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/profile";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const previewUrl = "abdo.kolaytec.com";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbf7ef",
          color: "#f3eee6",
          fontFamily: "Inter, Arial, sans-serif",
          padding: 42,
        }}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            height: "100%",
            width: "100%",
            overflow: "hidden",
            borderRadius: 42,
            background: "#1f1f1d",
            border: "2px solid rgba(6,181,107,0.32)",
            boxShadow: "0 24px 70px rgba(24,24,24,0.18)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 18% 24%, rgba(6,181,107,0.3), transparent 26%), radial-gradient(circle at 90% 10%, rgba(216,209,198,0.12), transparent 22%)",
            }}
          />

          <div
            style={{
              display: "flex",
              position: "relative",
              width: 430,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRight: "1px solid rgba(216,209,198,0.12)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 250,
                height: 250,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 58,
                background: "#181818",
                border: "3px solid rgba(6,181,107,0.5)",
                boxShadow:
                  "inset 0 0 0 1px rgba(216,209,198,0.12), 0 20px 60px rgba(6,181,107,0.18)",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 88,
                  fontWeight: 800,
                  letterSpacing: "-0.08em",
                  color: "#06b56b",
                }}
              >
                {"</>"}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              position: "relative",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              padding: "68px 76px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                borderRadius: 999,
                border: "1px solid rgba(6,181,107,0.35)",
                background: "rgba(6,181,107,0.1)",
                color: "#06b56b",
                fontSize: 24,
                fontWeight: 700,
                padding: "12px 20px",
              }}
            >
              Software Engineer Portfolio
            </div>

            <div
              style={{
                marginTop: 34,
                fontSize: 70,
                fontWeight: 800,
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                color: "#fffaf0",
              }}
            >
              {PROFILE.person.name}
            </div>

            <div
              style={{
                marginTop: 22,
                fontSize: 34,
                fontWeight: 700,
                color: "#d8d1c6",
              }}
            >
              Next.js / React / TypeScript / PHP/Laravel
            </div>

            <div
              style={{
                marginTop: 28,
                fontSize: 26,
                lineHeight: 1.35,
                color: "#bfb8ae",
                maxWidth: 620,
              }}
            >
              Founder of Kolaytec. Building web applications, dashboards, admin
              panels, and business platforms.
            </div>

            <div
              style={{
                marginTop: 36,
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "#06b56b",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: "#06b56b",
                }}
              />
              {previewUrl}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
