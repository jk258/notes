# vue2 和 vue3 的区别

## 生命周期变化

整体来看，变化不大，只是名字大部分需要+`on`,功能基本类似。使用上`vue3`组合式需要先引入在使用，`vue2`选项式直接使用，如下：

```vue
// vue3
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  ...
})
// 可将不同的逻辑拆开成多个onMounted，依然按顺序执行，不被覆盖
onMounted(() => {
  ...
})
</script>

// vue2
<script>
export default {
   mounted() {
     ...
   },
}
</script>
```

常用生命周期表格如下：

| **vue2.x**    | **vue3**            |
| ------------- | ------------------- |
| beforeCreate  | Not need\*(setup()) |
| created       | Not need\*(setup()) |
| beforeMount   | onBeforeMount       |
| mounted       | onMounted           |
| beforeUpdate  | onBeforeUpdate      |
| updated       | onUpdated           |
| beforeDestroy | OnBeforeUnmount     |
| destroyed     | onUnmounted         |

Tips：`setup`是围绕`beforeCreate`和`created`生命周期钩子运行的，所以不需要显式地去定义
<a name="ekaw9"></a>

## 多根节点

Vue3 支持了多根节点组件，也就是`fragment`。<br />Vue2 中，编写页面的时候，需要去将组件包裹在`<div>`，否则报错警告

```vue
<template>
	<div>
		<header>...</header>
		<main>...</main>
		<footer>...</footer>
	</div>
</template>
```

Vue3 中，组件可以包含多个根节点，可以少写一层

```vue
<template>
	<header>...</header>
	<main>...</main>
	<footer>...</footer>
</template>
```

## 异步组件

vue3 提供了`Suspense`组件，允许程序在等待异步渲染兜底的内容，如 loading，使用户体验更平滑。<br />使用时，需要在模板中声明，并包含两个插槽，`default`和`fallback`。<br />`Suspense`确保加载完异步组件时显示默认插槽，并将`fallback`插槽用作加载状态

```vue
<template>
	<suspense>
		<HelloWorld></HelloWorld>
		<template #fallback>loading...</template>
	</suspense>
</template>
```

注意：若想在`setup`中调用异步请求，需在`setup`前加`async`关键字。在`<script setup>`不用，这时会报错警告，需要在父组件页面调用当前组件外包裹一层`Suspense`组件

## Teleport

vue3 提供`Teleport`组件可将部分 Dom 移动到 Vue app 之外的位置，比如项目中常见的`Dialog`组件

```Vue
<template>
  <teleport to="body">
    <div class="dialog">...</div>
  </teleport>
</template>
```

## 组合式 api

vue2 是`选项式API(Option API)`,一个逻辑会散乱在文件不同位置（data，props，computed、watch、生命周期函数等），导致代码可读性变差<br />vue3`组合式API(Composition API)` 增强了代码的可读性、内聚性，可将同一逻辑的内容写到一起，提供了较为完美的逻辑服用方案<br />解决了 vue2 mixin 存在的命名冲突隐患，依赖关系不明确，不同组件间配置化使用不够灵活

## 响应式原理

vue2 响应式原理基础是`Object.defineProperty`;vue3 的响应式原理基础是`Proxy`

- `Object.defineProperty`

直接在一个对象上定义新的属性或修改现有属性，并返回对象

> 缺点：无法监听对象或数组新增、删除的元素。

> vue2 方案：针对常用数组原型方法 push、pop、shift、unshift、splice、sort、reverse 进行了 hack 处理，提供了`Vue.set`监听对象/数组新增属性。对象的新增/删除响应，还可以 new 个新对象，新增则合并新属性和对象；删除则将删除后的对象深拷贝给新对象

- `Proxy`

`Proxy`是 ES6 新特性，通过第 2 个参数`handler`拦截目标对象的行为。相较于`Object.defineProperty`提供语言全范围的响应能力，消除了局限性。但在兼容性上放弃了（IE11 以下）

> 消除局限性
>
> - 对象/数组的新增、删除
> - 检测.length 修改
> - Map、Set、WeakMap、WeakSet 的支持

## 虚拟 DOM

