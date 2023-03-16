# js 面试题

## [原型和原型链](../../%E5%8E%9F%E7%94%9F/js%E7%9B%B8%E5%85%B3/%E5%8E%9F%E5%9E%8B%E5%92%8C%E5%8E%9F%E5%9E%8B%E9%93%BE.md)


## [作用域链](../../%E5%8E%9F%E7%94%9F/js%E7%9B%B8%E5%85%B3/%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%93%BE.md)

## ['1','2','3'].map(parseInt)的返回值是什么

答案：`[1, NaN, NaN]`

> **解析:**  
> 数组的`map`方法,接受三个参数，(当前值，当前索引，当前数组)  
> `parseInt`解析一个字符串并返回指定基数的十进制整数,接受两个参数`parseInt(string,radix)`_(需要转换的字符串，基数(取值范围为 2~36))_  
> 于是，`['1','2','3'].map(parseInt)`等价于：

```javascript
;['1', '2', '3'].map((item, index) => {
	return parseInt(item, index)
})
//  parseInt('1', 0)  1  radix为0，设置为默认值10
//  parseInt('2', 1)  NaN  radix小于2或大于36，直接返回NaN
//  parseInt('3', 2)  NaN 二进制是用1和0来表示的书，3不是指定 radix 参数中的数字，
//	                      忽略该字符以及所有后续字符,返回NaN
```

参考文章
MDN: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt  
博文: https://segmentfault.com/a/1190000010520302  
ECMAScript 原解析: https://262.ecma-international.org/6.0/#sec-parseint-string-radix
