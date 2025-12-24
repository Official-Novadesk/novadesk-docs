// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
	integrations: [
		markdoc(),
		starlight({
			title: 'Novadesk Documentation',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/Novadesk/Novadesk' }
			],
			sidebar: [
				{ label: 'Home', link: '/' },
				{ label: 'Getting Started', link: '/getting-started/' },
				{
					label: 'Widget Window',
					items: [
						{ label: 'Widget Options', link: '/widget-window/widget-options/' },
					],
				},
				{
					label: 'Elements',
					items: [
						{ label: 'General Options', link: '/elements/general-options/' },
						{ label: 'Text Elements', link: '/elements/text/' },
						{ label: 'Image Elements', link: '/elements/image/' },
					],
				},
				{
					label: 'System Monitor',
					items: [
						{ label: 'CPU Monitor', link: '/system-monitor/cpu/' },
						{ label: 'Memory Monitor', link: '/system-monitor/memory/' },
						{ label: 'Network Monitor', link: '/system-monitor/network/' },
						{ label: 'Mouse Monitor', link: '/system-monitor/mouse/' },
						{ label: 'Disk Monitor', link: '/system-monitor/disk/' },
					],
				},
			],
		}),
	],
});