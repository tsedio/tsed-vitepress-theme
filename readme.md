<p style="text-align: center" align="center">
 <a href="https://tsed.io" target="_blank"><img src="https://tsed.io/tsed-og.png" width="200" alt="Ts.ED logo"/></a>
</p>

<div align="center">
   <h1>Ts.ED - New Website</h1>
   <hr />

[![Build & Release](https://github.com/tsedio/tsed/workflows/Build%20&%20Release/badge.svg)](https://github.com/tsedio/tsed/actions?query=workflow%3A%22Build+%26+Release%22)
[![PR Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/tsedio/tsed/blob/master/CONTRIBUTING.md)
[![npm version](https://badge.fury.io/js/%40tsed%2Fcommon.svg)](https://badge.fury.io/js/%40tsed%2Fcommon)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![github](https://img.shields.io/static/v1?label=Github%20sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/romakita)
[![opencollective](https://img.shields.io/static/v1?label=OpenCollective%20sponsor&message=%E2%9D%A4&logo=OpenCollective&color=%23fe8e86)](https://opencollective.com/tsed)

</div>

<div align="center">
  <a href="https://tsed.io/">Website</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://tsed.io/getting-started/">Getting started</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://api.tsed.io/rest/slack/tsedio/tsed">Slack</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://twitter.com/TsED_io">Twitter</a>
</div>

<hr />

> A Node.js and TypeScript Framework on top of Express. It provides a lot of decorators and guidelines to write your code.

## What it is

This repository is the new website for Ts.ED. It replaces the old website [https://tsed.io](https://tsed.io) based on [VuePress 1.x](https://vuepress.vuejs.org/) by a new website based on [VitePress](https://vitepress.dev).

## Installation

```sh
yarn install
```

## Development

```sh
yarn docs:dev
yarn storybook
```

## Build

```sh
yarn docs:build
```

Note: The build check the dead links in the documentation.

## Migration guideline

Most of the VuePress feature are available in VitePress. However, VuePress use Vue 2 and VitePress use Vue 3.
So right now, we migrate the content without all custom components.

### How to migrate a content (PR)

1. Ask me to be added to the migration team (it gives you access to this repo)
1. Go to this link to pick and assign you a task: https://github.com/tsedio/tsed-website/issues/14
1. Start PR
1. Get the legacy content from https://github.com/tsedio/tsed/tree/production/docs
1. Review the content and migrate syntax that must me converted (see [syntax migration](#syntax-migration))
1. Submit PR

Migrate page per page is really fast and you should take very little time but will enormously advance migration. So thank you for your help!!

### Syntax migration

#### Tabs

In VuePress, we use a custom Tabs component to display content in tabs:

```html
<Tabs class="-code">
  <Tab label="Jest"> <<< @/docs/snippets/testing/parse-service.jest.spec.ts </Tab>
  <Tab label="Vitest"> <<< @/docs/snippets/testing/parse-service.vitest.spec.ts </Tab>
  <Tab label="Mocha"> <<< @/docs/snippets/testing/parse-service.mocha.spec.ts </Tab>
  <Tab label="ParseService.ts"> <<< @/docs/snippets/testing/parse-service.ts </Tab>
</Tabs>
```

VitePress has a custom markdown syntax for tabs. Base on the previous example, we can rewrite the previous example like this:

```markdown
::: code-group

<<< @/docs/snippets/testing/parse-service.jest.spec.ts [jest]

<<< @/docs/snippets/testing/parse-service.vitest.spec.ts [vitest]

<<< @/docs/snippets/testing/parse-service.mocha.spec.ts [mocha]

<<< @/docs/snippets/testing/parse-service.ts [ParseService.ts]

:::
```

## Contributors

Please read [contributing guidelines here](./CONTRIBUTING.md).

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
