import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Novadesk Documentation',
  description: 'Complete documentation for Novadesk',
  vue: {
    template: {
      compilerOptions: {
        whitespace: 'preserve'
      }
    }
  },
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/introduction/getting-started' },
      { text: 'API', link: '/api/app-object/utility-methods' },
      { text: 'Guides', link: '/guides/script-types' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/introduction/getting-started' },
          { text: 'Installation', link: '/introduction/installation' },
          { text: 'Creating First Widget', link: '/introduction/creating-first-widget' },
        ]
      },
      {
        text: 'API Reference',
        collapsed: false,
        items: [
          {
            text: 'App Object',
            collapsed: true,
            items: [
              { text: 'Utility Methods', link: '/api/app-object/utility-methods' },
              { text: 'Tray API', link: '/api/app-object/tray-api' },
              { text: 'Settings', link: '/api/app-object/settings' },
            ]
          },
          {
            text: 'System API',
            collapsed: true,
            items: [
              {
                text: 'System Monitors',
                collapsed: true,
                items: [
                  { text: 'CPU Monitor', link: '/api/system-api/system-monitors/cpu-monitor' },
                  { text: 'Disk Monitor', link: '/api/system-api/system-monitors/disk-monitor' },
                  { text: 'Memory Monitor', link: '/api/system-api/system-monitors/memory-monitor' },
                  { text: 'Mouse Monitor', link: '/api/system-api/system-monitors/mouse-monitor' },
                  { text: 'Network Monitor', link: '/api/system-api/system-monitors/network-monitor' },
                ]
              },
              { text: 'Addon API', link: '/api/system-api/addon-api' },
              { text: 'Audio API', link: '/api/system-api/audio-api' },
              { text: 'Clipboard API', link: '/api/system-api/clipboard-api' },
              { text: 'Display Metrics', link: '/api/system-api/display-metrics' },
              { text: 'Environment Variables', link: '/api/system-api/environment-variables' },
              { text: 'Execute Command', link: '/api/system-api/execute-command' },
              { text: 'Hotkey Management', link: '/api/system-api/hotkey-management' },
              { text: 'JSON API', link: '/api/system-api/json-api' },
              { text: 'Power API', link: '/api/system-api/power-api' },
              { text: 'Registry API', link: '/api/system-api/registry-api' },
              { text: 'Timers', link: '/api/system-api/timers' },
              { text: 'Web Fetch', link: '/api/system-api/web-fetch' },
            ]
          },
          {
            text: 'UI Elements API',
            collapsed: true,
            items: [
              { text: 'General Elements Options', link: '/api/ui-elements-api/general-elements-options' },
              { text: 'Bar Element', link: '/api/ui-elements-api/bar-element' },
              { text: 'Image Element', link: '/api/ui-elements-api/image-element' },
              { text: 'Text Element', link: '/api/ui-elements-api/text-element' },
            ]
          },
          {
            text: 'Widget API',
            collapsed: true,
            items: [
              { text: 'Widget Methods', link: '/api/widget-api/widget-methods' },
              { text: 'Widget Window', link: '/api/widget-api/widget-window' },
            ]
          },
          { text: 'Console Logging', link: '/api/logging' },
          { text: 'Path API', link: '/api/path-api' },
          { text: 'Global Variables', link: '/api/global-variables' },
          { text: 'Include', link: '/api/include' },
        ]
      },
      {
        text: 'Guides',
        collapsed: false,
        items: [
          { text: 'Script Types', link: '/guides/script-types' },
          { text: 'CLI Commands', link: '/guides/cli-commands' },
          { text: 'Colors', link: '/guides/colors' },
          { text: 'Color Matrix Guide', link: '/guides/color-matrix-guide' },
          { text: 'Transform Matrix Guide', link: '/guides/transform-matrix-guide' },
        ]
      },
      {
        text: 'Developer Resources',
        collapsed: true,
        items: [
          { text: 'Addon API', link: '/developers/api/addon-api' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
