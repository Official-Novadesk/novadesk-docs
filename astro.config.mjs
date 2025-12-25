// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import markdoc from "@astrojs/markdoc";
import starlightScrollToTop from "starlight-scroll-to-top";

// https://astro.build/config
export default defineConfig({
  integrations: [
    markdoc(),
    starlight({
      title: "Novadesk Documentation",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Novadesk/Novadesk",
        },
      ],
      sidebar: [
        { label: "Home", link: "/" },
        { label: "Getting Started", link: "/getting-started/" },
        {
          label: "Introduction",
          items: [
            { label: "Overview", link: "/" },
            { label: "Getting Started", link: "/getting-started/" },
            { label: "Installation", link: "/installation/" },
          ],
        },
        {
          label: "API Reference",
          items: [
            {
              label: "Widget API",
              items: [
                { label: "widgetWindow()", link: "/api/widget-window/" },
                { label: "Widget Methods", link: "/api/widget-methods/" },
              ],
            },
            {
              label: "Novadesk Object",
              items: [
                { label: "Logging", link: "/api/logging/" },
                { label: "System Utilities", link: "/api/system-utilities/" },
                { label: "Environment Variables", link: "/api/environment/" },
                { label: "Path Utilities", link: "/api/paths/" },
                { label: "Hotkey Management", link: "/api/hotkeys/" },
                { label: "Timers", link: "/api/timers/" },
                {
                  label: "Display Metrics",
                  link: "/api/display-metrics/",
                },
                {
                  label: "Configuration Directives",
                  link: "/api/configuration/",
                },
              ],
            },
            {
              label: "UI Elements API",
              items: [
                {
                  label: "General Options",
                  link: "/api/general-elements-options/",
                },
                { label: "Text Element", link: "/api/text-element/" },
                { label: "Image Element", link: "/api/image-element/" },
              ],
            },
            {
              label: "System Monitors",
              items: [
                { label: "CPU Monitor", link: "/api/cpu-monitor/" },
                { label: "Memory Monitor", link: "/api/memory-monitor/" },
                { label: "Network Monitor", link: "/api/network-monitor/" },
                { label: "Mouse Monitor", link: "/api/mouse-monitor/" },
                { label: "Disk Monitor", link: "/api/disk-monitor/" },
              ],
            },
          ],
        },
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
      ],
    }),
  ],
});
