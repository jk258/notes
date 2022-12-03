/**
 * 生态
 */
function sidebarEcology() {
  return [
		{
			text: 'electron',
			collapsible: true,
			items: [
				{ text: '开始', link: '/生态/electron/开始' },
				{ text: '问题', link: '/生态/electron/问题' },
			],
		},
		{
			text: 'vue',
			collapsible: true,
			items: [
				{
					text: '开始',
					link: '/生态/vue/开始',
				},
				{
					text: 'vue2和vue3的区别',
					link: '/生态/vue/vue2和vue3的区别',
				},
				{
					text: 'vue3使用工具',
					link: '/生态/vue/vue3使用工具',
				},
			],
		},
		{
			text: 'react',
			collapsible: true,
			items: [{ text: 'vite+react项目', link: '/生态/react/vite+react项目' }],
		},

		{
			text: 'three',
			collapsible: true,
			items: [{ text: '起步', link: '/生态/three/index' }],
		},
		{
			text: 'nestjs',
			collapsible: true,
			items: [{ text: 'nestjs', link: '/生态/nestjs/nestjs' }],
		},
	]
}
/**
 * 原生
 */
function sidebarOriginal() {
	return [
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
					link: '/原生/ts相关/TypeScript',
				},
			],
		},
		{
			text: 'css相关',
			collapsible: true,
			items: [{ text: 'css属性', link: '/原生/css相关/css属性' }],
		},
		{
			text: 'node',
			collapsible: true,
			items: [],
		},
	]
}
/**
 *构建工具 
 */
function sidebarBuildTool() {
	return [
		{
			text: '构建工具',
			collapsible: true,
			items: [
				{ text: 'vite', link: '/构建工具/vite' },
				{ text: 'webpack', link: '/构建工具/webpack5.74.0' },
				{ text: 'rullop', link: '/构建工具/rollup' },
			],
		},
	]
}
/**
 * 其他 
 */
function sidebarOther() {
	return [
		{
			text: '其他',
			collapsible: true,
			items: [
				{ text: '插件', link: '其他/插件' },
				{ text: '问题', link: '其他/问题' },
				{ text: '面试题', link: '其他/面试题' },
				{ text: 'js手写题', link: '其他/js手写题' },
			],
		},
	]
}
export default function sidebar() {
	return {
		'/生态/': sidebarEcology(),
		'/原生/': sidebarOriginal(),
		'/构建工具/': sidebarBuildTool(),
		'/其他/': sidebarOther(),
	}
}
