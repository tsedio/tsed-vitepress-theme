import {defineConfig} from "vitest/config";
import vue from "@vitejs/plugin-vue";
import {fileURLToPath} from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "vitepress/client": fileURLToPath(new URL("test/vitepress.client.ts", import.meta.url))
    }
  },
  test: {
    root: fileURLToPath(new URL("./", import.meta.url)),
    environment: "jsdom",
    exclude: ["**/node_modules/**", "**/snippets/**"],
    globals: true,
    setupFiles: ["test/setup.ts"],
    coverage: {
      enabled: true,
      thresholds: {
        autoUpdate: true,
        statements: 40.89,
        branches: 66.66,
        functions: 50,
        lines: 40.89
      },
      include: ["docs/.vitepress/theme/**/*.{ts,vue}"],
      exclude: [
        "docs/.vitepress/theme/index.ts",
        "**/markdown/**",
        "**/interfaces/**",
        "**/__mocks__/**",
        "**/node_modules/**",
        "**/*.spec.ts",
        "**/*.stories.ts"
      ]
    }
  }
});
