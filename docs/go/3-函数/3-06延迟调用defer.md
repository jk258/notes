# 延迟调用 defer


## defer特性
1. 关键字 defer 用于注册延迟调用。
2. 这些调用直到 return 前才被执行。因此，可以用来做资源清理。
3. 多个defer语句，按先进后出的方式执行。
4. defer语句中的变量，在defer声明时就决定了。

## defer用途
1. 关闭文件句柄
2. 锁资源释放
3. 数据库连接释放  

go 语言的`defer`功能强大，对于资源管理非常方便，但是如果没用好，也会有陷阱   
`defer`是先进后出，后面的语句会依赖前面的资源，因此如果先前面的资源先释放了，后面的语句就没法执行了
```go
package main

import "fmt"

func main() {
    var whatever [5]struct{}

    for i := range whatever {
        defer fmt.Println(i)
    }
}
```
## defer碰上闭包
```go
package main

import "fmt"

func main() {
    var whatever [5]struct{}
    for i := range whatever {
        // 函数正常执行,由于闭包用到的变量 i 在执行的时候已经变成4,所以输出全都是4
        defer func() { fmt.Println(i) }()
    }
}
```

## defer f.close

```go
package main

import "fmt"

type Test struct {
    name string
}

func (t *Test) Close() {
    fmt.Println(t.name, " closed") //c c c
}
func main() {
    ts := []Test{{"a"}, {"b"}, {"c"}}
    for _, t := range ts {
        defer t.Close()
    }
}
```
```go
package main

import "fmt"

type Test struct {
    name string
}

func (t *Test) Close() {
    fmt.Println(t.name, " closed")//c,b,a
}
func main() {
    ts := []Test{{"a"}, {"b"}, {"c"}}
    for _, t := range ts {
        t2 := t
        defer t2.Close()
    }
}
```
defer后面的语句在执行的时候，函数调用的参数会被保存起来，但是不执行。也就是复制了一份。但是并没有说struct这里的this指针如何处理，通过这个例子可以看出go语言并没有把这个明确写出来的this指针当作参数来看待  
多个 defer 注册，按 FILO 次序执行 ( 先进后出 )。哪怕函数或某个延迟调用发生错误，这些调用依旧会被执行

```go
package main

func test(x int) {
    defer println("a")
    defer println("b")

    defer func() {
        println(100 / x) // div0 异常未被捕获，逐步往外传递，最终终止进程。
    }()

    defer println("c")
}

func main() {
    test(0)//c b a
}
```
延迟调用参数在注册时求值或复制，可用指针或闭包 "延迟" 读取。
```go
package main

func test() {
    x, y := 10, 20

    defer func(i int) {
        println("defer:", i, y) // y 闭包引用
    }(x) // x 被复制

    x += 10
    y += 100
    println("x =", x, "y =", y)
}

func main() {
    test()
}
```
滥用 defer 可能会导致性能问题，尤其是在一个 "大循环" 里
```go
package main

import (
    "fmt"
    "sync"
    "time"
)

var lock sync.Mutex

func test() {
    lock.Lock()
    lock.Unlock()
}

func testdefer() {
    lock.Lock()
    defer lock.Unlock()
}

func main() {
    func() {
        t1 := time.Now()

        for i := 0; i < 10000; i++ {
            test()
        }
        elapsed := time.Since(t1)
        fmt.Println("test elapsed: ", elapsed)
    }()
    func() {
        t1 := time.Now()

        for i := 0; i < 10000; i++ {
            testdefer()
        }
        elapsed := time.Since(t1)
        fmt.Println("testdefer elapsed: ", elapsed)
    }()

}
```
## defer 陷阱
defer 与 closure
```go
package main

import (
    "errors"
    "fmt"
)

func foo(a, b int) (i int, err error) {
    defer fmt.Printf("first defer err %v\n", err)
    defer func(err error) { fmt.Printf("second defer err %v\n", err) }(err)
    defer func() { fmt.Printf("third defer err %v\n", err) }()
    if b == 0 {
        err = errors.New("divided by zero!")
        return
    }

    i = a / b
    return
}

func main() {
    foo(2, 0)
}
```
如果 defer 后面跟的不是一个 closure 最后执行的时候我们得到的并不是最新的值  

