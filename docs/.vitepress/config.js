import { defineConfig } from 'vitepress'

export default defineConfig({
	title: 'notes',
	base: '/notes/',
	head: [['meta', { name: 'theme-color', content: '#3c8772' }]],
	markdown: {
		lineNumbers: true,
		headers: {
			level: [2, 3, 4],
		},
    toc: {
      includeLevel: [1, 2]
    },
	},
	themeConfig: {
		nav: [],
		cleanUrls: 'without-subfolders',
		sidebar: sidebarGuide(),
		socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
	},
})

function sidebarGuide() {
	return [
		{
			text: 'vue',
			collapsible: true,
			items: [
				{
					text: '开始',
					link: '/vue/开始',
				},
				{
					text: 'vue2和vue3的区别',
					link: '/vue/vue2和vue3的区别',
				},
			],
		},
		{
			text: 'react',
			collapsible: true,
			items: [{ text: 'vite+react项目', link: '/react/vite+react项目' }],
		},

		{
			text: 'js相关',
			collapsible: true,
			items: [
				{ text: 'js api', link: '/js相关/js api' },
				{ text: 'promise', link: '/js相关/promise' },
				{ text: 'proxy', link: '/js相关/Proxy' },
			],
		},
		{
			text: 'ts相关',
			collapsible: true,
			items: [
				{
					text: 'typescript',
					link: '/ts相关/TypeScript',
				},
			],
		},
		{
			text: 'css相关',
			collapsible: true,
			items: [{ text: 'css属性', link: '/css相关/css属性' }],
		},
		{
			text: 'node',
			collapsible: true,
			items: [{ text: 'nestjs', link: '/node/nestjs' }],
		},
		{
			text: '构建工具',
			collapsible: true,
			items: [
				{ text: 'vite', link: '/构建工具/index' },
				{ text: 'webpack', link: '/构建工具/webpack5.74.0' },
				{ text: 'rullop', link: '/构建工具/rollup' },
			],
		},
		{
			text: '其他',
			collapsible: true,
			items: [
				{ text: '问题', link: '其他/问题' },
				{ text: '面试题', link: '其他/面试题' }
			],
		},
	]
}
