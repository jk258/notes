# vue 响应式简易实现

```javascript
let activeEffect
class Dep {
	constructor(value) {
		this.subscribers = new Set()
	}
	depend() {
		if (activeEffect) {
			this.subscribers.add(activeEffect)
		}
	}
	notify() {
		this.subscribers.forEach((effect) => {
			effect()
		})
	}
}
function watchEffect(effect) {
	activeEffect = effect
	effect()
	activeEffect = null
}
const targetMap = new WeakMap()
function getDep(target, key) {
	let depsMap = targetMap.get(target)
	if (!depsMap) {
		depsMap = new Map()
		targetMap.set(target, depsMap)
	}
	let dep = depsMap.get(key)
	if (!dep) {
		dep = new Dep()
		depsMap.set(key, dep)
	}
	return dep
}
const reactiveHandlers = {
	get(target, key, receiver) {
		const dep = getDep(target, key)
		dep.depend()
		return Reflect.get(target, key, receiver)
	},
	set(target, key, value, receiver) {
		const dep = getDep(target, key)
		const result = Reflect.set(target, key, value, receiver)
		dep.notify()
		return result
	},
}
function reactive(raw) {
	return new Proxy(raw, reactiveHandlers)
}
```

## 使用
```javascript
const state = reactive({
	value: 0,
})
watchEffect(() => {
	console.log(state.value)
})
state.value = 1
```
