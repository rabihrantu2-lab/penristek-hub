import type { NextConfig } from "next";

// Tailwind v4 diproses satu kali melalui postcss.config.mjs.
const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Default 1MB; bukti transfer boleh sampai 2MB + overhead form.
      bodySizeLimit: "3mb",
    },
  },
};

export default nextConfig;
