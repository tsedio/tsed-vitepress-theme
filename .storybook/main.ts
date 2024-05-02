import type {StorybookConfig} from "@storybook/vue3-vite";

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
    {
      // eslint-disable-next-line storybook/no-uninstalled-addons
      name: "storybook-addon-manual-mocks/vite",
      options: {
        mocksFolder: "__mocks__"
      }
    },
    "@chromatic-com/storybook"
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  viteFinal: (config) => {
    config.optimizeDeps = {exclude: ["fsevents"]};
    return config;
  }
};
export default config;
