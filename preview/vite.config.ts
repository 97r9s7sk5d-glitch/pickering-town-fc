import path from "node:path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const project = path.resolve(import.meta.dirname, "..");

// Builds dist-preview/index.html: the whole site (code, styles, fonts, images) in one file. See preview/main.tsx.
export default defineConfig({
  root: import.meta.dirname,
  resolve: { alias: { "@": path.join(project, "src") } },
  plugins: [
    tanstackRouter({
      target: "react",
      routesDirectory: path.join(project, "src/routes"),
      generatedRouteTree: path.join(import.meta.dirname, "routeTree.gen.ts"),
    }),
    viteReact(),
    tailwindcss(),
    viteSingleFile(),
  ],
  build: { outDir: path.join(project, "dist-preview"), emptyOutDir: true, assetsInlineLimit: Number.MAX_SAFE_INTEGER },
});
