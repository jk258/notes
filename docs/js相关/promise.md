# 介绍
## 是什么
promise是异步编程的一种解决方案，比传统的解决方案（回调函数）更加合理和更加强大
## 优点

1. 链式操作减低了编码难度
2. 代码可读性明显增强
## 三种状态

- pending（进行中）
- fulfilled（已成功）
- rejected（已失败）
## 特点

1. 对象的状态不受外界影响，只有异步操作的结果，可以决定当前是哪一种状态
2. 一旦状态改变（从pending变为fulfilled和从pending变为rejected），就不会再变，任何时候都可以得到这个结果
# 用法
Promise对象是一个构造函数，用来生成Promise实例：
```javascript
const promise = new Promise((resolve,reject)=>{})
```
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject

- resolve：将promise对象的状态从“未完成”变成“成功”
- reject：将promise对象的状态从“未完成”变成“失败”
## 实例方法

- then(),实例状态发生变化时的回调函数，第一个参数是resolved的回调函数，第二个参数是rejected的回调函数
- catch(),指定发生错误时的回调函数
- finally(),制定不管Promise对象最后状态如何，都会执行的操作
## 构造函数方法
### all()
将多个Promise实例，包装成一个新的Promise实例
```javascript
const p=Promise.all([p1,p2,p3])
```
实例p的状态由p1,p2,p3决定，分为两种

1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数
2. 只要p1、p2、p3中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例返回值，会传递给p的回调函数
> 注意，如果作为参数的Promise实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all的catch方法

```javascript
const p1 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('hello')
    },3000)
})
.then((result) => result)
.catch((e) => e)

const p2 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        reject('报错了')
    },5000)
})
.then((result) => result)
.catch((e) => e)

Promise.all([p1, p2])
    .then((result) => console.log(result))//['hello', '报错了']
    .catch((e) => console.log(e))
```
如果p2没有自己的catch方法，就会调用Promise.all()的catch方法
```javascript
const p1 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('hello')
    },3000)
})
.then((result) => result)
.catch((e) => e)

const p2 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        reject('报错了')
    },5000)
})
.then((result) => result)
.catch((e) => e)

Promise.all([p1, p2])
    .then((result) => console.log(result))
    .catch((e) => console.log(e))//报错了
```
### race()
将多个Promise实例，包装成一个新的Pormise实例，只要有一个实例率先改变状态，race()的状态就跟着改变
```javascript
const p = Promise.race([p1,p2,p3])
```
### allSettled()
接受一组Promise实例作为参数，只有等到所有实例都返回结果（fulfilled和rejected）,才会结束
```javascript
Promise.allSettled([p1,p2])
```
### reslove()
将现有对象转为Promise对象
```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```
### reject()
返回新的Promise实例，该实例的状态为rejected	
```javascript
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```
