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
            text: "UI APIs",
            collapsed: false,
            items: [
              {
                text: "UI Object",
                link: "/api/ui/ui-object",
              },
              {
                text: "Animate",
                link: "/api/ui/animate",
              },
              {
                text: "General Options",
                link: "/api/ui/ui-elements/general-options",
              },
              {
                text: "UI Elements",
                collapsed: false,
                items: [
                  { text: "addAreaGraph", link: "/api/ui/ui-elements/add-area-graph" },
                  { text: "addBar", link: "/api/ui/ui-elements/add-bar" },
                  { text: "addBitmap", link: "/api/ui/ui-elements/add-bitmap" },
                  { text: "addButton", link: "/api/ui/ui-elements/add-button" },
                  { text: "addColorPicker", link: "/api/ui/ui-elements/add-color-picker" },
                  { text: "addHistogram", link: "/api/ui/ui-elements/add-histogram" },
                  { text: "addImage", link: "/api/ui/ui-elements/add-image" },
                  { text: "addInputBox", link: "/api/ui/ui-elements/add-input-box" },
                  { text: "addLayoutBox", link: "/api/ui/ui-elements/add-layout-box" },
                  { text: "addLine", link: "/api/ui/ui-elements/add-line" },
                  { text: "addRotator", link: "/api/ui/ui-elements/add-rotator" },
                  { text: "addRoundLine", link: "/api/ui/ui-elements/add-round-line" },
                  { text: "addShape", link: "/api/ui/ui-elements/add-shape" },
                  { text: "addText", link: "/api/ui/ui-elements/add-text" },
                ]
              },
            ],
          },
          {
            text: "Modules",
            collapsed: false,
            items: [
              {
                text: "fs",
                link: "/api/modules/fs",
              },
              {
                text: "novadesk",
                collapsed: false,
                items: [
                  { text: "addon", link: "/api/modules/novadesk/addon" },
                  { text: "app", link: "/api/modules/novadesk/app" },
                  { text: "dialog", link: "/api/modules/novadesk/dialog" },
                  { text: "toast", link: "/api/modules/novadesk/toast" },
                  { text: "tray", link: "/api/modules/novadesk/tray" },
                  { text: "widgetWindow", link: "/api/modules/novadesk/widgetWindow" },
                ],
              },
              {
                text: "system",
                collapsed: true,
                items: [
                  { text: "audio", link: "/api/modules/system/audio" },
                  { text: "clipboard", link: "/api/modules/system/clipboard" },
                  { text: "colors", link: "/api/modules/system/colors" },
                  { text: "cpu", link: "/api/modules/system/cpu" },
                  { text: "disk", link: "/api/modules/system/disk" },
                  { text: "displayMetrics", link: "/api/modules/system/display-metrics" },
                  { text: "env", link: "/api/modules/system/env" },
                  { text: "execute", link: "/api/modules/system/execute" },
                  { text: "fileIcon", link: "/api/modules/system/file-icon" },
                  { text: "json", link: "/api/modules/system/json" },
                  { text: "memory", link: "/api/modules/system/memory" },
                  { text: "network", link: "/api/modules/system/network" },
                  { text: "power", link: "/api/modules/system/power" },
                  { text: "recycleBin", link: "/api/modules/system/recycle-bin" },
                  { text: "registry", link: "/api/modules/system/registry" },
                  { text: "time", link: "/api/modules/system/time" },
                  { text: "wallpaper", link: "/api/modules/system/wallpaper" },
                  { text: "webFetch", link: "/api/modules/system/webFetch" },
                ],
              },
            ],
          },
          {
            text: "Addons",
            collapsed: true,
            items: [
              {
                text: "Audio",
                items: [
                  { text: "AppVolume", link: "/api/addons/AppVolume" },
                  { text: "AudioLevel", link: "/api/addons/AudioLevel" },
                  { text: "NowPlaying", link: "/api/addons/NowPlaying" },
                ],
              },
              {
                text: "Visual",
                items: [
                  { text: "Brightness", link: "/api/addons/Brightness" },
                  { text: "BlurBehind", link: "/api/addons/BlurBehind" },
                ],
              },
              {
                text: "Input",
                items: [
                  { text: "Hotkey", link: "/api/addons/Hotkey" },
                  { text: "InputBox", link: "/api/addons/InputBox" },
                ],
              },
            ],
          }
        ],
      },

      {
        text: "Guides",
        collapsed: false,
        items: [
          { text: "Script Types", link: "/guides/script-types" },
          { text: "Time and Date", link: "/guides/time" },
          { text: "CLI Commands", link: "/guides/cli-commands" },
          { text: "Runtime Mode", link: "/guides/runtime-mode" },
          { text: "Settings File", link: "/guides/settings-file" },
          { text: "Widget Build & Installer", link: "/guides/widget-build-and-installer" },
          { text: "Containers", link: "/guides/containers" },
          { text: "Colors", link: "/guides/colors" },
          { text: "Color Matrix Guide", link: "/guides/color-matrix-guide" },
          { text: "Transform Matrix Guide", link: "/guides/transform-matrix-guide" },
        ],
      },

      {
        text: "Property Guides",
        collapsed: false,
        items: [
          { text: "Font Color", link: "/guides/font-color" },
          { text: "Font Face", link: "/guides/font-face" },
          { text: "Font Size", link: "/guides/font-size" },
          { text: "Font Weight", link: "/guides/font-weight" },
          { text: "Letter Spacing", link: "/guides/letter-spacing" },
          { text: "Text Align", link: "/guides/text-align" },
          { text: "Text Clip", link: "/guides/text-clip" },
        ],
      },

      {
        text: "Addon Development",
        collapsed: true,
        items: [{ text: "Building Native Addons", link: "/developers/api/addon-api" }],
      },

      {
        text: "Changelog",
        link: "/changelogs/CHANGELOG",
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/Official-Novadesk/novadesk" }],
  },
});

