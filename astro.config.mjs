import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const { PUBLIC_MEDUSA_BACKEND_URL, S3_DOMAIN } = loadEnv(
  process.env.NODE_ENV ?? "",
  process.cwd(),
  "",
);

const medusaBackendDomain = PUBLIC_MEDUSA_BACKEND_URL
  ? new URL(PUBLIC_MEDUSA_BACKEND_URL).hostname
  : undefined;

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [react()],
  server: {
    port: 8000,
    host: true,
  },
  vite: {
    resolve: {
      dedupe: ["react", "react-dom"],
    },
    plugins: [tailwindcss()],
  },
  image: {
    domains: [
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      ...(medusaBackendDomain ? [medusaBackendDomain] : []),
      ...(S3_DOMAIN ? [S3_DOMAIN] : []),
    ],
  },
});
