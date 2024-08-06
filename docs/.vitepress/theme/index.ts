// https://vitepress.dev/guide/custom-theme
import {h} from "vue";
import type {Theme} from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./tailwind.css";
import "./style.css";
import ApiAnchorQuery from "./molecules/api-anchor/ApiAnchorQuery.vue";
import ApiList from "./molecules/api-list/ApiList.vue";
import GithubContributors from "./organisms/github-contributors/GithubContributors.vue";
import LazyLoadObserver from "./directives/lazyLoadObserver";
import Button from "./molecules/button/Button.vue";
import CodeSandbox from "./molecules/codesandbox/CodeSandbox.vue";
import Projects from "./organisms/projects/Projects.vue";
import Banner from "./molecules/banner/Banner.vue";
import HomeBanner from "./organisms/home/HomeBanner.vue";
import HomePartners from "./organisms/home/HomePartners.vue";
import HomeFrameworks from "./organisms/home/HomeFrameworks.vue";
import HomeBody from "./organisms/home/HomeBody.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "home-hero-image": () => h(HomeBanner),
      "home-features-before": () => h(HomePartners),
      "home-features-after": () => h(HomeBody)
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({app}) {
    app.component("ApiList", ApiList);
    app.component("ApiAnchorQuery", ApiAnchorQuery);
    app.component("GithubContributors", GithubContributors);
    app.component("CodeSandbox", CodeSandbox);
    app.component("Projects", Projects);
    app.component("HomeFrameworks", HomeFrameworks);
    // eslint-disable-next-line vue/no-reserved-component-names
    app.component("Button", Button);
    app.component("Banner", Banner);
    app.directive("lazyload-observer", LazyLoadObserver);
  }
} satisfies Theme;
