import fs from 'fs'
import path from 'path'
import { DefaultTheme, } from 'vitepress'

function generateSidenav(dir: string) {
	// console.log(path.join(__dirname, `../${dir}`))

	const navDir = fs.readdirSync(path.join(__dirname, `../${dir}`))
	return navDir.reduce((pre, item) => {
		const url = path.join(__dirname, `../${dir}/${item}`)
		const isDirectory = fs.statSync(url).isDirectory()
    
		if (isDirectory) {
			const sideDir = fs.readdirSync(url)
			pre.push({
				text: item,
				collapsible: true,
				items: sideDir.reduce((pre, side) => {
					const text = side.split('.md')[0]
					if (side.lastIndexOf('.md') > 0) {
						pre.push({ text: text, link: `${dir}/${item}/${text}` })
					}
					return pre
				}, [] as DefaultTheme.SidebarItem[]),
			})
		} else {
			const text = item.split('.md')[0]
			let sideBar = pre.find((item) => item.text == dir)
			if (!sideBar) {
				sideBar = { text: dir, collapsible: true, items: [] }
				pre.push(sideBar)
			}
			sideBar.items.push({ text: text, link: `${dir}/${text}` })
		}
		return pre
	}, [] as DefaultTheme.SidebarGroup[])
}

export function getNavSidebar() {
	const docsDirs = fs.readdirSync(path.join(__dirname, '../'))
	return docsDirs.reduce(
		(pre, item) => {
			if (item !== '.vitepress' && item.lastIndexOf('.md') < 0) {
				pre.sidebar[`/${item}/` as string] = generateSidenav(item)
				pre.nav.push({
					text: item,
					link: pre.sidebar[`/${item}/`][0].items[0].link!,
					activeMatch: '/' + item,
				})
			}
			return pre
		},
		{
			sidebar: {},
			nav: [],
		} as {
			sidebar: DefaultTheme.SidebarMulti
			nav: DefaultTheme.NavItem[]
		},
	)
}
