import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ts.ED",
  themeConfig: {
    search: {
      provider: 'algolia',
      options: {
        appId: 'DH8VVM2E1E',
        apiKey: '9a1620e0f36bc5dc3b0982fdcbdd6f5f',
        indexName: 'ts_ed'
      }
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting started', link: '/introduction/getting-started' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Ts.ED?', link: '/introduction/what-is-tsed' },
          { text: 'Capabilities', link: '/introduction/capabilities' },
          { text: 'Installation', link: '/introduction/getting-started' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tsedio/tsed' }
    ]
  }
})
