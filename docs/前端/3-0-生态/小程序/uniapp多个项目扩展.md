# uniapp多个项目扩展

在开发 web 网站或小程序时，我们可能会把一套代码发布多个站点，比如：不同主题发布不同版本  
在 uniapp 中，我们可以通过在`package.json`文件中增加 uni-app 扩展节点，可实现自定义条件编译平台。  
以下是一个小程序扩展的示例，首先在`package.json`中扩展配置：

```json
{
	"industrySDK": true,
	"uni-app": {
		"scripts": {
			"custom_weixin": {
				"title": "自定义扩展名称",
				"env": {
					//环境变量
					"UNI_PLATFORM": "mp-weixin",
					"MY_PLATFORM": "custom_weixin"
				},
				"define": {
					"CUSTOM_WEIXIN": true ////自定义条件编译常量，建议为大写
				}
			}
		}
	}
}
```

- `UNI_PLATFORM`仅支持填写 uni-app 默认支持的基准平台，如下：h5、mp-weixin、mp-alipay、mp-baidu、mp-toutiao、mp-qq
- package.json 文件中不允许出现注释，否则扩展配置无效
- 推荐`MY_PLATFORM`的值和`define`以及`scripts`中的`key`值一致，便于识别。`define`中的值大写

然后新建`lib/env.js`文件，在其中添加一些我们需要的配置，其中`key`值和`package.json`中`scripts`的`key`值一致,如下：

```js
module.exports={
	...
	custom_weixin:{
		//在这里添加自定义配置，如appid等
    appid:''
	},
	...
}
```

新建`vite.config.js`(vue2 是`vue.config.js`)，根据`env.js`中的配置来修改`manifest.json`,

```js
// 读取 manifest.json ，修改后重新写入
import path from 'path'
import fs from 'fs-extra'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import envObj from './lib/env.js'

function replaceManifest(path, value, data) {
	const arr = path.split('.')
	const len = arr.length
	const lastItem = arr[len - 1]

	let i = 0
	let ManifestArr = data.split(/\n/)

	for (let index = 0; index < ManifestArr.length; index++) {
		const item = ManifestArr[index]
		if (new RegExp(`"${arr[i]}"`).test(item)) ++i
		if (i === len) {
			const hasComma = /,/.test(item)
			ManifestArr[index] = item.replace(new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`), `"${lastItem}": ${value}${hasComma ? ',' : ''}`)
			break
		}
	}

	return ManifestArr.join('\n')
}

const uniPlatform = process.env.UNI_PLATFORM
const myPlatform = process.env.UNI_SCRIPT

const manifestPath = path.join(__dirname, './manifest.json')
let Manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' })

if (uniPlatform == 'mp-kuaishou') {
	//快手
	Manifest = replaceManifest('mp-kuaishou.appid', `"${envObj[myPlatform].appid}"`, Manifest)
}
if (uniPlatform == 'mp-toutiao') {
	//抖音
	Manifest = replaceManifest('mp-toutiao.appid', `"${envObj[myPlatform].appid}"`, Manifest)
}
if (uniPlatform == 'mp-weixin') {
	//微信
	Manifest = replaceManifest('mp-weixin.appid', `"${envObj[myPlatform].appid}"`, Manifest)
}
fs.writeFileSync(manifestPath, Manifest, {
	flag: 'w',
})

const pagesPath = path.join(__dirname, './pages.json')
let pages = fs.readFileSync(pagesPath, { encoding: 'utf-8' })
pages = replaceManifest('globalStyle.navigationBarTitleText', `"${envObj[myPlatform].title}"` || '超燃星球', pages)
fs.writeFileSync(pagesPath, pages, {
	flag: 'w',
})

export default defineConfig({
	plugins: [uni()],
})
```

在项目中可以通过`process.env.MY_PLATFORM`来获取当前扩展的名称，然后根据名称来获取对应的配置，如下：

```js
import envObj from './lib/env.js'
const platform = process.env.MY_PLATFORM
const config = envObj[platform]
```

也可以通过 uniapp 语法来判断

```js
// #ifdef CUSTOM_WEIXIN
  ...
// #endif
```

最后在运行中，找到对应的“自定义扩展名称”(`title`)点击运行即可。

> [uniapp 文档](https://uniapp.dcloud.net.cn/collocation/package.html)
