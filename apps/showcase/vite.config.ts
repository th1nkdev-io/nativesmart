import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const source = (path: string) => fileURLToPath(new URL(`../../${path}`, import.meta.url));

// Workspace packages are read from source: contracts and tokens update live.
export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      "@nativesmart/contracts": source("packages/contracts/src/index.ts"),
      "@nativesmart/design-systems": source("packages/design-systems/src/index.ts"),
      "@nativesmart/platform-registry": source("packages/platform-registry/src/index.ts"),
      "@nativesmart/tokens": source("packages/tokens/src/index.ts")
    }
  },
  server: { port: 5173, strictPort: true }
});
