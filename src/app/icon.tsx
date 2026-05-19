import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 18,
          background: "#181818",
          boxShadow: "inset 0 0 0 2px rgba(6,181,107,0.18)",
          color: "#06b56b",
          fontSize: 24,
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
