import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/string-theory",
  assetPrefix: "/string-theory",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
