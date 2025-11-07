import { fileURLToPath } from "node:url";

const workspaceRoot = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: workspaceRoot,
  images: {
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
    ];
  },
};

export default nextConfig;
