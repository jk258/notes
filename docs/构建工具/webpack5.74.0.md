# [基本安装](https://webpack.docschina.org/guides/getting-started/)

首先创建一个目录，初始化`npm`,然后安装`webpck-cli`

```json
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

创建目录、文件和内容

```json
 webpack-demo
  |- package.json
  |- package-lock.json
	|- index.html
  |- /src
    |- index.js
```

`src/index.js`

```js
import { join } from 'lodash'
function component() {
	const element = document.createElement('div')
	element.innerHTML = join(['Hello', 'world'], '')
	return element
}
document.body.appendChild(component())
```

# webpack 配置核心概念

- chunk：指代码块，一个 chunk 可能有多个模块组合而成，也用于代码合并与分割（这里的合并分割主要指指纹策略的判断），指纹策略简单来说就是文件名后的 hash
- bundle：资源经过 webpack 流程解析编译后最终输出的成果未见（一个`.js`格式的文件，也就是 output 文件）
- entry：文件打包的入口，webpack 会根据 entry 递归的去寻找依赖，每个依赖都将被它处理，最后打包到集合文件中
- output：配置打包输出的位置、文件名等
- loader：默认情况下，webpack 仅支持 js 和 json 文件，通过 loader，可以让它解析其他类型的文件。理论上只要有相应的 loader，webpack 可以处理任何类型的文件
- plugin：loader 主要的职责是让 webpack 认识耿恭的文件类型，而 plugin 的职责是让其可以控制构建流程
- mode：目标环境，不同的目标环境会影响 webpack 打包时的决策
  - production：正式环境，打包压缩等一系列优化操作
  - development：开发环境，有利于热更新的处理，识别哪个模块变化
  - none：什么都不做，打包时会有提示警告

# 配置 webpack.config.js

## `webpack`默认配置：

```javascript
const path = require('path')
module.exports = {
	extry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, './dist'),
	},
}
```

## [加载 css](https://webpack.docschina.org/guides/asset-management/#loading-css)

添加 loader（`style-loader`、`css-loader`）

```javascript
npm install --save-dev style-loader css-loader
```

webpack.config.js

```javascript
const path = require('path')

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
}
```

注意：应保证 loader 的前后顺序：`style-loader`在前，`css-loader`在后，如果不遵守此约定，webpack 可能会抛出错误

## [加载 images 和 font 字体](https://webpack.docschina.org/guides/asset-management/#loading-images)

使用内置的`[Asset Moudles](https://webpack.docschina.org/guides/asset-modules/)`,可以轻松把图像混入系统中
webpack.config.js

```javascript
module.exports = {
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
}
```

现在

- 在`impoer MyImage from './my-image.png'`时，此图像将被处理并添加到 output 目中
- css 中的`url('./my-image.png')`，也会识别这是本地文件，并替换问 output 目录中的最终路径
- 字体文件也可以通过`@font-face`声明将其混合，本地的`url(...)` 指令会被 webpack 获取处理（和处理图片一样）

## [加载数据](https://webpack.docschina.org/guides/asset-management/#loading-data)

此外，加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似 Nodejs，JSON 是内置的，但是要导入 CSV、TSV 和 XML，可以使用`[csv-loader](https://github.com/theplatapi/csv-loader)`和`[xml-loader](https://github.com/gisikw/xml-loader)`。

```javascript
npm install --save-dev csv-loader xml-loader
```

webpack.config.js

```javascript
module.exports = {
	module: {
		rules: [
			{
				test: /\.(csv|tsv)$/i,
				use: ['csv-loader'],
			},
			{
				test: /\.xml$/i,
				use: ['xml-loader'],
			},
		],
	},
}
```

# [管理输出](https://webpack.docschina.org/guides/output-management/)

## 多入口

在 src 下新建`print.js`,编写一些逻辑并使用。然后调整配置，在 entry 添加`src/print.js`作为新的入口起点（print），然后修改 output，以便根据入口起点定义的名称，动态产生 bundle 名称

```javascript
const path = require('path')

module.exports = {
	entry: {
		index: './src/index.js',
		print: './src/print.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
}
```

## [设置 HtmlWebpackPlugin](https://webpack.docschina.org/guides/output-management/#setting-up-htmlwebpackplugin)

安装插件[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)，并调整`webpack.config.js`文件

```javascript
npm install --save-dev html-webpack-plugin
```

webpack.config.js

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		index: './src/index.js',
		print: './src/print.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '管理输出',
		}),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
}
```

## 清理`/dist`文件夹

在每次构建前清理 dist 文件夹，这样只会生成用到的文件。配置`output.clean`实现

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		index: './src/index.js',
		print: './src/print.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Output Management',
		}),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
}
```

