# GraphQL WS

<Banner src="/graphql-ws-large.png" height="200" />

GraphQL Websocket allows you to use the `subscription` feature of GraphQL using the Websocket transport protocol.
This module is based on the [graphql-ws](https://the-guild.dev/graphql/ws) package. It pre-configures the socket server and GraphQL server to work together.

## Feature

- Support multiple GraphQL server
- Enable subscription feature of GraphQL

### Installation

This module need to be used with `@tsed/apollo` module. So, you must install it before (see [here](/tutorials/graphql-apollo.md)).

::: code-group

```bash [Npm]
npm install --save @tsed/graphql-ws graphql-ws
```

```bash [Yarn]
yarn add @tsed/graphql-ws graphql-ws
```
:::

```typescript
import {Configuration} from "@tsed/common";
import "@tsed/platform-express";
import "@tsed/apollo";
import "@tsed/graphql-ws";
import {join} from "path";

@Configuration({
  apollo: {
    server1: {
      // GraphQL server configuration
      path: "/",
      playground: true, // enable playground GraphQL IDE. Set false to use Apollo Studio
      plugins: [], // Apollo plugins

      wsServerOptions: {
        // See options descriptions on
      },
      wsUseServerOptions: {
        // See options descriptions on GraphQL WS
      }

      // Give custom server instance
      // server?: (config: Config) => ApolloServer;

      // ApolloServer options
      // ...
      // See options descriptions on https://www.apollographql.com/docs/apollo-server/api/apollo-server.html
    }
  },
  graphqlWs: {
    // global options
    wsServerOptions: {
      // See options descriptions on
    },
    wsUseServerOptions: {
      // See options descriptions on
    }
  }
})
export class Server {}
```

## Register plugins

You can register plugins with the `plugins` property. The plugins are executed in the order of declaration.

```typescript
import {Configuration} from "@tsed/common";
import "@tsed/platform-express";
import "@tsed/apollo";
import {join} from "path";

@Configuration({
  apollo: {
    server1: {
      plugins: [] // Apollo plugins
    }
  }
})
export class Server {}
```

But if you need to register and access to the injector, you can use the `$alterApolloServerPlugins` hook. For example,
you can register the `graphql-ws` necessary to support the `subscription` feature of GraphQL like this:

```typescript
import {Constant, Inject, InjectorService, Module} from "@tsed/di";
import {useServer} from "graphql-ws/lib/use/ws";
import Http from "http";
import Https from "https";
import {WebSocketServer} from "ws";
import {GraphQLWSOptions} from "./GraphQLWSOptions";

@Module()
export class GraphQLWSModule {
  @Constant("graphqlWs", {})
  private settings: GraphQLWSOptions;

  @Inject(Http.Server)
  private httpServer: Http.Server | null;

  @Inject(Https.Server)
  private httpsServer: Https.Server | null;

  @Inject()
  private injector: InjectorService;

  createWSServer(settings: GraphQLWSOptions) {
    const wsServer = new WebSocketServer({
      ...(this.settings.wsServerOptions || {}),
      ...settings.wsServerOptions,
      server: this.httpsServer || this.httpServer!,
      path: settings.path
    });

    return useServer(
      {
        ...(this.settings.wsUseServerOptions || {}),
        ...settings.wsUseServerOptions,
        schema: settings.schema
      },
      wsServer
    );
  }

  async $alterApolloServerPlugins(plugins: any[], settings: GraphQLWSOptions) {
    const wsServer = await this.createWSServer(settings);

    this.injector.logger.info(`Create GraphQL WS server on: ${settings.path}`);

    return plugins.concat({
      serverWillStart() {
        return {
          async drainServer() {
            await wsServer.dispose();
          }
        };
      }
    } as any);
  }
}
```

::: tip Note
Ts.ED provide a `@tsed/graphql-ws` package to support the `subscription` feature of GraphQL. See [here](https://tsed.dev/api/graphql-ws.html) for more details.
:::

## Nexus

### Installation

::: code-group
```bash [Express.js]
npm install --save @tsed/apollo
npm install --save nexus graphql apollo-server-express
npm install --save-dev apollo-server-testing
```

```bash [Koa.js]
npm install --save @tsed/apollo graphql
npm install --save nexus graphql apollo-server-koa
npm install --save-dev apollo-server-testing
```
:::

Now, we can configure the Ts.ED server by importing `@tsed/apollo` in your Server:

```typescript
import {Configuration} from "@tsed/common";
import "@tsed/platform-express";
import "@tsed/apollo";
import {schema} from "./schema";
import {join} from "path";

@Configuration({
  apollo: {
    server1: {
      // GraphQL server configuration
      path: "/",
      playground: true, // enable playground GraphQL IDE. Set false to use Apollo Studio
      schema,
      plugins: [] // Apollo plugins

      // Give custom server instance
      // server?: (config: Config) => ApolloServer;

      // ApolloServer options
      // ...
      // See options descriptions on https://www.apollographql.com/docs/apollo-server/api/apollo-server.html
    }
  }
})
export class Server {}
```

Then create `schema/index.ts`:

```typescript
import {makeSchema} from "nexus";
import {join} from "path";

export const schema = makeSchema({
  types: [], // 1
  outputs: {
    typegen: join(process.cwd(), "..", "..", "nexus-typegen.ts"), // 2
    schema: join(process.cwd(), "..", "..", "schema.graphql") // 3
  }
});
```

## TypeGraphQL

### Installation

To begin, install the `@tsed/typegraphql` package:

::: code-group
```bash [Express.js]
npm install --save @tsed/typegraphql graphql apollo-server-express
npm install --save type-graphql apollo-datasource apollo-datasource-rest
npm install --save-dev apollo-server-testing
```

```bash [Koa.js]
npm install --save @tsed/typegraphql graphql apollo-server-koa
npm install --save type-graphql apollo-datasource apollo-datasource-rest
npm install --save-dev apollo-server-testing
```
:::

Now, we can configure the Ts.ED server by importing `@tsed/typegraphql` in your Server:


### Configuration

<<< @/tutorials/snippets/graphql/server-configuration.ts

The following codesandbox example show you how you can use this configuration:

<iframe src="https://codesandbox.io/embed/tsed-graphql-pgvfz?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="TsED Graphql"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi;
payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe> 


### Types

<<< @/tutorials/snippets/graphql/server-configuration.ts

We want to get the equivalent of this type described in SDL:

```
type Recipe {
  id: ID!
  title: String!
  description: String
  creationDate: Date!
  ingredients: [String!]!
}
```

So we create the Recipe class with all properties and types:

```typescript
class Recipe {
  id: string;
  title: string;
  description?: string;
  creationDate: Date;
  ingredients: string[];
}
```

Then we decorate the class and its properties with decorators:

<<< @/tutorials/snippets/graphql/recipe-type.ts

The detailed rules for when to use nullable, array and others are described
in [fields and types docs](https://typegraphql.com/docs/types-and-fields.html).

### Resolvers

After that we want to create typical crud queries and mutation. To do that we create the resolver (controller) class
that will have injected RecipeService in the constructor:

<<< @/tutorials/snippets/graphql/resolver-service.ts

#### Multiple GraphQL server

If you register multiple GraphQL servers, you must specify the server id in the `@ResolverController` decorator.

```typescript
@ResolverController(Recipe, {id: "server1"})
```

Another solution is to not use `@ResolverController` (use `@Resolver` from TypeGraphQL), and declare explicitly the resolver in the server configuration:

```typescript
@Configuration({
  graphql: {
    server1: {
      resolvers: {
        RecipeResolver
      }
    },
    server2: {
      resolvers: {
        OtherResolver
      }
    }
  }
})
```

### Data Source

Data source is one of the Apollo server features which can be used as option for your Resolver or Query. Ts.ED provides
a @@DataSourceService@@ decorator to declare a DataSource which will be injected to the Apollo server context.

<<< @/tutorials/snippets/graphql/datasource-service.ts

Then you can retrieve your data source through the context in your resolver like that:

<<< @/tutorials/snippets/graphql/resolver-data-source.ts

## Get Server instance

ApolloService (or TypeGraphQLService) lets you to retrieve an instance of ApolloServer.

<<< @/tutorials/snippets/graphql/get-server-instance.ts

For more information about ApolloServer, look at its
documentation [here](https://www.apollographql.com/docs/apollo-server/api/apollo-server.html);

## Testing

Here is an example to create a test server based on TypeGraphQL and run a query:

::: tip

The unit example is also available to test any Apollo Server!
:::

::: code-group

<<< @/tutorials/snippets/graphql/testing.jest.ts [Jest]

<<< @/tutorials/snippets/graphql/testing.mocha.ts [Mocha]

<<< @/tutorials/snippets/graphql/recipe-type.ts [RecipeType.ts]

<<< @/tutorials/snippets/graphql/recipe-args.ts [RecipeArgs.ts]

<<< @/tutorials/snippets/graphql/recipes-service.ts [RecipesService.ts]

<<< @/tutorials/snippets/graphql/resolver-service.ts [RecipeResolver.ts]

:::

## Author

<GithubContributors users="['Romakita']"/>

## Maintainers

<GithubContributors users="['Romakita']"/>

<div class="flex items-center justify-center p-5">
<Button href="/contributing.html" class="rounded-medium">
 Become maintainer
</Button>
</div>
