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
          background:
            "linear-gradient(145deg, rgba(91,124,255,0.95), rgba(139,109,255,0.92), rgba(53,214,164,0.85))",
          color: "white",
          fontSize: 24,
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
