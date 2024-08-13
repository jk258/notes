# Goroutine

在 java/c++中我们要实现并发编程的时候，我们通常需要自己维护一个线程池，并且需要自己去包装一个又一个的任务，同时需要自己去调度线程执行任务并维护上下文切换，这一切通常会耗费程序员大量的心智。那么能不能有一种机制，程序员只需要定义很多个任务，让系统去帮助我们把这些任务分配到 CPU 上实现并发执行呢？

Go 语言中的 goroutine 就是这样一种机制，goroutine 的概念类似于线程，但 goroutine 是由 Go 的运行时（runtime）调度和管理的。Go 程序会智能地将 goroutine 中的任务合理地分配给每个 CPU。Go 语言之所以被称为现代化的编程语言，就是因为它在语言层面已经内置了调度和上下文切换的机制。

在 Go 语言编程中你不需要去自己写进程、线程、协程，你的技能包里只有一个技能–goroutine，当你需要让某个任务并发执行的时候，你只需要把这个任务包装成一个函数，开启一个 goroutine 去执行这个函数就可以了，就是这么简单粗暴。

## 使用 goroutine

Go 语言中使用 goroutine 非常简单，只需要在调用函数的时候在前面加上 go 关键字，就可以为一个函数创建一个 goroutine。

一个 goroutine 必定对应一个函数，可以创建多个 goroutine 去执行相同的函数。

### 启动单个 goroutine

启动 goroutine 的方式非常简单，只需要在调用的函数（普通函数和匿名函数）前面加上一个 go 关键字。

举个例子如下：

```go
func hello() {
    fmt.Println("Hello Goroutine!")
}
func main() {
    hello()
    fmt.Println("main goroutine done!")
}
```

这个示例中 hello 函数和下面的语句是串行的，执行的结果是打印完 Hello Goroutine!后打印 main goroutine done!。

接下来我们在调用 hello 函数前面加上关键字 go，也就是启动一个 goroutine 去执行 hello 这个函数

```go
func main() {
    go hello() // 启动另外一个goroutine去执行hello函数
    fmt.Println("main goroutine done!")
}
```

这一次的执行结果只打印了 main goroutine done!，并没有打印 Hello Goroutine!。为什么呢？

在程序启动时，Go 程序就会为 main()函数创建一个默认的 goroutine。

当 main()函数返回的时候该 goroutine 就结束了，所有在 main()函数中启动的 goroutine 会一同结束，main 函数所在的 goroutine 就像是权利的游戏中的夜王，其他的 goroutine 都是异鬼，夜王一死它转化的那些异鬼也就全部 GG 了。

所以我们要想办法让 main 函数等一等 hello 函数，最简单粗暴的方式就是 time.Sleep 了。

```go
func main() {
    go hello() // 启动另外一个goroutine去执行hello函数
    fmt.Println("main goroutine done!")
    time.Sleep(time.Second)
}
```

执行上面的代码你会发现，这一次先打印 main goroutine done!，然后紧接着打印 Hello Goroutine!。

首先为什么会先打印 main goroutine done!是因为我们在创建新的 goroutine 的时候需要花费一些时间，而此时 main 函数所在的 goroutine 是继续执行的。

### 启动多个 goroutine

在 Go 语言中实现并发就是这样简单，我们还可以启动多个 goroutine。让我们再来一个例子： （这里使用了 sync.WaitGroup 来实现 goroutine 的同步）

```go
var wg sync.WaitGroup

func hello(i int) {
    defer wg.Done() // goroutine结束就登记-1
    fmt.Println("Hello Goroutine!", i)
}
func main() {

    for i := 0; i < 10; i++ {
        wg.Add(1) // 启动一个goroutine就登记+1
        go hello(i)
    }
    wg.Wait() // 等待所有登记的goroutine都结束
}
```

多次执行上面的代码，会发现每次打印的数字的顺序都不一致。这是因为 10 个 goroutine 是并发执行的，而 goroutine 的调度是随机的

注意：如果主协程退出了，其他任务还执行吗（运行下面的代码测试一下吧）

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    // 合起来写
    go func() {
        i := 0
        for {
            i++
            fmt.Printf("new goroutine: i = %d\n", i)
            time.Sleep(time.Second)
        }
    }()
    i := 0
    for {
        i++
        fmt.Printf("main goroutine: i = %d\n", i)
        time.Sleep(time.Second)
        if i == 2 {
            break
        }
    }
}
```

## goroutine 与线程

### 可增长的栈

OS 线程（操作系统线程）一般都有固定的栈内存（通常为 2MB）,一个 goroutine 的栈在其生命周期开始时只有很小的栈（典型情况下 2KB），goroutine 的栈不是固定的，他可以按需增大和缩小，goroutine 的栈大小限制可以达到 1GB，虽然极少会用到这个大。所以在 Go 语言中一次创建十万左右的 goroutine 也是可以的

### goroutine 调度

GPM 是 Go 语言运行时（runtime）层面的实现，是 go 语言自己实现的一套调度系统。区别于操作系统调度 OS 线程。

1. G 很好理解，就是个 goroutine 的，里面除了存放本 goroutine 信息外 还有与所在 P 的绑定等信息。
2. P 管理着一组 goroutine 队列，P 里面会存储当前 goroutine 运行的上下文环境（函数指针，堆栈地址及地址边界），P 会对自己管理的 goroutine 队列做一些调度（比如把占用 CPU 时间较长的 goroutine 暂停、运行后续的 goroutine 等等）当自己的队列消费完了就去全局队列里取，如果全局队列里也消费完了会去其他 P 的队列里抢任务。
3. M（machine）是 Go 运行时（runtime）对操作系统内核线程的虚拟， M 与内核线程一般是一一映射的关系， 一个 groutine 最终是要放到 M 上执行的；
   P 与 M 一般也是一一对应的。他们关系是： P 管理着一组 G 挂载在 M 上运行。当一个 G 长久阻塞在一个 M 上时，runtime 会新建一个 M，阻塞 G 所在的 P 会把其他的 G 挂载在新建的 M 上。当旧的 G 阻塞完成或者认为其已经死掉时 回收旧的 M。

P 的个数是通过 runtime.GOMAXPROCS 设定（最大 256），Go1.5 版本之后默认为物理线程数。 在并发量大的时候会增加一些 P 和 M，但不会太多，切换太频繁的话得不偿失。

单从线程调度讲，Go 语言相比起其他语言的优势在于 OS 线程是由 OS 内核来调度的，goroutine 则是由 Go 运行时（runtime）自己的调度器调度的，这个调度器使用一个称为 m:n 调度的技术（复用/调度 m 个 goroutine 到 n 个 OS 线程）。 其一大特点是 goroutine 的调度是在用户态下完成的， 不涉及内核态与用户态之间的频繁切换，包括内存的分配与释放，都是在用户态维护着一块大的内存池， 不直接调用系统的 malloc 函数（除非内存池需要改变），成本比调度 OS 线程低很多。 另一方面充分利用了多核的硬件资源，近似的把若干 goroutine 均分在物理线程上， 再加上本身 goroutine 的超轻量，以上种种保证了 go 调度方面的性能。
