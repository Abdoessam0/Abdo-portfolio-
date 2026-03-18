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
          background:
            "linear-gradient(145deg, rgba(91,124,255,1), rgba(139,109,255,0.94), rgba(53,214,164,0.82))",
          color: "white",
          fontSize: 68,
          fontWeight: 700,
          letterSpacing: "-0.12em",
        }}
      >
        {"</>"}
      </div>
    ),
    size,
  );
}
