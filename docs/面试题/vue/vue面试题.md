## vue双向绑定原理
vue接收一个模板和`data`参数。
1. 首先将`data`中的数据进行递归遍历，对每个属性执行`Object.defineProperty`，定义`get`和`set`函数。并为每个属性添加一个`dep`数组。当`get`执行时，会为调用的`dom`节点创建一个`watcher`存放在该数组中。当`set`执行时，重新赋值,并调用`dep`数组的`notify`方法，通知所有使用了该属性的`watcher`，更新对应的dom内容
2. 将模板加载到内存中，递归模板中的元素，检测到元素有`v-`开头的命令或者双大括号的指令，就会从data中取对应的值去修改模板内容，这个时候就将该dom元素添加到该属性的dep数组中。这就实现了数据驱动视图。在处理`v-model`指令的时候，为该添加input事件(`onchange`),输入时就去修改对应的属性的值，实现了页面驱动数据，
3. 将模板与数据进行绑定后，将模板添加到真实dom中

## vue生命周期执行顺序
- 进入页面
  * 父组件生命周期:`beforeCreate`=>`created`=>`beforeMount`
  * 子组件生命周期:`beforeCreate`=>`created`=>`beforeMount`=>`mounted`
  * 父组件生命周期:`mounted`
- 父组件数据改变
  * 父组件生命周期:`beforeUpdate`
  * 子组件生命周期:`beforeUpdate`=>`updated`
  * 父组件生命周期:`updated`
- 组件销毁
  * 父组件生命周期:`beforeDestroy`
  * 子组件生命周期:`beforeDestroy`=>`destroyed`
  * 父组件生命周期:`destroyed`

## key的作用
主要作为vue的虚拟dom算法提示，在比较新旧节点列表时用于识别vnode
> 在没有key的情况下，vue将使用一种最小化元素移动的算法，并尽可能地就地更新/复用相同类型的元素。如果传了key，则将根据key的变化顺序来重新排列元素，并且将始终移除/销毁key已经不存在的元素
* 同一个父元素下的子元素必须具有唯一的key。重复的key将会导致渲染一场,例如`v-for`
* 也可以用于强制替换一个元素/组件而不是复用它。比如
  * 在适当的时候触发组件的生命周期钩子
  * 触发过渡

