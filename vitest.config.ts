import {defineConfig} from "vitest/config";
import vue from "@vitejs/plugin-vue";
import {fileURLToPath} from "node:url";
// configuration for vite
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "vitepress/client": fileURLToPath(new URL("test/vitepress.client.ts", import.meta.url))
    }
  },
  test: {
    root: fileURLToPath(new URL("./packages/theme", import.meta.url)),
    environment: "jsdom",
    exclude: ["**/node_modules/**"],
    globals: true,
    setupFiles: [fileURLToPath(new URL("./test/setup.ts", import.meta.url))],
    coverage: {
      enabled: true,
      thresholds: {
        autoUpdate: true,
        statements: 62.3,
        branches: 78.4,
        functions: 67.3,
        lines: 62.3
      },
      include: ["**/*.{ts,vue}"],
      exclude: [
        "index.ts",
        "**/markdown/**",
        "**/interfaces/**",
        "**/__mocks__/**",
        "**/node_modules/**",
        "**/*.spec.ts",
        "**/*.stories.ts",
        "**/utils/colors.ts",
        "tailwind.preset.ts",
        "DefaultTheme.ts"
      ],
      reportsDirectory: fileURLToPath(new URL("./coverage", import.meta.url))
    }
  }
});
