// https://vitepress.dev/guide/custom-theme
import {h} from "vue";
import type {Theme} from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./tailwind.css";
import "./style.css";
import ApiAnchorQuery from "./molecules/api-anchor/ApiAnchorQuery.vue";
import ApiList from "./molecules/api-list/ApiList.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({app, router, siteData}) {
    app.component("ApiList", ApiList);
    app.component("ApiAnchorQuery", ApiAnchorQuery);
  }
} satisfies Theme;
