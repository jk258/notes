import { DefaultTheme } from 'vitepress'
import fs from 'fs'
import path from 'path'

const rootPath = path.join(__dirname, '../')

/**
 * 判断是否为文件夹
 * @param {string} url
 * @returns true|false
 */
function isDirectory(url: string) {
	const stat = fs.lstatSync(url)
	return stat.isDirectory()
}
function sidebarFilter(moduleName: string) {
	return moduleName.endsWith('.json') || moduleName.includes('images') || moduleName.includes('image') || moduleName.includes('assets')
}
/**
 * 生成二级sidebar
 * @param sidePath
 * @param curPath
 * @returns
 */
function getSidebarItem(sidePath: string, curPath: string) {
	const sidebarPath = path.join(sidePath, curPath)
	if (isDirectory(sidebarPath)) {
		const files = fs.readdirSync(sidebarPath)
		return {
			text: curPath.replace(/^[\d\.-]+/, ''),
			collapsed: true,
			items: files.reduce((pre, file) => {
				if (!sidebarFilter(file)) {
					const items = getSidebarItem(sidebarPath, file)
					if (items) {
						pre.push(items)
					}
				}
				return pre
			}, [] as DefaultTheme.SidebarItem[]),
		}
	} else {
		if (!sidebarFilter(curPath)) {
			return {
				text: curPath.replace(/^[\d\.-]+/, '').replace(/\.md$/g, ''),
				link: `${sidePath.replace(/[\\\\]/g, '/').split('/docs/')[1]}/${curPath.replace(/\.md/g, '')}`,
			}
		}
	}
}
/**
 * 生成sidebar
 * @param navDirs
 * @returns
 */
function getSidebar(navDirs: string[]) {
	return navDirs.reduce((preSidebar, navdir) => {
		const sidePath = path.join(rootPath, navdir)
		const sidebarItems = fs.readdirSync(sidePath).reduce((pre, item) => {
			const sidebarItem = getSidebarItem(sidePath, item)
			if (sidebarItem) {
				pre.push(sidebarItem)
			}
			return pre
		}, [] as DefaultTheme.SidebarItem[])
		preSidebar[navdir] = sidebarItems
		return preSidebar
	}, {} as DefaultTheme.Sidebar)
}
function flatFirst(arr: DefaultTheme.SidebarItem[]) {
	if (Array.isArray(arr) && arr.length > 0 && arr[0].items) {
		return flatFirst(arr[0].items)
	} else {
		return arr[0].link || ''
	}
}
export function navSidebar() {
	const navDirs = fs.readdirSync(rootPath).filter((i) => i != '.vitepress' && i != 'public' && isDirectory(path.join(rootPath, i)))
	const sidebar = getSidebar(navDirs)

	const nav = Object.keys(sidebar).map((i) => ({ text: i, link: flatFirst(sidebar[i]) }))

	return { sidebar, nav }
}