# [开发环境](https://webpack.docschina.org/guides/development/)

首先，`mode`设置为`development`

```javascript
module.exports = {
	mode: 'development',
}
```

## sourcemap

当 webpack 打包源代码时，很难定位到 error（错误）和 warning（警告）在代码中的原始位置，
这时，可以使用 sourcemap 功能，将编译后的代码映射回原始源代码中，这样，如否一个错误来自`b.js`,webpack 会明确的告知。

```javascript
module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
}
```

[更多可用选项](https://webpack.docschina.org/configuration/devtool)

## 自动编译

在每次编译代码时，每次都要`npm run build`会很麻烦
webpack 提供集中可选方式，在代码发生变化时自动编译代码

### wacth mode(观察模式)

观察所有文件的更改，有文件更改时，代码将重新编译。如 package.json

```javascript
{
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"watch": "webpack --watch",
		"build": "webpack"
	},
}
```

此时，运行`npm run watch`，并更改文件，会看到 webpack 自动编译修改后的模块
缺点：不会自动刷新浏览器

### webpack-dev-server（自动刷新浏览器）

`webpack-dev-server`提供一个基本的 web server。并且具有 live reloading（实时重新加载）

```javascript
npm install --save-dev webpack-dev-server
```

webpack.config.js

```javascript
module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
	},
}
```

以上配置告知 webpack-dev-server，将 dist 目录下的文件 serve 到 localhost:8080 下
:::info
Tip
如果有多个入口，需要添加`optimization.runtimeChunk: 'single'`配置。
:::
添加一个可以直接运行 dev server 的 script：
package.json

```javascript
{
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"watch": "webpack --watch",
		"start": "webpack serve --open",
		"build": "webpack"
	},
}
```

然后，运行`npm run start`，会看到浏览器自动加载页面，并且更改文件时，webpack 自动编译

### webpack-dev-middleware

`webpack-dev-middleware`是一个封装器（wrapper），它可以把 webpack 处理过的文件发送到一个 server。`webpack-dev-server`在内部使用了它，然而它也可以作为一个单独的 package 来使用，以便根据需求进行更多自定义配置。如下（webpack-dev-middleware 配合 express server）：
安装`express`和`webpack-dev-middleware`

```javascript
npm install --save-dev express webpack-dev-middleware
```

调整 webpack.config.js

```javascript
module.exports = {
	mode: 'development',
	entry: {
		index: './src/index.js',
	},
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
	},

	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		publicPath: '/',
	},
}
```

自定义`express`server。在根目录下创建`server.js`,内容如下

```javascript
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath,
	}),
)

// 将文件 serve 到 port 3000。
app.listen(3000, function () {
	console.log('Example app listening on port 3000!\n')
})
```

添加 npm script，package.json 如下

```javascript
{
	"scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "watch": "webpack --watch",
     "start": "webpack serve --open",
		 "server": "node server.js",
     "build": "webpack"
   },
}
```

然后运行`npm run server`

# 代码分离

## [防止重复](https://webpack.docschina.org/guides/code-splitting/#prevent-duplication)

配置`dependOn option`选项，可以在多个 chunk 之间共享模块
webpack.config.js

```javascript
const path = require('path')

module.exports = {
	mode: 'development',
	entry: {
		index: {
			import: './src/index.js',
			dependOn: 'shared',
		},
		another: {
			import: './src/another-module.js',
			dependOn: 'shared',
		},
		shared: 'lodash',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: {
		//如果在一个html页面上使用多个入口，需要设置
		runtimeChunk: 'single',
	},
}
```

### splitChunksPlugin

splitchunksPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新的 chunk。配置如下

```javascript
const path = require('path')

module.exports = {
	mode: 'development',
	entry: {
		index: './src/index.js',
		another: './src/another-module.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
}
```

[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin): 用于将 CSS 从主应用程序中分离

## 动态导入

涉及到动态代码拆分时，webpack 提供了两个类似的技术

- [ECMAScript 提案](https://github.com/tc39/proposal-dynamic-import)的`import()`语法，如下：

```javascript
function getComponent() {
	return import('lodash').then(({ default: _ }) => {
		const element = document.createElement('div')
		element.innerHTML = _.join(['Hello', 'webpack'], ' ')
		return element
	})
}
getComponent().then((component) => {
	document.body.appendChild(component)
})
```

- webpack 遗留功能`require.ensure`

## 预获取/预加载模块（prefetch/preload module）

- prefetch（预获取）：将来某些导航下可能需要的资源`import(/*webpackPrefetch:true*/ './path/to/LoginModal.js')`

  > 这会生成 <link rel="prefetch" href="login-modal-chunk.js"> 并追加到页面头部，指示着浏览器在闲置时间预取 login-modal-chunk.js 文件。

- preload（预加载）：当前导航下可能需要资源`import(/*wepackPreload:true*/ 'ChartingLibrary')`

## [缓存](https://webpack.docschina.org/guides/caching/)

## 输出文件的文件名（output filename）

替换`output.filename`中的[substitutions](https://webpack.docschina.org/configuration/output/#outputfilename) 设置，来定义文件的名称。webpack 提供了一种使用成为 substitution（可替换模板字符串）的方式，通过带括号字符串来模板化文件名。其中，`[contenthash]` substitution 将根据资源内容创建出唯一 hash。当资源内容发生变化时，`[contenthash]`也会变化

```javascript
const path = require('path')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
}
```

## 提取引导模板（extracting）

`optimization.runtimeChunk`选项将 runtime 代码拆分为一个单独的 chunk。将其设置为所有 chunk 创建一个 runtime bundle

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Caching',
		}),
	],
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	optimization: {
		runtimeChunk: 'single',
	},
}
```

将第三方库(library)（例如 lodash 或 react）提取到单独的`vendor chunk`文件中，是比较推荐的。它们很少像本地的源代码那样频繁修改。因此可以利用 client 的长效缓存机制，命中缓存来消除请求，减少向 server 获取资源，同时还能保证 client 代码和 server 代码版本一致。这可以通过 SplitChunksPlugin 插件的 cacheGroups 选项实现。如下：

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Caching',
		}),
	],
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
}
```

