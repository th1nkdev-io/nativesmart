import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const source = (path: string) => fileURLToPath(new URL(`../../../${path}`, import.meta.url));

// Workspace packages are read from source: instant reload while editing components or tokens.
export default defineConfig({
  base: "./",
  publicDir: source("public"),
  plugins: [vue()],
  resolve: {
    alias: {
      "@nativesmart/contracts": source("packages/contracts/src/index.ts"),
      "@nativesmart/tokens": source("packages/tokens/src/index.ts"),
      "@nativesmart/vue": source("packages/web/vue/src/index.ts")
    }
  },
  server: { port: 5174, strictPort: true }
});
