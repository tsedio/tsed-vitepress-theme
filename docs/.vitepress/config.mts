import {defineConfig} from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ts.ED",
  themeConfig: {
    search: {
      provider: "algolia",
      options: {
        appId: "DH8VVM2E1E",
        apiKey: "9a1620e0f36bc5dc3b0982fdcbdd6f5f",
        indexName: "ts_ed"
      }
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: "Home", link: "/"},
      {text: "Getting started", link: "/introduction/getting-started"},
      {
        text: "Documentation",
        items: [
          {
            text: "Configuration",
            link: `/docs/configuration/`
          },
          {
            text: "Controllers",
            link: `/docs/controllers`
          },
          {
            text: "Providers",
            link: `/docs/providers`
          },
          {
            text: "Models",
            link: `/docs/model`
          },
          {
            text: "Json Mapper",
            link: `/docs/json-mapper`
          },
          {
            text: "Middlewares",
            link: `/docs/middlewares`
          },
          {
            text: "Pipes",
            link: `/docs/pipes`
          },
          {
            text: "Interceptors",
            link: `/docs/interceptors`
          },
          {
            text: "Authentication",
            link: `/docs/authentication`
          },
          {
            text: "Hooks",
            link: `/docs/hooks`
          },
          {
            text: "Response filter",
            link: `/docs/response-filter`
          },
          {
            text: "Exceptions",
            link: `/docs/exceptions`
          },
          {
            text: "Logger",
            link: `/docs/logger`
          },
          {
            text: "Context",
            link: `/docs/request-context`
          },
          {
            text: "Cache",
            link: `/docs/cache`
          },
          {
            text: "Platform API",
            link: `/docs/platform-api`
          },
          {
            text: "Command",
            link: `/docs/command`
          },
          {
            text: "Templating",
            link: `/docs/templating`
          },
          {
            text: "Validation",
            link: `/docs/validation`
          },
          {
            text: "Session & Cookies",
            link: `/tutorials/session`
          },
          {
            text: "Testing",
            link: `/docs/testing`
          }
        ]
      },
      {
        text: "Tutorials",
        items: [
          {
            text: "AJV",
            link: `/tutorials/ajv`
          },
          {
            text: "AWS",
            link: `/tutorials/aws`
          },
          {
            text: "Passport.js",
            link: `/tutorials/passport`
          },
          {
            text: "Keycloak",
            link: `/tutorials/keycloak`
          },
          {
            text: "Prisma",
            link: `/tutorials/prisma`
          },
          {
            text: "MikroORM",
            link: `/tutorials/mikroorm`
          },
          {
            text: "TypeORM",
            link: `/tutorials/typeorm`
          },
          {
            text: "Mongoose",
            link: `/tutorials/mongoose`
          },
          {
            text: "Objection.js",
            link: `/tutorials/objection`
          },
          {
            text: "IORedis",
            link: `/tutorials/ioredis`
          },
          {
            text: "GraphQL",
            link: `/tutorials/graphql`
          },
          {
            text: "Socket.io",
            link: `/tutorials/socket-io`
          },
          {
            text: "Swagger",
            link: `/tutorials/swagger`
          },
          {
            text: "OIDC",
            link: `/tutorials/oidc`
          },
          {
            text: "Stripe",
            link: `/tutorials/stripe`
          },
          {
            text: "Agenda",
            link: `/tutorials/agenda`
          },
          {
            text: "Serverless",
            link: `/tutorials/serverless`
          },
          {
            text: "Temporal",
            link: `/tutorials/temporal`
          },
          {
            text: "BullMQ",
            link: `/tutorials/bullmq`
          },
          {
            text: "Terminus",
            link: `/tutorials/terminus`
          },
          {
            text: "Vike",
            link: `/tutorials/vike`
          }
        ].sort((a, b) => (a.text < b.text ? -1 : 1))
      },
      {
        text: "More",
        items: [
          {
            text: "Team",
            link: "/team"
          }
        ]
      }
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          {text: "What is Ts.ED?", link: "/introduction/what-is-tsed"},
          {text: "Capabilities", link: "/introduction/capabilities"},
          {text: "Installation", link: "/introduction/getting-started"}
        ]
      },
      {
        text: "Configuration",
        items: [
          {text: "Options", link: "/docs/configuration/"},
          {text: "Load config from file", link: "/docs/configuration/load-configuration-from-file"},
          {text: "Express.js", link: "/docs/configuration/express"},
          {text: "Koa.js", link: "/docs/configuration/koa"}
        ]
      }
    ],

    socialLinks: [
      {icon: "github", link: "https://github.com/tsedio/tsed"},
      {icon: "slack", link: "https://slack.tsed.io"},
      {icon: "twitter", link: "https://x.com/TsED_io"}
      // { icon: '', link: 'https://stackoverflow.com/search?q=tsed' },
    ]
  }
});