## [创建 library](https://webpack.docschina.org/guides/author-libraries/)

通过`output.library`配置项暴露从入口导出的内容
例如创建一个`webpackNumbers`的 library

```javascript
const path = require('path')

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'webpack-numbers.js',
		library: 'webpackNumbers',
	},
}
```

将入口起点公开为`webpackNumbers`，这样就可以通过 script 标签使用它：

```javascript
<script src="https://example.org/webpack-numbers.js"></script>
<script>
  window.webpackNumbers.wordToNum('Five');
</script>
```

这时候它只能通过 script 标签引用而发挥作用，不能运行在 commonjs、AMD、Node.js 等环境中
作为库作者，我们希望它能够兼容不同的环境，配置`output.library`，将 type 设置为 umd

```javascript
const path = require('path')

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'webpack-numbers.js',
		library: 'webpackNumbers',
		library: {
			name: 'webpackNumbers',
			type: 'umd',
		},
	},
}
```

外部化第三方库
如果在库里引入第三方库（lodash），会发现创建了一个体积相当大的文件（loadsh 也被打包其中），我们更倾向于把 lodash 当作`peerDependency`，就是说，使用者英爱已经安装过 lodash。因此，可以放弃控制此外部 library,将控制权让给使用 library 的用户，配置`externals`如下：

```javascript
const path = require('path')

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'webpack-numbers.js',
		library: {
			name: 'webpackNumbers',
			type: 'umd',
		},
	},
	externals: {
		lodash: {
			commonjs: 'lodash',
			commonjs2: 'lodash',
			amd: 'lodash',
			root: '_',
		},
	},
}
```

## [Tree shaking](https://webpack.docschina.org/guides/tree-shaking/)

tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码（dead-code）。它依赖于 ES2015 模块语法的静态结构特性，例如`import`和`export`。这个术语和概念实际上是由 ES2015 模块工具 rollup 普及起来的

## 启动 Tree Shaking

在 webpack5 中，Tree Shaking 在生产环境下会默认启动
配置`mode:"production"`后会启动`[ModuleConcatenationPlugin](https://webpack.docschina.org/plugins/module-concatenation-plugin)`

## usedExports

启动 webpack 的 Tree shaking 功能，需配置`potimization.usedExports`为 true
`usedExports`用于在 webpack 编译过程过启动标记功能，它会将每个模块中没有被使用的导出内容标记为`unused`，当生成产物时，被标记的变量对应的到处语句会被删除
当然，仅仅删除未使用变量的导出语句是不够的，若 webpack 配置启用了代码压缩工具，如 Terser 插件，在打包的最后会删除所有引用被标记北荣的代码语句，这些语句一般称作 DeadCode。
比如我们有一个`math.js`文件，内容如下：

```javascript
export function square(x) {
	return x * x
}
export function cube(x) {
	return x * x * x
}
```

