import { fileURLToPath } from "node:url";

const workspaceRoot = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: workspaceRoot,
  images: {
    deviceSizes: [320, 375, 390, 430, 640, 750, 768, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: "https", hostname: "www.realestate-algarve.co" },
      { protocol: "https", hostname: "www.realestate-lisbon.com" },
      { protocol: "https", hostname: "www.trustedbuildr.com" },
      { protocol: "https", hostname: "trustbuildrr.vercel.app" },
      { protocol: "https", hostname: "www.youthpass.eu" },
    ],
  },
  async headers() {
    return [
      {
        source: "/certificates/:path*.pdf",
        headers: [{ key: "Content-Disposition", value: "inline" }],
      },
      {
        source: "/images/afaqy/:path*.pdf",
        headers: [{ key: "Content-Disposition", value: "inline" }],
      },
    ];
  },
};

export default nextConfig;
