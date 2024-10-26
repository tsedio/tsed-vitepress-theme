// https://vitepress.dev/guide/custom-theme
import {h} from "vue";
import type {Theme} from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./styles/global.css";
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
import MessageCircleHeart from "./atoms/svg/MessageCircleHeart.vue";
import Warehouse from "./organisms/warehouse/Warehouse.vue";
import Api from "./organisms/api/Api.vue";

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
    app.component("Api", Api);
    app.component("ApiList", ApiList);
    app.component("ApiAnchorQuery", ApiAnchorQuery);
    app.component("GithubContributors", GithubContributors);
    app.component("CodeSandbox", CodeSandbox);
    app.component("Projects", Projects);
    app.component("HomeFrameworks", HomeFrameworks);
    app.component("MessageCircleHeart", MessageCircleHeart);
    // eslint-disable-next-line vue/no-reserved-component-names
    app.component("Button", Button);
    app.component("Banner", Banner);
    app.component("Warehouse", Warehouse);
    app.directive("lazyload-observer", LazyLoadObserver);
    // Layouts
  }
} satisfies Theme;