在 index.js 引入`cube`并使用，然后 webpack.config.js 配置如下：

```javascript
const path = require('path')
const HtmlWekpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'none',
	entry: {
		index: './src/index.js',
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	devServer: {
		static: './dist',
	},
	plugins: [
		new HtmlWekpackPlugin({
			title: '管理输出',
		}),
	],
	optimization: {
		usedExports: true,
		minimize: true,
	},
}
```

然后运行`npm run build`,查看打包后的文件，`square`不会被打包进去

但是，并不是所有 Dead Code 都会被 Terser 删除。比如，我们在 math.js 中新增一条打印语句

```javascript
export function square(x) {
	return x * x
}
export function cube(x) {
	return x * x * x
}

console.log(1123)
```

打包以后`square`函数被删除了，但是打印语句还在，这是因为这条语句存在副作用
副作用（side effect）的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。例如 polyfill，他影响全局作用域，因而存在副作用
Terser 在执行 Tree Shaking 时，会保留存在副作用的代码，而不是将其删除，因为有副作用不代表有害，并且判断一串存在副作用的代码是否对项目“有害”是非常麻烦的，因此 Terser 选择将副作用保留
作用开发者，如果非常清楚某条语句会被判别有辅佐但其实是无害的，应该被删除，可以使用`/*#__PURE__*/`注释，来向 terser 传递信息，让 terser 删除

## sideEffects

与`/*#__PURE__*/`注释类似，`sideEffects`也可以标记不存在副作用的北荣，与前者不同的是，它作用于模块层面
`sideEffects`是`package.json`的一个字段，默认值为`true`。如果你非常清楚你的 package 是纯粹的，不包含副作用，那么可以简单地将该属性标记为`false`，来告知 webpack 可以安全删除未被使用代码（Dead Code）；如果你的 package 中有些模块确实有一些副作用，可以改为提供一个数据

```javascript
{
  "name": "your-project",
  "sideEffects": ["./src/some-side-effectful-file.js"]
}
```