- defer 与 return
    ```go
    package main

    import "fmt"

    func foo() (i int) {

        i = 0
        defer func() {
            fmt.Println(i)
        }()

        return 2
    }

    func main() {
        foo()//2  在有具名返回值的函数中（这里具名返回值为 i），执行 return 2 的时候实际上已经将 i 的值重新赋值为 2。所以defer closure 输出结果为 2 而不是 1
    }
    ```
- defer nil 函数
    ```go
    package main

    import (
        "fmt"
    )

    func test() {
        var run func() = nil
        defer run()
        fmt.Println("runs")
    }

    func main() {
        defer func() {
            if err := recover(); err != nil {
                fmt.Println(err)
            }
        }()
        test()
    }
    //名为 test 的函数一直运行至结束，然后 defer 函数会被执行且会因为值为 nil 而产生 panic 异常。然而值得注意的是，run() 的声明是没有问题，因为在test函数运行完成后它才会被调用
    ```
- 在错误的位置使用 defer
    ```go
    package main

    import "net/http"

    func do() error {
        // 当 http.Get 失败时会抛出异常
        res, err := http.Get("http://www.google.com")
        defer res.Body.Close()
        if err != nil {
            return err
        }

        // ..code...

        return nil
    }

    func main() {
        do()
    }
    ```
    解决：总是在一次成功的资源分配下面使用 defer ，对于这种情况来说意味着：当且仅当 http.Get 成功执行时才使用 defer
    ```go
    package main

    import "net/http"

    func do() error {
        res, err := http.Get("http://xxxxxxxxxx")
        if res != nil {
            defer res.Body.Close()
        }

        if err != nil {
            return err
        }

        // ..code...

        return nil
    }

    func main() {
        do()
    }
    ```
- 不检查错误  
    在这里，`f.Close()` 可能会返回一个错误，可这个错误会被我们忽略掉
    ```go
    package main

    import "os"

    func do() error {
        f, err := os.Open("book.txt")
        if err != nil {
            return err
        }

        if f != nil {
            defer f.Close()
        }

        // ..code...

        return nil
    }

    func main() {
        do()
    }
    ```
    通过命名的返回变量来返回 defer 内的错误
    ```go
    package main

    import "os"

    func do() (err error) {
        f, err := os.Open("book.txt")
        if err != nil {
            return err
        }

        if f != nil {
            defer func() {
                if ferr := f.Close(); ferr != nil {
                    err = ferr
                }
            }()
        }

        // ..code...

        return nil
    }

    func main() {
        do()
    }
    ```
    如果你尝试使用相同的变量释放不同的资源，那么这个操作可能无法正常执行
    ```go
    package main

    import (
        "fmt"
        "os"
    )

    func do() error {
        f, err := os.Open("book.txt")
        if err != nil {
            return err
        }
        if f != nil {
            defer func() {
                if err := f.Close(); err != nil {
                    fmt.Printf("defer close book.txt err %v\n", err)
                }
            }()
        }

        // ..code...

        f, err = os.Open("another-book.txt")
        if err != nil {
            return err
        }
        if f != nil {
            defer func() {
                if err := f.Close(); err != nil {
                    fmt.Printf("defer close another-book.txt err %v\n", err)
                }
            }()
        }

        return nil
    }

    func main() {
        do()
    }
    ```
    当延迟函数执行时，只有最后一个变量会被用到，因此，f 变量 会成为最后那个资源 (another-book.txt)。而且两个 defer 都会将这个资源作为最后的资源来关闭  
    解决方案：
    ```go
    package main

    import (
        "fmt"
        "io"
        "os"
    )

    func do() error {
        f, err := os.Open("book.txt")
        if err != nil {
            return err
        }
        if f != nil {
            defer func(f io.Closer) {
                if err := f.Close(); err != nil {
                    fmt.Printf("defer close book.txt err %v\n", err)
                }
            }(f)
        }

        // ..code...

        f, err = os.Open("another-book.txt")
        if err != nil {
            return err
        }
        if f != nil {
            defer func(f io.Closer) {
                if err := f.Close(); err != nil {
                    fmt.Printf("defer close another-book.txt err %v\n", err)
                }
            }(f)
        }

        return nil
    }

    func main() {
        do()
    }
    ```