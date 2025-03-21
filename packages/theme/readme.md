<p style="text-align: center" align="center">
 <a href="https://tsed.dev" target="_blank"><img src="https://tsed.dev/tsed-og.png" width="200" alt="Ts.ED logo"/></a>
</p>

<div align="center">
   <h1>Ts.ED - VitePress Theme</h1>
   <hr />

[![Build & Release](https://github.com/tsedio/tsed/workflows/Build%20&%20Release/badge.svg)](https://github.com/tsedio/tsed-vitepress-theme/actions?query=workflow%3A%22Build+%26+website%22)
[![PR Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/tsedio/tsed-vitepress-theme/blob/master/CONTRIBUTING.md)
[![npm version](https://badge.fury.io/js/%40tsed%2Fcommon.svg)](https://badge.fury.io/js/%40tsed%2Fvitepress-theme)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![github](https://img.shields.io/static/v1?label=Github%20sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/romakita)
[![opencollective](https://img.shields.io/static/v1?label=OpenCollective%20sponsor&message=%E2%9D%A4&logo=OpenCollective&color=%23fe8e86)](https://opencollective.com/tsed)

</div>

<div align="center">
  <a href="https://tsed.dev/">Website</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://tsed.dev/getting-started/">Getting started</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://api.tsed.dev/rest/slack/tsedio/tsed">Slack</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://twitter.com/TsED_io">Twitter</a>
</div>

<hr />

> Official Ts.ED theme for VitePress

## Installation

```sh
yarn add @tsed/vitepress-theme
```

## Configuration

In your config.mts file, you can import the theme and extend it:

```ts
// https://vitepress.dev/guide/custom-theme
import {DefaultTheme} from "@tsed/vitepress-theme";
import type {Theme} from "vitepress";
import {h} from "vue";
import HomeBanner from "@tsed/vitepress-theme/organisms/home/HomeBanner.vue";
import HomeBody from "@tsed/vitepress-theme/organisms/home/HomeBody.vue";
import HomeTabsTerminal from "@tsed/vitepress-theme/organisms/home/terminal/HomeTabsTerminal.vue";
import HomeTabTerminalNpm from "@tsed/vitepress-theme/organisms/home/terminal/HomeTabTerminalNpm.vue";
import HomeTabTerminalYarn from "@tsed/vitepress-theme/organisms/home/terminal/HomeTabTerminalYarn.vue";
import HomeTabTerminalPnpm from "@tsed/vitepress-theme/organisms/home/terminal/HomeTabTerminalPnpm.vue";
import HomeTabTerminalBun from "@tsed/vitepress-theme/organisms/home/terminal/HomeTabTerminalBun.vue";
import HomeBeforeFeatures from "@tsed/vitepress-theme/organisms/home/HomeBeforeFeatures.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "home-hero-image": () =>
        h(HomeBanner, null, { // you can override the default theme banner by your own component
          default: () =>
            h(HomeTabsTerminal, null, {
              npm: () => h(HomeTabTerminalNpm), // Replace the default NPM terminal tab
              yarn: () => h(HomeTabTerminalYarn), // Replace the default Yarn terminal tab
              pnpm: () => h(HomeTabTerminalPnpm), // Replace the default Pnpm terminal tab
              bun: () => h(HomeTabTerminalBun) // Replace the default Bun terminal tab
            })
        }),
      "home-features-before": () => h(HomeBeforeFeatures),
      "home-features-after": () => h(HomeBody)
    });
  }
} satisfies Theme;
```

Then, create a `tailwind.config.ts` configuration file:

```ts
import type {Config} from "tailwindcss";
import {tailwindPreset} from "@tsed/vitepress-theme/tailwind.preset";

const config = {
  presets: [tailwindPreset as unknown as Config],
  darkMode: "class",
  content: [
    "./docs/.vitepress/**/*.{js,ts,vue}",
    "./docs/.vitepress/themes/**/*.{js,ts,vue}",
    "./packages/theme/**/*.{js,ts,vue}",
    "./docs/**/*.md"
  ],
  safelist: [
    {pattern: /^bg-/},
    {pattern: /^text-/},
    {pattern: /^m-/},
    {pattern: /^mx-/},
    {pattern: /^p-/},
    {pattern: /^px-/},
    {pattern: /^gap-/},
    {pattern: /^shadow-/}
  ]
} satisfies Config;

export default config;
```

## Implement your own Npm/Yarn/Pnpm/Bun terminal tab

You can implement your own terminal tab by creating a new component as follows:

```vue
<template>
  <pre
      class="shiki shiki-themes github-light github-dark vp-code"
      tabindex="0"
  ><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span
      style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span
      style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @tsed/cli</span><span
      style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tsed</span><span
      style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span><span
      style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span></span></code></pre>
</template>
```

Then, you can import it in your `config.mts` file:

```ts
import {DefaultTheme} from "@tsed/vitepress-theme";
import type {Theme} from "vitepress";
import {h} from "vue";
import HomeBanner from "@tsed/vitepress-theme/organisms/home/HomeBanner.vue";
import HomePartners from "@tsed/vitepress-theme/organisms/home/HomePartners.vue";
import HomeBody from "@tsed/vitepress-theme/organisms/home/HomeBody.vue";
import HomeTabsTerminal from "@tsed/vitepress-theme/organisms/home/terminal/HomeTabsTerminal.vue";
import HomeTabTerminalNpm from "./terminal/HomeTabTerminalNpm.vue";
import HomeTabTerminalYarn from "./terminal/HomeTabTerminalYarn.vue";
import HomeTabTerminalPnpm from "./terminal/HomeTabTerminalPnpm.vue";
import HomeTabTerminalBun from "./terminal/HomeTabTerminalBun.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "home-hero-image": () =>
        h(HomeBanner, null, {
          default: () =>
            h(HomeTabsTerminal, null, {
              npm: () => h(HomeTabTerminalNpm), 
              yarn: () => h(HomeTabTerminalYarn),
              pnpm: () => h(HomeTabTerminalPnpm),
              bun: () => h(HomeTabTerminalBun)
            })
        }),
      "home-features-before": () => h(HomePartners),
      "home-features-after": () => h(HomeBody)
    });
  }
} satisfies Theme;
```

## Contributors

Please read [contributing guidelines here](https://github.com/tsedio/tsed-vitepress-theme/CONTRIBUTING.md).

<a href="https://github.com/tsedio/tsed/graphs/contributors"><img src="https://opencollective.com/tsed/contributors.svg?width=890" /></a>

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/tsed#backer)]

<a href="https://opencollective.com/tsed#backers" target="_blank"><img src="https://opencollective.com/tsed/tiers/backer.svg?width=890"></a>

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/tsed#sponsor)]

## License

The MIT License (MIT)

Copyright (c) 2016 - 2023 Romain Lenzotti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
