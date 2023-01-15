import { defineConfig } from 'vitepress'
// import nav from './nav'
// import sidebar from './sidebar'
import { getNavSidebar } from './utils'
const { nav, sidebar }=getNavSidebar()

export default defineConfig({
	title: 'notes',
	base: '/notes/',
	head: [['meta', { name: 'theme-color', content: '#3c8772' }]],
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
		socialLinks: [{ icon: 'github', link: 'https://github.com/jk258/notes' }],
	},
})
