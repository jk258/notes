# promise 源码

`promise`表示一个异步操作的最终结果，与之进行交互的方式主要是`then`方法，该方法接收两个回调函数，用于接受`promise`解决后的值或拒绝的原因

## 术语
* `promise`: 是一个拥有`then`方法的对象或函数
* `thenable`: 是一个定义了`then`方法的对象或者函数
* `value`: 只任何javascript的合法值(包括`undefined`,`thenable`和`promise`)
* `exception`: 指一个promise的拒绝原因

## 必要条件
### promise的状态
一个promise所处的状态必须是以下三者之一: pending(待定)、fulfilled(兑现)、拒绝(rejected)
1. `pending`: 可以流转为代表成功的`fulfilled`,或代表失败的`rejected`
2. `fulfilled`: 不可流转到其他任何状态，必须拥有一个不可变的终值
3. `rejected`: 不可流转到其他任何状态，必须拥有一个不可变的拒因

### then方法
1. `then`方法接收两个参数`promise.then(onFulfilled,onRejected)`
2. 参数可选，非函数忽略
3. `onFulfilled`在`promise`成功后被调用，且最多被调用一次
4. `onRejected`在`promise`被拒绝后调用，且最多被调用一次
5. `onfulfilled`和`onRejected`必须被当作函数调用
6. `then`方法可以被同意`peomise`调用多次，所有`onFulfilled`和`onRejected`按照注册顺序回调
7. `then`方法返回值是`promise`


