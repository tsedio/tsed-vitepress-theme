import {defineConfig} from "vitepress";
import {apiAnchor} from "./theme/markdown/api-anchor/api-anchor.js";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ts.ED",
  lastUpdated: true,

  sitemap: {
    hostname: "https://tsed.io"
  },

  head: [
    // ['link', { rel: 'icon', type: 'image/svg+xml', href: '/tsed.svg' }],
    ["link", {rel: "icon", type: "image/png", href: "/tsed-og.png"}],
    ["link", {rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon"}],
    ["link", {rel: "icon", href: "/favicon.ico", type: "apple-touch-icon"}],
    ["link", {rel: "icon", href: "/apple-touch-icon.png", type: "image/x-icon", sizes: "180x180"}],
    ["link", {rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32"}],
    ["link", {rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16"}],
    ["meta", {name: "theme-color", content: "#5f67ee"}],
    ["meta", {property: "og:type", content: "website"}],
    ["meta", {property: "og:locale", content: "en"}],
    ["meta", {property: "og:title", content: "Ts.ED - A Node.js and TypeScript Framework on top of Express/Koa.js."}],
    ["meta", {property: "og:site_name", content: "Ts.ED"}],
    ["meta", {property: "og:image", content: "https://tsed.io/vitepress-og.jpg"}],
    ["meta", {property: "og:url", content: "https://vitepress.dev/"}]
  ],

  themeConfig: {
    apiUrl: "https://tsed.io/api.json",
    apiRedirectUrl: "https://api-docs.tsed.io",
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
      // {text: "Home", link: "/"},
      {
        text: "Getting started",
        items: [
          {
            text: "Introduction",
            items: [
              {text: "What is Ts.ED?", link: "/introduction/what-is-tsed"},
              {text: "Capabilities", link: "/introduction/capabilities"},
              {text: "Installation", link: "/introduction/getting-started"},
              {text: "Create your first controller", link: "/introduction/create-your-first-controller"}
            ]
          },
          {
            text: "Migration",
            items: [
              {text: "Migrate from v6", link: "/introduction/migrate-from-v6"},
              {text: "Migrate from Express", link: "/introduction/migrate-from-express"}
            ]
          }
        ]
      },
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
            link: `/docs/session`
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
          },
          {
            text: "Jest",
            link: `/tutorials/jest`
          },
          {
            text: "Vitest",
            link: `/tutorials/vitest`
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
    sidebar: {
      "/introduction/": [
        {
          text: "Introduction",
          items: [
            {text: "What is Ts.ED?", link: "/introduction/what-is-tsed"},
            {text: "Capabilities", link: "/introduction/capabilities"},
            {text: "Installation", link: "/introduction/getting-started"},
            {text: "Create your first controller", link: "/introduction/create-your-first-controller"}
          ]
        },
        {
          text: "Migration",
          items: [
            {text: "Migrate from v6", link: "/introduction/migrate-from-v6"},
            {text: "Migrate from Express", link: "/introduction/migrate-from-express"}
          ]
        }
      ],
      "/docs/": [
        {
          text: "Configuration",
          items: [
            {text: "Options", link: "/docs/configuration/"},
            {text: "Load config from file", link: "/docs/configuration/load-configuration-from-file"},
            {text: "Express.js", link: "/docs/configuration/express"},
            {text: "Koa.js", link: "/docs/configuration/koa"}
          ]
        },
        {
          test: "Fundamentals",
          items: [
            {
              text: "Controllers",
              link: "/docs/controllers"
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
              text: "Testing",
              link: `/docs/testing`
            }
          ]
        },
        {
          text: "Advanced",
          items: [
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
              link: `/docs/session`
            }
          ]
        }
      ]
    },
    socialLinks: [
      {icon: "github", link: "https://github.com/tsedio/tsed"},
      {icon: "slack", link: "https://slack.tsed.io"},
      {icon: "twitter", link: "https://x.com/TsED_io"}
      // { icon: '', link: 'https://stackoverflow.com/search?q=tsed' },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2019-present Romain Lenzotti"
    }
  },
  markdown: {
    image: {
      lazyLoading: true
    },
    config: (md) => {
      md.use(apiAnchor);
    }
  }
});
