import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo>/, so the build takes that prefix from the environment.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
