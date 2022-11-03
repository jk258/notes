# vite

## 依赖预约构建

受限 vite 会找到对应的依赖，然后调用**esbuild**(对 js 语法进行处理的一个库)，将其他规范的代码转换成**esmodule**规范，然后放到当前目录下的`node_modules/.vite/deps`，同时对**esmodule**规范的各个模块进行统一集成

> 解决的问题：

1. 不同的第三方包会有不同的导出格式(这个是 vite 没法约束人家的事情)
2. 对路径的处理上可以直接使用`.vite/deps`,方便路径重写
3. 网络夺宝传输的性能问题(也是原生**esmodule**规范不敢支持`node_modules`的原因之一)，有了依赖预构建以后无论有多少的额外`export`和`import`,vite 都会尽可能的将他们进行集成最后只生成一个或几个模块

## 在 vite 中处理 css

`vite`天生就支持对`css`文件的直接处理

1. `vite`在读取到`main.js`中引用到了`index.css`
2. 直接使用`fs`模块去读取`index.css`中文件内容
3. 直接创建一个`style`标签，将`index.css`中文件内容直接 copy 进`style`标签里
4. 将`style`标签插入到`index.html`的`head`中
5. 将该 css 文件中的内容直接替换为 js 脚本(方便热更新或者 css 模块化),同时设置`Content-Type`为 js 从而让浏览器以 js 脚本的形式来执行该 css 后缀的文件
   ::: warning Tip
   `cssmodule`解决样式被覆盖(因为类名重复)
   :::

### `vite.config.js`中 css 配置(cssmodule)

- `localsConvention`:修改生成的配置对象的 key 的展示形式(驼峰还是中划线形式)
- `scopeBehaviour`:配置当前的模块化行为是模块化还是全局化(有 hash 就是开启了模块化的一个标志，因为他可以保证产生不同的 hash 值来控制样式类名不被覆盖)
- `generateScopedName`:生成的类名规则(函数或字符串)
- `hashPrefix`:生成 hash 会根据类名+一些其他的字符串(文件名+内部随机生成一个字符串)进行生成,如果想要生成 hash 更加独特一点,可以配置`hashPrefix`,配置的这个字符串会参与到最终 hash 生成(hash:只要字符串有一个字不一样，那么生成的 hash 就完全不一样,但是只要字符串完全一样,生成的 hash 就会一样)
- `globalModulePaths`:代表不想参与到 css 模块化的路径
  vite.config.js

```javascript{4-14}
import { defineConfig } from "vite";
export default defineConfig({
  css: {//对css的行为进行配置
    modules: {
      localsConvention: 'camelCaseOnly',
      scopeBehaviour: 'local',
      generateScopedName:'[name]-[local]-[hash:5]',
      // generateScopedName: (name, fileName, css) => {
      //   console.log(name, fileName, css);
      //   return name+Math.random().toString().replace('.','')
      // }
      hashPrefix: 'hello',
      globalModulePaths:[]
    }
  }
})
```

### css 预处理(sacc/less)

```javascript{4-12}
import { defineConfig } from "vite";
export default defineConfig({
  css: {
    preprocessorOptions: {//css预处理
      less: {
        math: 'always',
        globalVars: {
          mainColor: 'red'
        }
      }
    },
    devSourcemap:true//css sourcemap ，索引文件
  }
})
```

### postcss

postcss.config.js

```javascript
import postcssPresetEnv from 'postcss-preset-env' //postcss预设
import { fileURLToPath, URL } from 'node:url'

export default {
	plugins: [
		postcssPresetEnv({
			importFrom: fileURLToPath(new URL('./src/common.css', import.meta.url)),
		}),
	],
}
```

## vite 加载静态资源

vite.config.js

```javascript{2,6-8}
import { defineConfig } from "vite";
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
```

## build

vite.config.js

```javascript{4-13}
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {//配置rollup的一些构建策略
      output: {//控制输出
        assetFileNames:'[hash].[name].[ext]'
      }
    },
    assetsInlineLimit: 4094000,//4000kb
    outDir: 'dist',
    assetsDir:'static'
  }
})

```

## [vite 插件](https://cn.vitejs.dev/guide/api-plugin.html#vite-specific-hooks)

