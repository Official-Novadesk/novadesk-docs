// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import markdoc from "@astrojs/markdoc";
import starlightScrollToTop from "starlight-scroll-to-top";
import starlightChangelogs from 'starlight-changelogs'

// https://astro.build/config
export default defineConfig({
  integrations: [
    markdoc(),
    starlight({
      title: "Novadesk Docs",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Official-Novadesk/novadesk",
        },
      ],
      sidebar: [
        { label: "Home", link: "/" },
        {
          label: "Introduction",
          items: [
            { label: "Getting Started", link: "/introduction/getting-started/" },
            { label: "Installation", link: "/introduction/installation/" },
            { label: "Creating First Widget", link: "/introduction/creating-first-widget/" },
          ],
        },
        {
          label: "API Reference",
          items: [
            {
              label: "Widget API",
              items: [
                { label: "widgetWindow()", link: "/api/widget-api/widget-window/" },
                { label: "Widget Methods", link: "/api/widget-api/widget-methods/" },
              ],
            },
            {
              label: "UI Elements API",
              items: [
                {
                  label: "General Options",
                  link: "/api/ui-elements-api/general-elements-options/",
                },
                { label: "Text Element", link: "/api/ui-elements-api/text-element/",badge: { text: 'Enhanced' } },
                { label: "Image Element", link: "/api/ui-elements-api/image-element/" },
                { label: "Bar Element", link: "/api/ui-elements-api/bar-element/" },
              ],
            },
            {
              label: "App Object",
              items: [
                {
                  label: "Settings",
                  link: "/api/app-object/settings/",
                },
                { label: "Utility Methods", link: "/api/app-object/utility-methods/" },
                { label: "Tray API", link: "/api/app-object/tray-api/" },
              ],
            },
            {
              label: "Console",
              items: [
                { label: "Logging", link: "/api/console/logging/" }
              ],
            },
            {
              label: "System API",
              items: [
                {
                  label: "System Monitors",
                  items: [
                    { label: "CPU Monitor", link: "/api/system-api/system-monitors/cpu-monitor/" },
                    { label: "Memory Monitor", link: "/api/system-api/system-monitors/memory-monitor/" },
                    { label: "Network Monitor", link: "/api/system-api/system-monitors/network-monitor/" },
                    { label: "Mouse Monitor", link: "/api/system-api/system-monitors/mouse-monitor/" },
                    { label: "Disk Monitor", link: "/api/system-api/system-monitors/disk-monitor/" },
                  ],
                },
                { label: "Environment Variables", link: "/api/system-api/environment-variables/" },
                { label: "Hotkey Management", link: "/api/system-api/hotkey-management/" },
                { label: "Timers", link: "/api/system-api/timers/" },
                { label: "Display Metrics", link: "/api/system-api/display-metrics/" },
                { label: "Execute Command", link: "/api/system-api/execute-command/" },
                { label: "Addon API", link: "/api/system-api/addon-api/" },
                { label: "JSON API", link: "/api/system-api/json-api/" },
                { label: "Web Fetch API", link: "/api/system-api/web-fetch/" },
                { label: "Audio API", link: "/api/system-api/audio-api/" },
                { label: "Registry API", link: "/api/system-api/registry-api/" },
                { label: "Clipboard API", link: "/api/system-api/clipboard-api/" },
                { label: "Power API", link: "/api/system-api/power-api/" },
              ],
            },
          {
            label:"Include",link: "/api/include/",
          },
          {
            label:"Path Api",link: "/api/path-api/",
          },
          {
            label:"Global Variables",link: "/api/global-variables/",
          },
          ],
        },
        {
          label: "Developers",
          items: [
            {
              label: "API Reference",
              items: [
                { label: "Addon API (Native)", link: "/developers/api/addon-api/" },
              ],
            },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "CLI Commands", link: "/guides/cli-commands/" },
            { label: "Colors", link: "/guides/colors/" },
            { label: "Script Types", link: "/guides/script-types/" },
            { label: "Color Matrix Guide", link: "/guides/color-matrix-guide/" },
            { label: "Transform Matrix Guide", link: "/guides/transform-matrix-guide/" },
          ],
        },
        { label: "Changelog", link: "/changelog/" },
      ],
      plugins: [
        starlightScrollToTop({
          // Use smooth scrolling
          smoothScroll: true,
          // Visibility threshold (show after scrolling 20% down)
          threshold: 20,
          svgStrokeWidth: 1,
          borderRadius: "50",
          // Show scroll progress ring
          showProgressRing: true,
          // Customize progress ring color
          progressRingColor: "#B3C7FF",
          // Control homepage visibility
          showOnHomepage: false,
        }),
        starlightChangelogs()
      ],
    }),
  ],
});