Vue3 相比于 Vue2 虚拟 DOM 上增加`patchFlag`字段。借助[Vue3 Template Explorer](https://template-explorer.vuejs.org/#eyJzcmMiOiI8ZGl2PkhlbGxvIFdvcmxkPC9kaXY+XHJcbjxwPnRlc3Q8L3A+XHJcbjxoMiA6Y2xhc3M9XCJ0ZXN0XCI+dGVzdDwvaDI+XHJcbjxkaXY+e3tob21lfX08L2Rpdj4iLCJzc3IiOmZhbHNlLCJvcHRpb25zIjp7ImhvaXN0U3RhdGljIjp0cnVlfX0=) 来看

```vue
<template>
	<div>Hello World</div>
	<p>test</p>
	<h2 :class="test">test</h2>
	<div>{{ home }}</div>
</template>

<script>
//渲染函数如下
import { createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, toDisplayString as _toDisplayString, Fragment as
_Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue" const _hoisted_1 = /*#__PURE__*/_createElementVNode("div",
null, "Hello World", -1 /* HOISTED */) const _hoisted_2 = /*#__PURE__*/_createElementVNode("p", null, "test", -1 /* HOISTED */) export function
render(_ctx, _cache, $props, $setup, $data, $options) { return (_openBlock(), _createElementBlock(_Fragment, null, [ _hoisted_1, _hoisted_2,
_createElementVNode("h2", { class: _normalizeClass(_ctx.test) }, "test", 2 /* CLASS */), _createElementVNode("div", null, _toDisplayString(_ctx.home),
1 /* TEXT */) ], 64 /* STABLE_FRAGMENT */)) }
</script>
```

注意第 3 个`_createElementVNode`的第 4 个参数即`patchFlag`字段类型，字段类型情况如下所示。1 代表节点为动态节点，在 diff 过程中，只需对比文本内容，如需关注 class、style 等。除此之外，发现所有的静态节点，都保存为一个变量进行`静态提升`，可在重新渲染时直接引用，无需重新创建

```ts
export const enum PatchFlags {
	TEXT = 1, // 动态文本内容
	CLASS = 1 << 1, // 动态类名
	STYLE = 1 << 2, // 动态样式
	PROPS = 1 << 3, // 动态属性，不包含类名和样式
	FULL_PROPS = 1 << 4, // 具有动态 key 属性，当 key 改变，需要进行完整的 diff 比较
	HYDRATE_EVENTS = 1 << 5, // 带有监听事件的节点
	STABLE_FRAGMENT = 1 << 6, // 不会改变子节点顺序的 fragment
	KEYED_FRAGMENT = 1 << 7, // 带有 key 属性的 fragment 或部分子节点
	UNKEYED_FRAGMENT = 1 << 8, // 子节点没有 key 的fragment
	NEED_PATCH = 1 << 9, // 只会进行非 props 的比较
	DYNAMIC_SLOTS = 1 << 10, // 动态的插槽
	HOISTED = -1, // 静态节点，diff阶段忽略其子节点
	BAIL = -2, // 代表 diff 应该结束
}
```

## 事件缓存

vue3 的`cacheHandler`可在第一次渲染后缓存我们的事件。相比较于 vue2 无需每次渲染都传递一个新函数。加一个`click`事件

## diff 优化

`patchFlag`帮助 diff 时区分静态节点，以及不同类型的动态节点。一定程度地减少节点本身及其属性的对比

## 打包优化

tree-shaking：模块打包`webpack`、`rollup`等中的概念。移除`JavaScript`上下文中未引用的代码。主要依赖于`import`和`export`语句，用来检测代码模块是否被导出、导入，且被`JavaScript`文件使用<br />由此，只要模块绑定器支持`tree-shaking`,则 vue3 应用程序中为使用的 api 将从最终的捆绑包中消除，获得最佳文件大小。受此更改影响的全局 API 有如下：

- Vue.nextTick
- Vue.observable（用 Vue.reactive 替换）
- Vue.version
- Vue.compile（仅全构建）
- Vue.set（仅兼容构建）
- Vue.delete（仅兼容构建）
  <a name="ukVXk"></a>

## 自定义渲染 API（createRenderer）

## TypeScript 支持

vue3 由 ts 重写，相对于 Vue2 有更好地 TypeScript 支持

- vue2 `Option API`中 option 是个简单对象，而 ts 是一种类型系统，面向对象的语法，不是特别匹配
- vue2 需要`vue-class-component`强化 vue 原生组件，也需要`vue-property-decorator`增加更多结合 vue 特性的装饰器，写法比较繁琐
