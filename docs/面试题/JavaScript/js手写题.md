# js 手写题

## call 的实现

- 第一个参数为 null 或者 undefined 时，this 指向全局对象 window，值为原始值的指向该原始值的自动包装对象，如 String、Number、Boolean
- 为了避免函数名与上下文(context)的属性发生冲突，使用 Symbol 类型作为唯一值
- 将函数作为传入的上下文(context)属性执行
- 函数执行完成后删除该属性
- 返回执行结果

```javascript
Function.prototype.myCall = function (context, ...args) {
  let cxt = context || window;
  let func = Symbol();
  cxt[func] = this;
  args = args ? args : [];
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
  delete cxt[func];
  return res;
};
```

## debounce(防抖)

触发高频时间后 n 秒内函数只会执行一次，如果 n 秒内高频时间再次触发，则重新计算时间

```javascript
const debounce = (fn, time) => {
  let timeOut = null;
  return function () {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => [fn.apply(this, arguments)], time);
  };
};
```

::: tip
防抖常应用于用户进行搜索输入节约请求资源，`window`触发`resize`事件时进行防抖只触发一次  
:::

## throttle(节流)

高频时间触发，但 n 秒内只会执行一次，所以节流会稀释函数的执行频率

```javascript
const throttle = (fn, time) => {
  let flag = true;
  return function () {
    if (!flag) return;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, time);
  };
};
```

::: tip
节流常应用于鼠标不断点击触发、监听滚动事件
:::

## 模拟 new 操作

3 个步骤

1. 以`ctor.prototype`为原型创建一个对象
2. 执行构造函数并将 this 绑定到新创建的对象上
3. 判断构造函数执行返回的结果是否为引用数据类型，若是则返回构造函数执行的结果，否则返回创建的对象

```javascript
function newOperator(ctor, ...args) {
  if (typeof ctor !== "function") {
    throw new TypeError("Type Error");
  }

  const obj = Object.create(ctor.prototype);
  const res = ctor.apply(obj, args);

  const isObject = typeof res == "object" && res;
  const isFunction = typeof res == "function";
  return isObject || isFunction ? res : obj;
}
```

## 柯里化函数

```javascript
function curry(fn, args) {
  var length = fn.length;
  let newArgs = args || [];
  return function () {
    newArgs = args.concat(Array.prototype.slice.call(arguments));
    if (newArgs.length < length) {
      return curry.call(this, fn, newArgs);
    } else {
      return fn.apply(this, newArgs);
    }
  };
}
```
