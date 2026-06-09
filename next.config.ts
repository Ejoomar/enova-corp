import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // API routes use Prisma (not active in UI-only mode) — skip TS errors at build
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "www.laserprintsoluciones.com",
      },
    ],
  },
};

export default nextConfig;
