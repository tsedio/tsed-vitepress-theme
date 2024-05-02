import type {Preview} from "@storybook/vue3";
import {withThemeByClassName} from "@storybook/addon-themes";
import "../docs/.vitepress/theme/tailwind.css";
import "vitepress/dist/client/theme-default/styles/fonts.css";
import "vitepress/dist/client/theme-default/styles/vars.css";
import "vitepress/dist/client/theme-default/styles/base.css";
import "vitepress/dist/client/theme-default/styles/icons.css";
import "vitepress/dist/client/theme-default/styles/utils.css";
import "vitepress/dist/client/theme-default/styles/components/custom-block.css";
import "vitepress/dist/client/theme-default/styles/components/vp-code.css";
import "vitepress/dist/client/theme-default/styles/components/vp-code-group.css";
import "vitepress/dist/client/theme-default/styles/components/vp-doc.css";
import "vitepress/dist/client/theme-default/styles/components/vp-sponsor.css";
import "../docs/.vitepress/theme/style.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark"
      },
      defaultTheme: "light"
    }),
    (story) => ({
      components: {story},
      template: '<div class="vp-doc"><story /></div>'
    })
  ]
};

export default preview;
