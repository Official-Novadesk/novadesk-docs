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
      title: "Novadesk Docs",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Novadesk/Novadesk",
        },
      ],
      sidebar: [
        { label: "Home", link: "/" },
        {
          label: "Introduction",
          items: [
            { label: "Getting Started", link: "/getting-started/" },
            { label: "Installation", link: "/installation/" },
          ],
        },
        {
          label: "API Reference",
          items: [
            {
              label: "Novadesk Object",
              items: [
                { label: "Logging", link: "/api/novadesk-object/logging/" },
                {
                  label: "Settings",
                  link: "/api/novadesk-object/settings/",
                },
                { label: "Utility Methods", link: "/api/novadesk-object/utility-methods/" }
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
                { label: "Bar Element", link: "/api/ui-elements-api/bar-element/" },
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
            { label: "App API", link: "/api/app-api/" },
            { label: "Path API", link: "/api/path-api/" },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "CLI Commands", link: "/guides/cli-commands/" },
            { label: "Colors", link: "/guides/colors/" },
            { label: "Script Types", link: "/guides/script-types/" },
            { label: "Script Environment", link: "/guides/script-environment/" },
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