参考文章：[https://juejin.cn/post/7105022295474700295](https://juejin.cn/post/7105022295474700295)

# 生产环境

development(开发环境)和 production(生产环境)这两个环境下的构建目标存在这巨大差异。由于要遵循逻辑分离，通常建议为每个环境编写彼此独立的 webpack 配置
以上，我们将生产环境和开发环境做了细微区分，但是，我们还是会遵循不重复原则，保留一个“common(通用)”配置。为了将这些配置合并在一起，将使用`webpack-merge`，此工具会引用“common”配置,安装

```javascript
npm install --save-dev webpack-merge
```

创建配置文件如下：

```javascript
webpack-demo
  |- package.json
  |- package-lock.json
  |- webpack.common.js
  |- webpack.dev.js
  |- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```

webpack.common.js

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		app: './src/index.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Production',
		}),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
}
```

webpack.dev.js

```javascript
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
	},
})
```

webpack.prod.js

```javascript
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	mode: 'production',
})
```

npm scripts

```javascript
{
	"scripts": {
     "start": "webpack serve --open --config webpack.dev.js",
     "build": "webpack --config webpack.prod.js"
    },
}
```

# [Shimming 预置依赖](https://webpack.docschina.org/guides/shimming/)

## shimming 预置全局变量

用`ProvidePlugin`插件把`lodash`改为全局变量依赖：

```javascript
const path = require('path')
const webpack = require('webpack')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new webpack.ProvidePlugin({
			_: 'lodash',
		}),
	],
}
```

> 本质就是告诉 webpack，如果遇到了至少一处用到`_`变量的模块实例，那请你将`lodash`引入进来，并将其提供给需要用到它的模块

同时，`ProvidePlugin`还可以暴露出某个模块中单个导出，通过配置一个“数组路径”（例如`[module,child,...children?]`）实现此功能，比如调用`lodash`中提供的`join`方法

```javascript
new webpack.ProvidePlugin({
	  join: ['lodash', 'join'],
}),
```

## 细粒度 shimming

一些遗留模块依赖的`zhis`指向的是`window`对象。当模块运行在 CommonJS 上下文中，这将会变成一个问题，就是说此时的`this`指向的是`module.exports`。这时，可以通过使用[imports-loader](https://webpack.docschina.org/loaders/imports-loader/)覆盖`this`指向：

```javascript
module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: require.resolve('./src/index.js'),
				use: 'imports-loader?wrapper=window',
			},
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			join: ['lodash', 'join'],
		}),
	],
}
```

## 全局 Exports

假设，某个 library 创建出一个全局变量，它期望 consumer（使用者使用这个变量）
比如，新增 globals.js，内容如下：

```javascript
const file = 'blah.txt'
const helpers = {
	test: function () {
		console.log('test something')
	},
	parse: function () {
		console.log('parse something')
	},
}
```

在这种情况下，我们可以使用[exports-loader](https://webpack.docschina.org/loaders/exports-loader/) 将一个全局变量作为一个普通的模块到处。例如，为了将`file`导出为`file`以及将`helpers.parse`到处为`parse`,做如下调整

```javascript
const path = require('path')
const webpack = require('webpack')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: require.resolve('./src/index.js'),
				use: 'imports-loader?wrapper=window',
			},
			{
				test: require.resolve('./src/globals.js'),
				use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse',
			},
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			join: ['lodash', 'join'],
		}),
	],
}
```

之后，就可以通过`const { file, parse } = require('./globals.js');`引入使用

# TypeScript

## 基本配置

```javascript
npm install --save-dev typescript ts-loader
```

将文件改为 ts 文件，并配置`tsconfig.json`

```javascript
//这里设置一个基本的配置来支持jsx，并将ts编译到ES5
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node"
  }
}
```

webpack.config.js

```javascript
const path = require('path')
const HtmlWekpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: {
		index: './src/index.js',
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	devServer: {
		static: './dist',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
}
```

改变`lodash`在`./index.ts`文件中的引入，因为`lodash`的定义中没有(default)的导出

```javascript
import _ from 'lodash'
import * as _ from 'lodash'
```

> 如果想在 Ts 中保留如`import _ from 'lodash';`的语法并让他作为一种默认的导入方式，需要在文件 tsconfig.json 中设置`allowSyntheticDefaultImports:true`和`esModuleInterop:true`

## Source Maps

要启用 source map，必须配置 Typescript,以将 sourcemap 输出到编译后的 javascript 文件中

```javascript
{
	"compilerOptions": {
		"outDir": "./dist/",
		"sourceMap": true,
		"noImplicitAny": true,
		"module": "commonjs"
		"target": "es5",
		"jsx": "react",
		"allowJs": true,
		"moduleResolution": "node",
	}
  }
```

并配置 webpack 提取 source map

```javascript
const path = require('path')

module.exports = {
	entry: './src/index.ts',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
}
```

# 渐进式网络应用程序

渐进式网络应用程序（progressive web application -PWA），是一种可以提供类似于 native app（原生应用程序）体验的 web app（网络引用程序）。PWA 可以用来做很多事，其中最重要的是，在**离线（offline）**时应用程序能够继续运行功能。这是通过使用名为[Service Workers](https://developer.chrome.com/docs/workbox/service-worker-overview/)的 web 技术来实现的
在这里，我们让 http-server 处理`./dist`目录中的文件，运行并访问`[http://localhost:8080](http://localhost:8080)`会看到 webpack 应用程序被 serve 到 dist 目录，如果停止 server 然后刷新，webpack 应用程序不再可访问
这就是我们为实现离线体验需要的改变，停止 server 后帅男。引用程序正常运行

## 添加 workbox

添加 workbox-webpack-plugin 插件

```javascript
npm install workbox-webpack-plugin --save-dev
```

配置 webpack.config.js

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
	entry: {
		app: './src/index.js',
		print: './src/print.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Output Management',
			title: 'Progressive Web Application',
		}),
		new WorkboxPlugin.GenerateSW({
			// 这些选项帮助快速启用 ServiceWorkers
			// 不允许遗留任何“旧的” ServiceWorkers
			clientsClaim: true,
			skipWaiting: true,
		}),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
}
```

打包后，可以看到有一个`service-worker.js`文件

## 注册 Service Worke

```javascript
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then((registration) => {
				console.log('SW registered: ', registration)
			})
			.catch((registrationError) => {
				console.log('SW registration failed: ', registrationError)
			})
	})
}
```

# [资源模块](https://webpack.docschina.org/guides/asset-modules/)

资源模块（asset module）是一种模块类型，它允许使用资源文件（字体、图标等）而无需配置额外 loader
webpack5 中，资源模块类型（asset module type），通过添加 4 中新的模块类型，来替换所有 loader

- `asset/resource`发送一个单独的文件并导出 URL。之前通过使用`file-loader`实现
- `asset/line`导出一个资源的 data URL.之前通过使用`url-loader`实现
- `asset/source`导出资源的源代码。之前通过使用`raw-loader`实现
- `asset`在导出一个 data URL 和发送一个单独的文件之间自动选择。之前通过`url-loader`，并且配置资源体积限制实现
