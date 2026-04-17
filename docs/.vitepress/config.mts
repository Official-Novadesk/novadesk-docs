import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Novadesk Docs",
  description: "Complete documentation for Novadesk",

  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
    ],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
  ],

  vue: {
    template: {
      compilerOptions: {
        whitespace: "preserve",
      },
    },
  },

  vite: {
    ssr: {
      noExternal: ["vitepress-component-medium-zoom"],
    },
  },

  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },

  themeConfig: {
    logo: "/logo.svg",

    search: {
      provider: "local",
    },

    nav: [
      { text: "Home", link: "/" },
      { text: "Introduction", link: "/introduction/getting-started" },
      { text: "API", link: "/api/logging" },
      { text: "Guides", link: "/guides/script-types" },
    ],

    sidebar: [
      {
        text: "Introduction",
        collapsed: false,
        items: [
          { text: "Getting Started", link: "/introduction/getting-started" },
          { text: "Installation", link: "/introduction/installation" },
          {
            text: "Creating First Widget",
            link: "/introduction/creating-first-widget",
          },
        ],
      },

      {
        text: "API Reference",
        collapsed: false,
        items: [
          { text: "Logging", link: "/api/logging" },
          { text: "Path", link: "/api/path" },
          { text: "Global Variables", link: "/api/global-variables" },
          { text: "Timers", link: "/api/timers" },
          { text: "IPC", link: "/api/ipc" },
          {
            text: "UI Object APIs",
            collapsed: true,
            items: [
              {
                text: "General Options",
                items: [
                  {
                    text: "General Element Options",
                    link: "/api/ui/ui-elements/general-options/general-elements-options",
                  },
                  {
                    text: "General Image Options",
                    link: "/api/ui/ui-elements/general-options/general-image-options",
                  },
                ],
              },
              {
                text: "UI Object Methods",
                link: "/api/ui/ui-object",
                collapsed: true,
                items: []
              },
              {
                text: "UI Elements",
                collapsed: true,
                items: [
                  { text: "addBar", link: "/api/ui/ui-elements/addBar" },
                  { text: "addLine", link: "/api/ui/ui-elements/addLine" },
                  {
                    text: "addAreaGraph",
                    link: "/api/ui/ui-elements/addAreaGraph",
                  },
                  {
                    text: "addHistogram",
                    link: "/api/ui/ui-elements/addHistogram",
                  },
                  {
                    text: "addShape",
                    link: "/api/ui/ui-elements/addShape",
                  },
                  {
                    text: "addImage",
                    link: "/api/ui/ui-elements/addImage",
                  },
                  {
                    text: "addButton",
                    link: "/api/ui/ui-elements/addButton",
                  },
                  {
                    text: "addBitmap",
                    link: "/api/ui/ui-elements/addBitmap",
                  },
                  {
                    text: "addRotator",
                    link: "/api/ui/ui-elements/addRotator",
                  },
                  {
                    text: "addRoundLine",
                    link: "/api/ui/ui-elements/addRoundLine",
                  },
                  {
                    text: "addText",
                    link: "/api/ui/ui-elements/addText",
                  },
                ]
              },
            ],
          },
          {
            text: "Modules",
            collapsed: true,
            link: "/api/modules/modules",
            items: [
              {
                text: "fs",
                link: "/api/modules/fs",
              },
              {
                text: "novadesk",
                collapsed: true,
                items: [
                  { text: "addon", link: "/api/modules/novadesk/addon" },
                  { text: "app", link: "/api/modules/novadesk/app" },
                  { text: "tray", link: "/api/modules/novadesk/tray" },
                  {
                    text: "widgetWindow",
                    link: "/api/modules/novadesk/widgetWindow",
                  },
                ],
              },
              {
                text: "system",
                collapsed: true,
                items: [
                  {
                    text: "clipboard",
                    link: "/api/modules/system/clipboard",
                  },
                  { text: "cpu", link: "/api/modules/system/cpu" },
                  { text: "disk", link: "/api/modules/system/disk" },
                  { text: "env", link: "/api/modules/system/env" },
                  { text: "execute", link: "/api/modules/system/execute" },
                  {
                    text: "displayMetrics",
                    link: "/api/modules/system/displayMetrics",
                  },
                  {
                    text: "fileIcon",
                    link: "/api/modules/system/fileIcon",
                  },
                  { text: "json", link: "/api/modules/system/json" },
                  { text: "memory", link: "/api/modules/system/memory" },
                  { text: "network", link: "/api/modules/system/network" },
                  { text: "power", link: "/api/modules/system/power" },
                  {
                    text: "registry",
                    link: "/api/modules/system/registry",
                  },
                  {
                    text: "wallpaper",
                    link: "/api/modules/system/wallpaper",
                  },
                  { text: "webFetch", link: "/api/modules/system/webfetch" },
                ],
              },
            ],
          },
          {
            text: "addons",
            collapsed: true,
            items: [
              { text: "AppVolume", link: "/api/addons/AppVolume" },
              { text: "AudioLevel", link: "/api/addons/AudioLevel" },
              { text: "Brightness", link: "/api/addons/Brightness" },
              { text: "BlurBehind", link: "/api/addons/BlurBehind" },
              { text: "Hotkey", link: "/api/addons/Hotkey" },
              { text: "InputBox", link: "/api/addons/InputBox" },
              { text: "NowPlaying", link: "/api/addons/NowPlaying" },

            ],
          }
        ],
      },

      {
        text: "Guides",
        collapsed: false,
        items: [
          { text: "Script Types", link: "/guides/script-types" },
          { text: "Time And Date", link: "/guides/time" },
          { text: "CLI Commands", link: "/guides/cli-commands" },
          { text: "Runtime Mode", link: "/guides/runtime-mode" },
          { text: "Settings File", link: "/guides/settings-file" },
          {
            text: "Widget Build And Installer",
            link: "/guides/widget-build-and-installer",
          },
          { text: "Containers", link: "/guides/containers" },
          { text: "Colors", link: "/guides/colors" },
          { text: "Color Matrix Guide", link: "/guides/color-matrix-guide" },
          {
            text: "Transform Matrix Guide",
            link: "/guides/transform-matrix-guide",
          },
        ],
      },

      {
        text: "Developer Resources",
        collapsed: true,
        items: [{ text: "Addon API", link: "/developers/api/addon-api" }],
      },

      {
        text: "Changelog",
        link: "/changelogs/CHANGELOG",
      },
    ],

    socialLinks: [{ icon: "github", link: "https://novadesk.pages.dev/" }],
  },
});

