import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [], // No longer needed for Spline as we use CDN
  // Manual runtime usage doesn't require complex WASM bundling rules
};

export default nextConfig;
