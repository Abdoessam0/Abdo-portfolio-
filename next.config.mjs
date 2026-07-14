import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configuredImageHosts = (process.env.TRUSTED_IMAGE_HOSTS ?? "")
  .split(",")
  .map((value) => value.trim().toLowerCase())
  .filter(Boolean);

let storagePattern = null;
try {
  if (process.env.S3_PUBLIC_BASE_URL) {
    const storageUrl = new URL(process.env.S3_PUBLIC_BASE_URL);
    if (storageUrl.protocol === "https:") {
      storagePattern = {
        protocol: "https",
        hostname: storageUrl.hostname,
        port: storageUrl.port,
        pathname: `${storageUrl.pathname.replace(/\/$/, "")}/**`,
      };
    }
  }
} catch {
  console.warn("S3_PUBLIC_BASE_URL is invalid; remote storage images will not be optimized.");
}

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "object-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    deviceSizes: [320, 375, 390, 430, 640, 750, 768, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    qualities: [54, 58, 72, 74, 78],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: "https", hostname: "www.realestate-algarve.com" },
      { protocol: "https", hostname: "www.realestate-lisbon.com" },
      { protocol: "https", hostname: "www.trustedbuildr.com" },
      { protocol: "https", hostname: "trustbuildrr.vercel.app" },
      { protocol: "https", hostname: "www.youthpass.eu" },
      ...configuredImageHosts.map((hostname) => ({ protocol: "https", hostname })),
      ...(storagePattern ? [storagePattern] : []),
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/certificates/:path*.pdf",
        headers: [{ key: "Content-Disposition", value: "inline" }],
      },
      {
        source: "/images/afaqy/:path*.pdf",
        headers: [{ key: "Content-Disposition", value: "inline" }],
      },
      {
        source: "/Abdelrahman_Mohamed_Full_Stack_AI_Software_Engineer_CV.pdf",
        headers: [{ key: "Content-Disposition", value: "inline" }],
      },
    ];
  },
};

export default nextConfig;
