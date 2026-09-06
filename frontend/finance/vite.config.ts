import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";

// One self-contained ES module: HA loads it as a Lovelace "module" resource,
// served by the integration from custom_components/netwrth/frontend/.
export default defineConfig({
  plugins: [react()],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    lib: {
      entry: "src/index.tsx",
      formats: ["es"],
      fileName: () => "family-finance-cards.js",
    },
    outDir: "../../www",
    emptyOutDir: false,
    minify: true,
    rollupOptions: { output: { inlineDynamicImports: true, banner: `/*! Adapted from eduser25/netwrth-hacs.\n${readFileSync(new URL("LICENSE.netwrth", import.meta.url), "utf8")}\n*/` } },
  },
});
