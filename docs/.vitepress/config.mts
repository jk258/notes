import { defineConfig } from 'vitepress'
import { navSidebar } from './navSidebar'
const {nav,sidebar} = navSidebar()

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: '即墨',
	description: 'note',
	markdown: {
		lineNumbers: true,
		headers: {
			level: [2, 3, 4],
		},
	},
	themeConfig: {
		nav: nav,
		sidebar: sidebar,
		outline: [2, 6],
		editLink: {
			pattern: 'https://github.com/jk258/notes/blob/main/docs/:path',
			text: 'Edit this page on GitHub',
		},
		search: {
			provider: 'local',
		},

		socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
	},
})
