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
		config(md) {
			const defaultCodeInline = md.renderer.rules.code_inline!
			md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
				tokens[idx].attrSet('v-pre', '')
				return defaultCodeInline(tokens, idx, options, env, self)
			}
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

		socialLinks: [{ icon: 'github', link: 'https://github.com/jk258/notes' }],
	},
})
