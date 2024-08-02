# 切片Slice

slice 并不是数组或数组指针。它通过内部指针和相关属性引用数组片段，以实现变长方案
1. 切片：切片是数组的一个引用，因此切片是引用类型。但自身是结构体，值拷贝传递。
2. 切片的长度可以改变，因此，切片是一个可变的数组。
3. 切片遍历方式和数组一样，可以用`len()`求长度。表示可用元素数量，读写操作不能超过该限制。 
4. `cap`可以求出slice最大扩张容量，不能超出数组限制。`0 <= len(slice) <= len(array)`，其中array是slice引用的数组。
5. 切片的定义：`var 变量名 []类型`，比如 `var str []string  var arr []int`。
6. 如果 `slice == nil`，那么 `len、cap` 结果都等于 0。

## 创建切片的各种方式
```go
package main

import "fmt"

func main() {
	// 1.声明切片
	var s1 []int
	if s1 == nil {
		fmt.Println("是空")
	} else {
		fmt.Println("不是空")
	}
    // 2.:=
	s2 := []int{}
    // 3.make()
	var s3 []int = make([]int, 0)
	fmt.Println(s3)
    // 4.初始化赋值
	var s4 []int = make([]int, 0, 0)
	fmt.Println(s4)
	s5 := []int{1, 2, 3}
	fmt.Println(s5)
    // 5.从数组切片
	arr := [5]int{1, 2, 3, 4, 5}
	// 前包后不包
	var s6 []int = arr[1:4]
	fmt.Println(s6)
}
```
## 切片初始化
```go
// 全局：
var arr = [...]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
var slice0 []int = arr[start:end] 
var slice1 []int = arr[:end]        
var slice2 []int = arr[start:]        
var slice3 []int = arr[:] 
var slice4 = arr[:len(arr)-1]      //去掉切片的最后一个元素
// 局部：
slice5 := arr[start:end]
slice6 := arr[:end]        
slice7 := arr[start:]     
slice8 := arr[:]  
slice9 := arr[:len(arr)-1] //去掉切片的最后一个元素
```
| 操作            | 含义                                                         |
|-----------------|--------------------------------------------------------------|
| `s[n]`          | 切片s中索引位置为n的项                                   |
| `s[:]`          | 从切片s的索引位置0到len(s)-1处所获得的切片               |
| `s[low:]`       | 从切片s的索引位置low到len(s)-1处所获得的切片             |
| `s[:high]`      | 从切片s的索引位置0到high处所获得的切片，len=high       |
| `s[low:high]`   | 从切片s的索引位置low到high处所获得的切片，len=high-low |
| `s[low:high:max]` | 从切片s的索引位置low到high处所获得的切片，len=high-low，cap=max-low |
| `len(s)`        | 切片s的长度，总是<=cap(s)                                 |
| `cap(s)`        | 切片s的容量，总是>=len(s)                                 |

## 通过make来创建切片
```go
var slice []type = make([]type, len)
slice  := make([]type, len)
slice  := make([]type, len, cap)
```
## 切片追加(append)
`append` ：向 `slice` 尾部添加数据，返回新的 `slice` 对象。
```go
package main

import "fmt"

func main() {
	var a = []int{1, 2, 3}
	fmt.Printf("slice a : %v\n", a) //[1 2 3]
	var b = []int{4, 5, 6}
	fmt.Printf("slice b : %v\n", b) // [4 5 6]
	c := append(a, b...)
	fmt.Printf("slice c : %v\n", c) //[1 2 3 4 5 6]
	d := append(c, 7)
	fmt.Printf("slice d : %v\n", d) //[1 2 3 4 5 6 7]
	e := append(d, 8, 9, 10)
	fmt.Printf("slice e : %v\n", e) //[1 2 3 4 5 6 7 8 9 10]
}
```
超出原 slice.cap 限制，就会重新分配底层数组，即便原数组并未填满
```go
package main

import (
	"fmt"
)

func main() {

	data := [...]int{0, 1, 2, 3, 4, 10: 0}
	s := data[:2:3]
	fmt.Println(s, cap(s))
	s = append(s, 100, 200) // 一次 append 两个值，超出 s.cap 限制。

	fmt.Println(s, data)         // 重新分配底层数组，与原数组无关。
	fmt.Println(&s[0], &data[0]) // 比对底层数组起始指针。

}
``` 
## 切片拷贝
copy ：函数 copy 在两个 slice 间复制数据，复制长度以 len 小的为准。两个 slice 可指向同一底层数组，允许元素区间重叠。
```go
package main

import (
	"fmt"
)

func main() {
	s1 := []int{1, 2, 3, 4, 5}
	fmt.Printf("slice s1 : %v\n", s1)//[1 2 3 4 5]
	s2 := make([]int, 10)
	fmt.Printf("slice s2 : %v\n", s2)//[0 0 0 0 0 0 0 0 0 0]
	copy(s2, s1)
	fmt.Printf("copied slice s1 : %v\n", s1)//[1 2 3 4 5]
	fmt.Printf("copied slice s2 : %v\n", s2)// [1 2 3 4 5 0 0 0 0 0]
}
```
## 切片遍历
```go
package main

import (
	"fmt"
)

func main() {

	data := [...]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	slice := data[:]
	for index, value := range slice {
		fmt.Printf("inde : %v , value : %v\n", index, value)
        // 输出结果
        // inde : 0 , value : 0
        // inde : 1 , value : 1
        // inde : 2 , value : 2
        // inde : 3 , value : 3
        // inde : 4 , value : 4
        // inde : 5 , value : 5
        // inde : 6 , value : 6
        // inde : 7 , value : 7
        // inde : 8 , value : 8
        // inde : 9 , value : 9
	}

}
```
## 切片resize(调整大小)
```go
package main

import (
	"fmt"
)

func main() {
	var a = []int{1, 3, 4, 5}
	fmt.Printf("slice a : %v , len(a) : %v\n", a, len(a))//slice a : [1 3 4 5] , len(a) : 4
	b := a[1:2]
	fmt.Printf("slice b : %v , len(b) : %v\n", b, len(b))//slice b : [3] , len(b) : 1
	c := b[0:3]
	fmt.Printf("slice c : %v , len(c) : %v\n", c, len(c))//slice c : [3 4 5] , len(c) : 3
}
```
## 字符串与切片
string底层就是一个byte的数组，因此，也可以进行切片操作
```go
package main

import (
    "fmt"
)

func main() {
    str := "hello world"
    s1 := str[0:5]
    fmt.Println(s1)//hello

    s2 := str[6:]
    fmt.Println(s2)//world
}
```
string本身是不可变的，因此要改变string中字符。需要如下操作：   
- 英文字符串：
    ```go
    package main

    import (
        "fmt"
    )

    func main() {
        str := "Hello world"
        s := []byte(str) //中文字符需要用[]rune(str)
        s[6] = 'G'
        s = s[:8]
        s = append(s, '!')
        str = string(s)
        fmt.Println(str)//Hello Go!
    }
    ```
- 中文字符串：
    ```go
    package main

    import (
        "fmt"
    )

    func main() {
        str := "你好，世界！hello world！"
        s := []rune(str)
        s[3] = '够'
        s[4] = '浪'
        s[12] = 'g'
        s = s[:14]
        str = string(s)
        fmt.Println(str)
    }
    ```
    
数组或切片转字符串
```go
strings.Replace(strings.Trim(fmt.Sprint(array_or_slice), "[]"), " ", ",", -1)
```