import type {StorybookConfig} from "@storybook/vue3-vite";
import {fileURLToPath} from "node:url";
import vuePlugin from "@vitejs/plugin-vue";

const config: StorybookConfig = {
  stories: [
    "../doc/**/*.mdx",
    {
      directory: "../docs/.vitepress/theme/atoms",
      titlePrefix: "Atoms"
    },
    {
      directory: "../docs/.vitepress/theme/molecules",
      titlePrefix: "Molecules"
    },
    {
      directory: "../docs/.vitepress/theme/organisms",
      titlePrefix: "Organisms"
    }
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-storysource",
    "@storybook/addon-themes",
    "@chromatic-com/storybook"
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {
      docgen: "vue-component-meta"
    }
  },
  viteFinal(config) {
    // @ts-ignore
    config.plugins.push(vuePlugin());

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve!.alias,
        "vitepress/client": fileURLToPath(new URL("../test/vitepress.client.ts", import.meta.url))
      }
    };

    config.define = {
      "process.env": {}
    };

    return config;
  }
};
export default config;
