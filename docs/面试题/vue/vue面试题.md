## vue 双向绑定原理

vue 接收一个模板和`data`参数。

1. 首先将`data`中的数据进行递归遍历，对每个属性执行`Object.defineProperty`，定义`get`和`set`函数。并为每个属性添加一个`dep`数组。当`get`执行时，会为调用的`dom`节点创建一个`watcher`存放在该数组中。当`set`执行时，重新赋值,并调用`dep`数组的`notify`方法，通知所有使用了该属性的`watcher`，更新对应的 dom 内容
2. 将模板加载到内存中，递归模板中的元素，检测到元素有`v-`开头的命令或者双大括号的指令，就会从 data 中取对应的值去修改模板内容，这个时候就将该 dom 元素添加到该属性的 dep 数组中。这就实现了数据驱动视图。在处理`v-model`指令的时候，为该添加 input 事件(`onchange`),输入时就去修改对应的属性的值，实现了页面驱动数据，
3. 将模板与数据进行绑定后，将模板添加到真实 dom 中

## vue 生命周期执行顺序

- 进入页面
  - 父组件生命周期:`beforeCreate`=>`created`=>`beforeMount`
  - 子组件生命周期:`beforeCreate`=>`created`=>`beforeMount`=>`mounted`
  - 父组件生命周期:`mounted`
- 父组件数据改变
  - 父组件生命周期:`beforeUpdate`
  - 子组件生命周期:`beforeUpdate`=>`updated`
  - 父组件生命周期:`updated`
- 组件销毁
  - 父组件生命周期:`beforeDestroy`
  - 子组件生命周期:`beforeDestroy`=>`destroyed`
  - 父组件生命周期:`destroyed`

## key 的作用

主要作为 vue 的虚拟 dom 算法提示，在比较新旧节点列表时用于识别 vnode

> 在没有 key 的情况下，vue 将使用一种最小化元素移动的算法，并尽可能地就地更新/复用相同类型的元素。如果传了 key，则将根据 key 的变化顺序来重新排列元素，并且将始终移除/销毁 key 已经不存在的元素

- 同一个父元素下的子元素必须具有唯一的 key。重复的 key 将会导致渲染异常,例如`v-for`
- 也可以用于强制替换一个元素/组件而不是复用它。比如
  - 在适当的时候触发组件的生命周期钩子
  - 触发过渡

## [插槽 slots](https://cn.vuejs.org/guide/components/slots.html)

### 默认插槽

在外部没有提供任何内容的情况下，可以为插槽指定默认内容,如果父组件提供了插槽内容，会取代默认内容

```html
<button type="submit">
	<slot>submit</slot>
</button>
```

### 具名插槽

在一个组件中包含多个插槽，可以给`<slot>`一个特殊的 attribute `name`,用来给每个插槽分配唯一的 ID  
如下有组件`<BaseLayout>`

```html
<div class="container">
	<header>
		<slot name="header"></slot>
	</header>
	<main>
		<slot></slot>
	</main>
	<footer>
		<slot name="footer"></slot>
	</footer>
</div>
```

在父组件中使用

> 使用一个含`v-slot`指令的`template`元素,并将目标插槽的名字传给该指令,注意，**`v-slot`可简写为`#`**

```html
<BaseLayout>
	<template v-slot:header>
		<!-- header 插槽的内容放这里 -->
	</template>
	<template #footer>
		<!-- footer 插槽的内容放这里 -->
	</template>
</BaseLayout>
```

### 动态插槽名

动态指令参数在`v-slot`上也是有效的，即可以定义下面这样的动态插槽名

```html
<base-layout>
	<template v-slot:[dynamicSlotName]>...</template>

	<!-- 缩写为 -->
	<template #[dynamicSlotName]>...</template>
</base-layout>
```

### 作用域插槽

插槽的内容无法访问到子组件的状态，但是可以像对组件传递 props 那样，向一个插槽的出口上传递 attributes,如下:  
子组件`<MyComponent>`

```html
<!-- <MyComponent> 的模板 -->
<div>
	<slot :text="greetingMessage" :count="1"></slot>
</div>
```

父组件通过子组件标签上的`v-slot`指令，接收到一个插槽 props 对象

```html
<MyComponent v-slot="slotProps">{{ slotProps.text }} {{ slotProps.count }}</MyComponent>
```

### 具名作用域插槽

```html
<MyComponent>
	<template #header="headerProps">{{ headerProps }}</template>

	<template #default="defaultProps">{{ defaultProps }}</template>

	<template #footer="footerProps">{{ footerProps }}</template>
</MyComponent>
```
