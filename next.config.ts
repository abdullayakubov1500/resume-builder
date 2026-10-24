import type { NextConfig } from "next";
import os from "os";

function getLocalDevHosts(): string[] {
  const hosts = new Set<string>(["127.0.0.1", "localhost"]);
  const nets = os.networkInterfaces();
  for (const interfaces of Object.values(nets)) {
    for (const net of interfaces ?? []) {
      if (net.family === "IPv4" && !net.internal) {
        hosts.add(net.address);
      }
    }
  }
  const fromEnv = process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((h) => h.trim())
    .filter(Boolean);
  for (const host of fromEnv ?? []) {
    hosts.add(host);
  }
  return [...hosts];
}

const nextConfig: NextConfig = {
  allowedDevOrigins: getLocalDevHosts(),
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
