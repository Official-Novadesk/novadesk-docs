import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'introduction/getting-started',
        'introduction/installation',
        'introduction/creating-first-widget',
      ],
    },
    {
      type: 'category',
      label: 'API',
      items: [
        {
          type: 'category',
          label: 'Widget API',
          items: [
            'api/widget-api/widget-window',
            'api/widget-api/widget-methods',
          ],
        },
        {
          type: 'category',
          label: 'UI Elements API',
          items: [
            'api/ui-elements-api/general-elements-options',
            'api/ui-elements-api/text-element',
            'api/ui-elements-api/image-element',
            'api/ui-elements-api/bar-element',
          ],
        },
        {
          type: 'category',
          label: 'System API',
          items: [
            'api/system-api/environment-variables',
            'api/system-api/execute-command',
            'api/system-api/display-metrics',
            'api/system-api/hotkey-management',
            'api/system-api/timers',
            'api/system-api/web-fetch',
            'api/system-api/json-api',
            'api/system-api/registry-api',
            'api/system-api/clipboard-api',
            'api/system-api/power-api',
            'api/system-api/audio-api',
            'api/system-api/addon-api',
            {
              type: 'category',
              label: 'System Monitors',
              items: [
                'api/system-api/system-monitors/cpu-monitor',
                'api/system-api/system-monitors/memory-monitor',
                'api/system-api/system-monitors/disk-monitor',
                'api/system-api/system-monitors/network-monitor',
                'api/system-api/system-monitors/mouse-monitor',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Console',
          items: ['api/console/logging'],
        },
        {
          type: 'category',
          label: 'App Object',
          items: [
            'api/app-object/utility-methods',
            'api/app-object/settings',
            'api/app-object/tray-api',
          ],
        },
        'api/global-variables',
        'api/include',
        'api/path-api',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/script-types',
        'guides/cli-commands',
        'guides/colors',
        'guides/color-matrix-guide',
        'guides/transform-matrix-guide',
      ],
    },
    {
      type: 'category',
      label: 'Developers',
      items: ['developers/api/addon-api'],
    },
    'changelog',
  ],
};

export default sidebars;
