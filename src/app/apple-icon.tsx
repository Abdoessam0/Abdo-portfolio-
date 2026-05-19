import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 42,
          background: "#181818",
          boxShadow: "inset 0 0 0 6px rgba(6,181,107,0.18)",
          color: "#06b56b",
          fontSize: 68,
          fontFamily: "monospace",
          fontWeight: 800,
          letterSpacing: "-0.08em",
        }}
      >
        {"</>"}
      </div>
    ),
    size,
  );
}
