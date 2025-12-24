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
					label: 'Examples',
					items: [
						{ label: 'Simple Example', link: '/simple/' },
						{ label: 'Main Example', link: '/main/' },
						{ label: 'Full Example', link: '/full-example/' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Widget Options', link: '/widget-options/' },
						{ label: 'Content Elements', link: '/content-elements/' },
						{ label: 'System Monitoring', link: '/system-monitoring/' },
						{ label: 'Novadesk API', link: '/novadesk-api/' },
						{ label: 'Configuration', link: '/configuration/' },
						{ label: 'Troubleshooting', link: '/troubleshooting/' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'API Reference', link: '/reference/' },
					],
				},
			],
		}),
	],
});