整个插件就是在 vite 的生命周期的不同阶段去做不同的事情(就是抢在 vite 执行配置文件之前去改写配置文件)<br>
通过`vite.config.js`返回出去的配置对象以及在插件的`config`生命周期中返回的对象都不是最终的配置对象,vite 会把这几个配置对象进行合并<br>

1. [config](#config-新建plugins-vitealiases-js)
2. [transformIndexHtml](#transformindexhtml-新建plugins-createhtmlplugin-js)
3. [configureServer](#configureserver-新建plugins-vitepluginmock-js)

### 手写 plugins

### `config`:新建`plugins/ViteAliases.js`

```javascript{32-48}
import fs from 'fs'
import path, { dirname } from 'path'

function diffDirAndFile(dirs = [], basePath = '') {
	const result = {
		dirs: [],
		files: [],
	}
	dirs.forEach((name) => {
		const currentFileStat = fs.statSync(path.resolve(__dirname, basePath + '/' + name))
		if (currentFileStat.isDirectory()) {
			result.dirs.push(name)
		} else {
			result.files.push(name)
		}
	})
	return result
}

function getTotalSrcDir() {
	const result = fs.readdirSync(path.resolve(__dirname, '../src'))
	const diffResult = diffDirAndFile(result, '../src')
	const resolveAliasesObj = {}
	diffResult.dirs.forEach((dirname) => {
		const key = `@${dirname}`
		const absPath = path.resolve(__dirname, '../src/' + dirname)
		resolveAliasesObj[key] = absPath
	})
	return resolveAliasesObj
}

export default () => {
	return {
		config(config, env) {
			// config:目前的一个配置对象
			// env:mode(string),command(string)
			// config函数可以返回一个对象，这个对象是部分的viteconfig配置(要修改的部分)
			return {
				resolve: {
					alias: {
						'@': path.resolve(__dirname, '../src'),
						...getTotalSrcDir(),
					},
				},
			}
		},
	}
}
```

在`vite.config.js`使用

```javascript{2,5}
import { defineConfig } from "vite";
import ViteAliases from "./plugins/ViteAliases";

export default defineConfig({
  plugins:[ViteAliases()],
})
```

### `transformIndexHtml`:新建`plugins/CreateHtmlPlugin.js`

```javascript
export default (options) => {
	return {
		transformIndexHtml: {
			enforce: 'pre',
			transform: (html, ctx) => {
				return html.replace(/<%= title %>/g, options.inject.data.title)
			},
		},
	}
}
```

在`vite.config.js`使用

```javascript{2,5}
import { defineConfig } from "vite";
import ViteAliases from "./plugins/ViteAliases";

export default defineConfig({
  plugins:[
    CreateHtmlPugin({
			inject: {
				data: {
					title: '测试',
				},
			},
		}),
  ],
})
```

### `configureServer`:新建`plugins/VitePluginMock.js`

```javascript
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
async function mockResult() {
	const mockStat = fs.statSync('mock')
	const isDirectory = mockStat.isDirectory()
	if (isDirectory) {
		const mockUrl = path.resolve(process.cwd(), 'mock/index.js')
		const result = await import(pathToFileURL(mockUrl).toString()).then((res) => res.default)
		return result
	}
}
export default () => {
	return {
		async configureServer(server) {
			const mockResults = await mockResult()
			server.middlewares.use((req, res, next) => {
				if (req.url == '/api/users') {
					const mockItem = mockResults.find((mockItem) => mockItem.url === req.url)
					if (mockItem) {
						const resData = mockItem.response(req)
						res.end(JSON.stringify(resData))
					}
				} else {
					next()
				}
			})
		},
	}
}
```

同上在`vite.config.js`使用

## [typescript](https://vitejs.dev/guide/features.html#typescript)

### 准确提示

- 开发在页面展示 ts 报错提示<br>
  安装`vite-plugin-checker`插件(`npm i vite-plugin-checker -D`)，在`vite.config.ts`引入使用

```ts{2,4}
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
export default defineConfig({
	plugins: [checker({ typescript: true })],
})
```

- build 是提示报错

在 npm 中运行`tsc --noEmit`(vue 为`vue-tsc --noEmit`)，如下`package.json`

```json{3}
"scripts": {
  "dev": "vite dev",
  "build": "tsc --noEmit && vite build",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```
### 配置环境变量提示
新建`env.d.ts`
```ts
//三斜线指令
/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_PROXY_URL: string
}
```
