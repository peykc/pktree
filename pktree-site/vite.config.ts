import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || "/pktree/",
    build: {
      assetsInlineLimit: 0, // Disable base64 inlining to fix GitHub Pages CSP errors
    },
  };
});
