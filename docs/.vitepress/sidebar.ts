import fs from 'fs'
import path from 'path'
import { DefaultTheme } from 'vitepress'
import nav from './nav'

function generateSidenav(dir: string) {
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

export const sidebar = nav.reduce((pre, item) => {
	pre[item.text as string] = generateSidenav(item.text)
	return pre
}, {} as DefaultTheme.SidebarMulti)
