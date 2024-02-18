# Getting Started
## Try it online

You can try VitePress directly in your browser on [CodeSandbox](https://codesandbox.io/p/devbox/tsed-mongoose-example-omkbm).

## Installation

To get started, you can either scaffold the project with the Ts.ED CLI, or clone a starter project.

To scaffold the project with the CLI, run the following commands. This will create a new project directory,
and populate the directory with the initial core Ts.ED files and supporting modules, creating a conventional base structure for your project.
Creating a new project with the CLI is recommended for first-time users.

::: code-group

```sh [npm]
npx -p @tsed/cli tsed init .
```

```sh [yarn]
yarn set version berry
yarn dlx -p @tsed/cli tsed init .
```

```sh [pnpm]
pnpx -p @tsed/cli tsed init .
```

```sh [bun]
bnx -p @tsed/cli tsed init .
```
:::

You will be greeted with a few simple questions:

<<< @/introduction/snippets/init.ansi

::: tip
By default, it's recommended to select the following options: Express, Ts.ED (convention), Swagger, Jest and Eslint + prettier.
:::

When all options are selected, the CLI will generate all files.
When it's done, run one of this command:

::: code-group

```sh [npm]
npm start
```

```sh [yarn]
yarn start
```

```sh [pnpm]
pnpm start
```

```sh [bun]
bun start
```

:::

<<< @/introduction/snippets/start.ansi

## Update dependencies

::: warning
If you have to upgrade Ts.ED dependencies, keep in mind this point:

It's really important to keep the same version for all `@tsed/*` (excepted @tsed/logger) packages.
To prevent errors, fix the version for each Ts.ED packages:

```json
{
  "dependencies": {
    "@tsed/common": "7.53.0",
    "@tsed/di": "7.53.0",
    "@tsed/core": "7.53.0",
    "@tsed/exceptions": "7.53.0",
    "@tsed/plaftorm-express": "7.53.0",
    "@tsed/swagger": "7.53.0"
  }
}
```

:::

## Project examples

Alternatively, you can check out one of these projects:

[//]: # (<Projects type="projects" />)

If none of previous solutions are satisfying maybe you are in these cases:

- [I want to migrate my application from Ts.ED v6](/getting-started/migration-from-v6.md)
- [I want to migrate my application from Express.js](/getting-started/migrate-from-express.md)

## What's next?

Now you can follow one of these links to develop your new application:

- [Create your first controller](/getting-started/create-your-first-controller.md)
- [Change server configuration](/docs/configuration.md)
- [Load configuration from files](/docs/configuration.md)
- [What is the Platform API](/docs/platform-api.md)
