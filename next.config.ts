import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["images.unsplash.com", "sleek-porpoise-412.convex.cloud"],
  },
};

export default nextConfig;
