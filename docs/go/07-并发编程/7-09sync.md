# sync

## sync.WaitGroup

在代码中生硬的使用 time.Sleep 肯定是不合适的，Go 语言中可以使用 sync.WaitGroup 来实现并发任务的同步。 sync.WaitGroup 有以下几个方法：

| 方法名                           | 功能                 |
| -------------------------------- | -------------------- |
| (wg \* WaitGroup) Add(delta int) | 计数器+delta         |
| (wg \*WaitGroup) Done()          | 计数器-1             |
| (wg \*WaitGroup) Wait()          | 阻塞直到计数器变为 0 |

sync.WaitGroup 内部维护着一个计数器，计数器的值可以增加和减少。例如当我们启动了 N 个并发任务时，就将计数器值增加 N。每个任务完成时通过调用 Done()方法将计数器减 1。通过调用 Wait()来等待并发任务执行完，当计数器值为 0 时，表示所有并发任务已经完成。

我们利用 sync.WaitGroup 将上面的代码优化一下：

```go
var wg sync.WaitGroup

func hello() {
    defer wg.Done()
    fmt.Println("Hello Goroutine!")
}
func main() {
    wg.Add(1)
    go hello() // 启动另外一个goroutine去执行hello函数
    fmt.Println("main goroutine done!")
    wg.Wait()
}
```

需要注意 sync.WaitGroup 是一个结构体，传递的时候要传递指针。

## sync.Once

在编程的很多场景下我们需要确保某些操作在高并发的场景下只执行一次，例如只加载一次配置文件、只关闭一次通道等。

Go 语言中的 sync 包中提供了一个针对只执行一次场景的解决方案–sync.Once。

sync.Once 只有一个 Do 方法，其签名如下：

```go
func (o *Once) Do(f func()) {}
```

注意：如果要执行的函数 f 需要传递参数就需要搭配闭包来使用。

加载配置文件示例

延迟一个开销很大的初始化操作到真正用到它的时候再执行是一个很好的实践。因为预先初始化一个变量（比如在 init 函数中完成初始化）会增加程序的启动耗时，而且有可能实际执行过程中这个变量没有用上，那么这个初始化操作就不是必须要做的。我们来看一个例子：

```go
var icons map[string]image.Image

func loadIcons() {
    icons = map[string]image.Image{
        "left":  loadIcon("left.png"),
        "up":    loadIcon("up.png"),
        "right": loadIcon("right.png"),
        "down":  loadIcon("down.png"),
    }
}

// Icon 被多个goroutine调用时不是并发安全的
func Icon(name string) image.Image {
    if icons == nil {
        loadIcons()
    }
    return icons[name]
}
```

多个 goroutine 并发调用 Icon 函数时不是并发安全的，现代的编译器和 CPU 可能会在保证每个 goroutine 都满足串行一致的基础上自由地重排访问内存的顺序。loadIcons 函数可能会被重排为以下结果

```go
func loadIcons() {
    icons = make(map[string]image.Image)
    icons["left"] = loadIcon("left.png")
    icons["up"] = loadIcon("up.png")
    icons["right"] = loadIcon("right.png")
    icons["down"] = loadIcon("down.png")
}
```

在这种情况下就会出现即使判断了 icons 不是 nil 也不意味着变量初始化完成了。考虑到这种情况，我们能想到的办法就是添加互斥锁，保证初始化 icons 的时候不会被其他的 goroutine 操作，但是这样做又会引发性能问题。

使用 sync.Once 改造的示例代码如下：

```go
var icons map[string]image.Image

var loadIconsOnce sync.Once

func loadIcons() {
    icons = map[string]image.Image{
        "left":  loadIcon("left.png"),
        "up":    loadIcon("up.png"),
        "right": loadIcon("right.png"),
        "down":  loadIcon("down.png"),
    }
}

// Icon 是并发安全的
func Icon(name string) image.Image {
    loadIconsOnce.Do(loadIcons)
    return icons[name]
}
```

sync.Once 其实内部包含一个互斥锁和一个布尔值，互斥锁保证布尔值和数据的安全，而布尔值用来记录初始化是否完成。这样设计就能保证初始化操作的时候是并发安全的并且初始化操作也不会被执行多次。

## sync.Map

Go 语言中内置的 map 不是并发安全的

```go
var m = make(map[string]int)

func get(key string) int {
    return m[key]
}

func set(key string, value int) {
    m[key] = value
}

func main() {
    wg := sync.WaitGroup{}
    for i := 0; i < 20; i++ {
        wg.Add(1)
        go func(n int) {
            key := strconv.Itoa(n)
            set(key, n)
            fmt.Printf("k=:%v,v:=%v\n", key, get(key))
            wg.Done()
        }(i)
    }
    wg.Wait()
}
```

上面的代码开启少量几个 goroutine 的时候可能没什么问题，当并发多了之后执行上面的代码就会报 fatal error: concurrent map writes 错误。

像这种场景下就需要为 map 加锁来保证并发的安全性了，Go 语言的 sync 包中提供了一个开箱即用的并发安全版 map–sync.Map。开箱即用表示不用像内置的 map 一样使用 make 函数初始化就能直接使用。同时 sync.Map 内置了诸如 Store、Load、LoadOrStore、Delete、Range 等操作方法。

```go
var m = sync.Map{}

func main() {
    wg := sync.WaitGroup{}
    for i := 0; i < 20; i++ {
        wg.Add(1)
        go func(n int) {
            key := strconv.Itoa(n)
            m.Store(key, n)
            value, _ := m.Load(key)
            fmt.Printf("k=:%v,v:=%v\n", key, value)
            wg.Done()
        }(i)
    }
    wg.Wait()
}
```
