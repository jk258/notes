# 创建

执行命令`npm create vite`，然后根据步骤填写

- Project name（项目名）: react-demo
- Select a framework（选择模板）: react
- Select a variant（选择 ts 或 js）: » react-ts

## 安装依赖并运行

```
cd react-demo
npm install
npm run dev
```

# 配套设施

```
npm i react-router-dom qs axios ahooks --save
```

## [路由(react-router-dom)](https://reactrouter.com/)

安装

```
npm install react-router-dom --save
```

修改`main.tsx`如下

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<HashRouter>
			<App />
		</HashRouter>
	</React.StrictMode>,
)
```

在`src`下创建`router`文件夹<br />
routes.tsx

```tsx
import { ComponentType, lazy, Suspense } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

declare module 'react-router-dom' {
	export interface RouteObject {
		name?: string
	}
}

function getElement(factory: () => Promise<{ default: ComponentType<any> }>) {
	const LazyNode = lazy(factory)
	return (
		<Suspense fallback='...'>
			<LazyNode></LazyNode>
		</Suspense>
	)
}

const routes: RouteObject[] = [
	{
		path: '/',
		name: '首页',
		element: getElement(() => import('@/views/Home')),
	},
	...// 404
	{
		path: '/*',
		element: <Navigate to='/'></Navigate>,
	},
]

export default routes
```

index.tsx

```tsx
import React, { ComponentType, ReactElement, lazy, Suspense } from 'react'
import { Route, RouteObject, Routes } from 'react-router-dom'
import routes from './routes'

function BeforeRouter({ route, children }: { route: RouteObject; children: ReactElement }) {
	return children
}

function RouteList(list: RouteObject[]) {
	return (
		<>
			{list.map((route) => {
				return (
					<Route path={route.path} element={route.element} key={route.path}>
						{route.children && RouteList(route.children)}
					</Route>
				)
			})}
		</>
	)
}

export default function Router() {
	return <Routes>{RouteList(routes)}</Routes>
}
```

最后在`app.tsx`引入

## [ahooks](https://ahooks.js.org/zh-CN) 一套高质量可靠的 React Hooks 库

## [接口请求（axios）](https://www.axios-http.cn/)

安装

```html
npm i qs axios --save
```

## [antd](https://ant.design/index-cn)

```
npm install antd --save
```

## 按需加载（[vite-plugin-importer](https://github.com/ajuner/vite-plugin-importer)）

```html
npm install vite-plugin-importer --save
```

vite.config.ts

```typescript
import usePluginImport from 'vite-plugin-importer'
export default defineConfig({
	plugins: [
		react(),
		usePluginImport({
			libraryName: 'antd',
			libraryDirectory: 'es',
			style: 'css',
		}),
	],
})
```

## 移动端

## [Antd Mobile](https://mobile.ant.design/zh)

## rem 适配[postcss-pxtorem](https://www.npmjs.com/package/postcss-pxtorem)

```html
npm install postcss postcss-pxtorem --save-dev
```

配置

```javascript
import pxtorem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig((mode) => {
	return {
		plugins: [react()],
		css: {
			postcss: {
				plugins: [
					pxtorem({
						rootValue: 37.5,
						propList: ['*'],
						exclude: /node_modules/i,
					}),
				],
			},
		},
	}
})
```

配置字体

```javascript
html:root{
    font-size: calc(100vw / 10);//10|375   20|750
}
```

## 开发依赖

- 类型文件：`@types/node`、`@types/qs`
- css 预处理：`scss|less`

安装

```html
npm i sass @types/node @types/qs --save-dev
```

