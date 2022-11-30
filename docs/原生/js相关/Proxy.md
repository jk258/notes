# 介绍
用于定义基本操作的自定义行为，修改的是程序默认行为，就形同于在编程语言层面做修改，属于元编程（mete programming）
proxy用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、函数调用等）
# 用法
proxy为构造函数，用来生成Proxy实例
```javascript
const proxy=new Proxy(target,handler)
```
## 参数

- target表示要所要拦截的对象（任何类型的对象，包括数组、对象，甚至另一个对象）
- handler通常一函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理p的行为
### handler解析

- get(target,propKey,receiver)：拦截对象属性的读取
- set(target,propKey,value,receiver)：拦截对象属性的设置
- has(target,propKey)：拦截 propKey in  proxy 的操作，返回一个布尔值
- deleteProperty(target,proKey)：拦截 delete proxy[propKey]的操作，返回一个数组
- ownKeys(target)：拦截Object.keys(proxy)、for...in 等循环，返回一个数组
- getOwnPropertyDescriptor(target,propKey)：拦截Object.getOwnPropertyDescriptor(proxy,propKye),返回属性的描述对象
- defineProperty(target,propKey,propDesc)：拦截Object.defineProperty(proxy,proKey,proDesc),返回一个布尔值
- preventExtensions(target)：拦截Object.prevetExtensions(proxy),返回一个布尔值
- getPrototypeOf(target)：拦截Object.getPrototyOf(proxy),返回一个对象
- isExtensible(target)：拦截Object.IsExtensible(proxy),返回一个布尔值
- setPrototypeOf(target,proto)：拦截Object.setPrototypeOf(proxy,proto)，返回一个布尔值
- apply(traget,object,args)：拦截Proxy实例作为函数调用的操作
- construct(target,args)：拦截Proxy实例作为构造函数调用的操作
### Reflect
在Proxy内部调用对象的默认行为，使用Reflect，es6中操作对象提供的新API
基本特点

- 只要Proxy对象具有的代理方法，Reflect对象全部具有，以静态方法的形式存在
- 修改某些Object方法的返回结果，让其变得更合理（定义不存在属性行为的时候不保存而是返回false）
- 让Object操作都变成函数行为
### get()
get接受三个参数，依次为目标对象、属性名和proxy实例本身，最后一个参数可选
```javascript
let person={
	name:'张三'
}
let proxy=new Proxy(person,{
	get(target,propKey){
		return Reflect.get(target,propKey)
	}
})
proxy.name//张三


//数组代理
function createArray(...arg) {
	let handler={
		get(target,propKey,receiver){
			let index=Number(propKey)
			if(index<0){
				propKey=String(index+target.length)
			}
			return Reflect.get(target,propKey,receiver)
		}
	}
	let target=[]
	target.push(...arg)
	return new Proxy(target,handler)
}
let arr=createArray('a','b','c')
arr[-1] //c
```
注意：如果一个属性不可配置（configurable）且不可写（writable），则Proxy不能修改该属性，否则会报错
```javascript
let target=Object.defineProperties({},{
	foo:{
		value:'123',
		writable:false,
		configurable:false
	}
})
const handler={
	get(target,propkey){
		return '121'
	}
}
const proxy=new Proxy(target,handler)
proxy.foo //Uncaught TypeError: 'get' on proxy: property 'foo' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '123' but got '121')
```
### set()
set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象，属性名、属性值和Proxy实例本身
```javascript
let validator={
	set(target,propKey,value){
		if(propKey=='age'){
			if(!Number.isInteger(value)){
				throw new TypeError('age 必须为数字')
			}
			if(value>200){
				throw new RangeError('age 不能大于200')
			}
		}
		target.age=value
	}
}
let person=new Proxy({},validator)

person.age=100//100
person.age='young'//报错
person.age=300//报错
```
注意：

- 如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用
```javascript
let obj={}
Object.defineProperty(obj,'foo',{
	value:'bar',
	writable:false
})
const handler={
	set(target,propKey,value){
		target[propKey]='baz'
	}
}
const proxy=new Proxy(obj,handler)
proxy.foo='baz'
proxy.foo//bar

```

- 严格模式下，set代理如果没有返回true，就会报错
```javascript
'use strict'
const handler={
	set(target,propKey,value){
		target[propKey]=value
		return false //有没有这行都会报错
	}
}
const proxy=new Proxy({},handler)
proxy.foo='bar'
```
### deleteProperty()
deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除
```javascript
function invariant(key,action) {
	if(key[0]==='_'){
		throw new Error('无法删除私有属性')
	}
}
const handler={
	deleteProperty(target,propKey,value){
		invariant(propKey,'delete')
		Reflect.deleteProperty(target,propKey)
		return true
	}
}
let target={_prop:'foo',name:'test'}
let proxy=new Proxy(target,handler)
delete proxy._prop//无法删除私有属性
```
注意，目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错
## 取消代理
```javascript
Proxy.revocable(target,handler)
```
# 使用场景
proxy其功能非常类似于设计模式中的代理模式，常用功能如下

- 拦截和见识外部对对象的访问
- 降低函数或类的复杂度
- 在复杂操作前对操作进行校验或对所需资源进行管理
### proxy保障数据类型的准确性
```javascript
let numericDataStore = { count: 0, amount: 1234, total: 14 };
numericDataStore = new Proxy(numericDataStore, {
    set(target, key, value, proxy) {
        if (typeof value !== 'number') {
            throw Error("属性只能是number类型");
        }
        return Reflect.set(target, key, value, proxy);
    }
});

numericDataStore.count = "foo"
// Error: 属性只能是number类型

numericDataStore.count = 333
// 赋值成功
```
### 声明私有apikey
```javascript
let api = {
    _apiKey: '123abc456def',
    getUsers: function(){ },
    getUser: function(userId){ },
    setUser: function(userId, config){ }
};
const RESTRICTED = ['_apiKey'];
api = new Proxy(api, {
    get(target, key, proxy) {
        if(RESTRICTED.indexOf(key) > -1) {
            throw Error(`${key} 不可访问.`);
        } return Reflect.get(target, key, proxy);
    },
    set(target, key, value, proxy) {
        if(RESTRICTED.indexOf(key) > -1) {
            throw Error(`${key} 不可修改`);
        } return Reflect.get(target, key, value, proxy);
    }
});

console.log(api._apiKey)//报错
api._apiKey = '987654321'//报错
```
### 观察者模式
```javascript
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
	const result = Reflect.set(target, key, value, receiver);
	queuedObservers.forEach(observer => observer());
	return result;
}
```
