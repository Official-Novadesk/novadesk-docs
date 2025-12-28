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
                { label: "widgetWindow()", link: "/api/widget-api/widget-window/" },
                { label: "Widget Methods", link: "/api/widget-api/widget-methods/" },
              ],
            },
            {
              label: "Novadesk Object",
              items: [
                { label: "Logging", link: "/api/novadesk-object/logging/" },
                { label: "Path Methods", link: "/api/novadesk-object/path-methods/" },
                {
                  label: "Configuration Directives",
                  link: "/api/novadesk-object/configuration-directives/",
                },
              ],
            },
            {
              label: "UI Elements API",
              items: [
                {
                  label: "General Options",
                  link: "/api/ui-elements-api/general-elements-options/",
                },
                { label: "Text Element", link: "/api/ui-elements-api/text-element/" },
                { label: "Image Element", link: "/api/ui-elements-api/image-element/" },
              ],
            },
            {
              label: "System Monitors",
              items: [
                { label: "CPU Monitor", link: "/api/system-monitors/cpu-monitor/" },
                { label: "Memory Monitor", link: "/api/system-monitors/memory-monitor/" },
                { label: "Network Monitor", link: "/api/system-monitors/network-monitor/" },
                { label: "Mouse Monitor", link: "/api/system-monitors/mouse-monitor/" },
                { label: "Disk Monitor", link: "/api/system-monitors/disk-monitor/" },
              ],
            },
            {
              label: "System API",
              items: [
                { label: "Environment Variables", link: "/api/system-api/environment-variables/" },
                { label: "Hotkey Management", link: "/api/system-api/hotkey-management/" },
                { label: "Timers", link: "/api/system-api/timers/" },
                { label: "Display Metrics", link: "/api/system-api/display-metrics/" },
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
