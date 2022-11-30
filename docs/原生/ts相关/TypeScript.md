# 是什么
typescript是javascript的类型的超集,支持es6语法,支持面向对象编程的概念,如类、接口、继承、泛型等。
其是一种静态类型检查的语言，提供了类型注解，在代码编译阶段就可以检查出数据类型的错误。
同时扩展了javascript的语法，所以任何现有的javascript程序都可以不加改变的在typescript下工作
为了保证兼容性，typescript在编译阶段需要编译器编译成纯javascript来运行，是为大型应用开发而设计的语言。如下
ts文件如下
```javascript
const hello : string = "Hello World!"
console.log(hello)
```
编译后文件
```javascript
const hello = "Hello World!"
console.log(hello)
```

# 特性

- 类型批注和编译时类型检查：在编译时批注变量类型
- 类型推断：ts中没有批注变量类型会自动推断变量的类型
- 类型擦除：在编译过程中批注的内容和接口会在运行时利用工具擦除
- 接口：ts中使用接口来定义对象类型
- 枚举：用于取值被限定在一定范围内的场景
- Mixin：可以接受任意类型的值
- 泛型类型：写代码时使用一些以后才制定的类型
- 名宇空间：名字只在该区域内有效，其他区域可重复使用改名字而不冲突
- 元祖：元组合并了不用类型的对象，想当于一个可以装不同类型数据的数组
## 类型批注
通过类型批注提供在编译时启动类型检查的静态类型，这是可选的，而且可以忽略而使用javascript常规的动态类型
```typescript
function add(left:number,right:number):number{
	return left+right
}
```
对于基本类型的批注是number、bool和string，而弱或动态类型的结构则是any类型
## 类型推断
当类型没有给出时，TypeScript编译器利用类型推断来推断类型，如下：
```typescript
let str='string'
```
变量str被推断为字符串类型，这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时
如果由于缺乏声明而不能推断出类型，那么它的类型被是做默认的动态any类型
## 接口
接口简单来说就是用来描述对象的类型 数据的类型有number、null、string等数据格式，对象的类型就是用接口来描述的
```typescript
interface Person{
	name:string
	age:number
}
let tom:Person={
	name:'Tom',
	age:25
}
```
# 区别 

- TypeScript是JavaScriptd的超集，扩展了JavaScripe的语法
- TypeScript可处理已有的JavaScript代码，并只对其中的TypeScript代码进行编译
- TypeScript文件的后缀名.ts(.ts,.tsx,.dts),JavaScript文件是.js
- 在编写TypeScript的文件的时候就会自动编译成js文件
|  | JavaScript | TypeScript |
| --- | --- | --- |
| 语言 | 脚本语言 | 面向对象编程语言 |
| 学习难度 | 灵活易学 | 需要有脚本编程经验 |
| 类型 | 轻量级解释编程语言 | 强类型的面向对象编程经验 |
| 客户端/服务 | 客户端服务端都有 | 侧重客户端 |
| 拓展名 | .js | .ts或.tsx |
| 耗时 | 更快 | 编译代码需要些时间 |
| 数据绑定 | 没有类型和接口的概念 | 使用类型和接口表示数据 |
| 语法 | 所有的语句都写在脚本标签内。浏览器将脚本标签内的文本识别为脚本 | 一个TypeScript程序由模块、方法、语句、表达式和注释构成 |
| 静态类型 | js中没有静态类型的概念 | 支持静态类型 |
| 模块支持 | 不支持模块 | 支持模块 |
| 接口 | 没有接口 | 支持接口 |
| 可选参数方法 | 不支持 | 支持 |
| 原型 | 没有这种特性 | 支持原型特性 |

# 数据类型
### boolean(布尔类型)
### number(数字类型)
```typescript
let num:number=123
let decLiteral:number=6 //十进制
let hexLiteral:number=0xf00d //十六进制
let binaryLiteral:number=0b1010//二进制
let octalLiteral:number=0o744 //八进制
```
### string(字符串类型)
### array(数组类型)
```typescript
let arr:string[]=['12','13']//元素类型后面接上[]
let arr:Array<number>=[1,2]//使用数组泛型，Array<元素类型>
```
### tupple（元祖类型）
允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
```typescript
let tupleArr:[number, string, boolean];//赋值的类型、位置、个数需要和定义（声明）的类型、位置、个数一致
tupleArr = [12, '34', true]; //ok
tupleArr = [12, '34'] // no ok
```
### any(任意类型)
在编程阶段还不清楚类型的变量指定一个类型，不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查，这时可以使用any类型
### null和undefined

   - null表示‘什么都没有’，是一个只有一个值的特殊类型，表示一个空对象引用
   - undefined表示一个没有设置位置值的变量
   - 默认情况下null和undefined是所有类型的子类型，就是说可以吧null和undefined赋值给number类型的变量
```typescript
let num:number | undefined; // 数值类型 或者 undefined
console.log(num); // 正确
num = 123;
console.log(num); // 正确
```
注意：如果ts配置--strictNullChecks标记，null和undefined只能赋值给void和它们各自
### void：用于标识方法返回值的类型，表示该方法没有返回值
```typescript
function hello():void {
    alert('hello')
}
```
### never：其他类型（包括null）和undefined的子类型，可以赋值给任何类型，代表从不会出现的值
```typescript
function error(message): never {
	throw new Error(message)
}
```
### object（对象类型），非原始类型，常见的形式通过{}进行包裹
### enum （枚举）
对javascript标准数据类型的一个补充，使用枚举类型可以为一组数值赋予友好的名字
```typescript
enum Color {
	Red='red',
	Green='green',
	Blue="blue",
}
let c: Color = Color.Blue //blue
```

- 数字枚举

声明枚举类型，没赋值的时候，默认为数字类型，从0开始依次累加
```typescript
enum Direction {
    Up,   // 值默认为 0
    Down, // 值默认为 1
    Left, // 值默认为 2
    Right // 值默认为 3
}
```

- 字符串枚举
```typescript
//枚举类型的值其实也可以是字符串类型：
enum Direction {
	Up = 'Up',
	Down = 'Down',
	Left = 'Left',
	Right = 'Right'
}
//设定一个变量为字符串后，后续的字段也需要赋值，否则报错
enum Direction {
	Up = 'UP',
	Down, // error TS1061: Enum member must have initializer
}
```

- 异构枚举
```typescript
//即将数字枚举和字符串枚举结合起来混合起来使用，如下：
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```
### interface（接口）	
# 类（class）
## 是什么
类（calss）是面向对象程序设计（OOP,Object-Oriented Programming）实现信息封装的基础
> 类是一种用户定义的引用数据类型，也称类类型

## 使用方式
定义类的关键字为class，后面紧跟类名，类可以包含以下几个模块（类的数据成员）：

- 字段：字段是类里面声明的变量。字段表示对象的有关数据
- 构造函数：类实例化时调用，可以为类的对象分配内存
- 方法：方法为对象要执行的操作
```typescript
class Car{
    engine: string
    constructor(engine: string) {
        this.engine=engine
    }
    disp():void {
        console.log("发动机为"+this.engine);
        
    }
}
```
## 继承
类的集成使用entends的关键字
```typescript
class Animal{
    move(distanceInMeters:number=0) {
        console.log(`Animal move ${distanceInMeters}m`)
        
    }
}
class Dog extends Animal{
    bark() {
        console.log('woof! woof!');
    }
}
const dog = new Dog()
dog.bark()
dog.move(10)
```
类继承后，子类可以对父类的方法重新定义，这个过程称之为方法的重写，super关键字是对父类的直接引用，该关键字可以引用父类的属性和方法，如下：
```typescript
class PrinterClass{
    doPrint(): void{
        console.log('父类 doPrint()方法');
    }
}
class StringPrinter extends PrinterClass{
    doPrint(): void {
        super.doPrint()
        console.log('子类 doPrint()方法');
        
    }
}
```
## 修饰符
### 公共public
可以自由的访问类程序里定义的成员
### 私有private
只能狗在该类的内部进行访问，实例对象并不能够访问，并且继承的子类也不能访问
```typescript
class Father {
	private name: string
	constructor(name: string) {
		this.name=name
	}
}

const father = new Father('test')
father.name //属性“name”为私有属性，只能在类“Father”中访问。
class Child extends Father{
	say() {
		console.log(`my name is ${this.name}`) //属性“name”为私有属性，只能在类“Father”中访问。
	}
}
```
### 受保护修饰符（protected）
跟私有修饰符相似，实例对象不能访问受保护的属性，但在子类中仍然可以访问
```typescript
class Father {
	protected name: string
	constructor(name: string) {
		this.name = name
	}
}

const father = new Father('test')
father.name //属性“name”受保护，只能在类“Father”及其子类中访问。
class Child extends Father {
	say() {
		console.log(`my name is ${this.name}`)
	}
}
```
只读修饰符（readonly）
通过readonly关键字进行声明，只读属性必须在声明时或构造函数里被初始化，如下：
```typescript
class Father {
	readonly name: string
	constructor(name: string) {
		this.name = name
	}
}

const father = new Father('test')
father.name='test' //无法分配到 "name" ，因为它是只读属性
```
### 静态属性（static）
通过static定义，存在于类本身而不是类的实例，需要通过 类型.静态属性 的这种方式访问
```typescript
class Square{
    static width='100px'
}
console.log(Square.width)//100px
```
### 抽象类（abstract）
抽象类作为其他派生类的基类使用，一般不会被直接实例化，不同于接口，抽象类可以包含成员的实现细节
```typescript
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}
```
不能被实例化，需要创建子类继承：
```typescript
class Cat extends Animal {

    makeSound() {
        console.log('miao miao')
    }
}

const cat = new Cat()

cat.makeSound() // miao miao
cat.move() // roaming the earch...
```
# 泛型
## 是什么
泛型程序设计（generic programming）是程序设计语言的一种风格或范式
泛型允许我们在强类型程序设计语言中编写代码时使用一些以后才指定的类型，在实例化时作为参数指明这些类型在typescript中，定义函数，接口或类的时候，不预先定义好具体的类型，而在使用的时候在指定类型的一种特性。如下：
```typescript
function returnItem<T>(para:T):T{
	return para
}
```
## 使用方式
泛型通过`<>`的形式进行表述，可以声明函数、接口、类
### 函数声明
```typescript
function returnItem<T>(para:T){
	return para
}
//定义多个类型参数
function swap<T,U>(tuple:[T,U]):[U,T]{
	return [tuple[1],tuple[0]]
}
swap(7,'seven')
```
### 接口声明
```ts
interface ReturnItem<T>{
    (para:T):T
}

const returnItem:ReturnItem<number>=(para)=>para
```
### 类声明
使用泛型声明类的时候，既可以作用于类本身，也可以作用于类的成员函数
```typescript
class Stack<T>{
    private arr: T[] = []
    public push(item: T) {
        this.arr.push(item)
    }
    public pop() {
        this.arr.pop()
    }
}
const stack = new Stack<number>()
```
如果上述只能传递string和number类型，这时候就可以使用`<T extends xx>`的方式实现约束泛型，如下：
```typescript
type Params=string|number
class Stack<T extends Params>{
    private arr: T[] = []
    public push(item: T) {
        this.arr.push(item)
    }
    public pop() {
        this.arr.pop()
    }
}
const stack = new Stack<boolean>()//类型“boolean”不满足约束“Params”
```
索引类型、约束类型
例如要设计一个函数，这个函数接受两个参数，一个参数为对象，另一个参数为对象上的属性，我们通过这两个参数返回这个属性的值
```typescript
//索引类型keyof T把传入的对象的属性类型取出生成一个联合类型，这里的泛型U被约束在这个联合类型中
function getValue<T extends object,U extends keyof T>(obj:T,key:U) {
    return obj[key]
}
let test = {
    name: 'test',
    age:12
}
getValue(test, 'age')
```
多类型约束
```typescript
interface FirstInterface{
    doSomething():number
}
interface SecondInterface {
	doSomethingElse(): string
}
interface childInterface extends FirstInterface, SecondInterface{
    
}
class Demo<T extends childInterface> {
	private genericProperty: T
    constructor(genericProperty: T) {
        this.genericProperty = genericProperty
    }
    useT() {
        this.genericProperty.doSomething()
        this.genericProperty.doSomethingElse()
    }
}
```
# 高级类型
## 交叉类型
通过&将多个类型合并为一个类型，包含了所需的所有类型的特性，本质上是一种并的操作
语法为T&U。适用于对象合并场景，如下将声明一个函数，将两个对象合并成一个对象并返回：
```typescript
function extend<T  extends object, U extends object>(first: T, second: U) : T & U {
    let result = <T & U>{}
    for (let key in first) {
        result[key] = (<any>first)[key]
    }
    for (let key in second) {
        if(!result.hasOwnProperty(key)) {
            result[key] = (<any>second)[key]
        }
    }
    return result
}
```
## 联合类型
联合类型的语法规则和逻辑“或”的符号一致，表示其类型为连接的多个类型中的任意一个，本质上是一种交的关系。语法为T|U
例如number|string|boolean的类型只能是这三个的一种，不能共存。如下：
```typescript
function formatCommandline(command: string[] | string) {
    let line = ''
    if (typeof command === 'string') {
        line=command
    } else {
        line=command.join('').trim()
    }
}
```
类型别名
类型别名会给一个类型起个新名字，类型别买有时和接口很想，但是可以作用于原始值、联合类型、元祖以及其他任何你需要手写的类型
可以使用type SomeName=someVaildTypeAnnotation 的语法来创建类型别名
```typescript
type some = boolean | string
const b: some = true
const c: some = "hello"
const d:some=123//不能将类型“123”分配给类型“some”

//泛型
type Container<T> = {
    value:T
}
//在属性里引用自己
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>
}
```
注意：类型和接口使用十分相似，都可以描述一个对象或函数，区别在于interface只能用于定义对象类型，而type的声明方式除了对象之外还可以定义交叉、联合、原始类型等，类型声明的方式适用范围显然更加广泛
## 类型索引
keyof类似于Object.keys,用于获取一个接口中Key的联合类型
```typescript
interface Button{
	type:string
	text:string
}
type ButtonKeys=keyof Button
//等效于
type ButtonKeys="type" | "text"
```
## 类型约束
通过关键字extend进行约束，不同于在class后使用extends的继承作用，泛型内使用的主要作用是对泛型加以约束
```typescript
type BaseType=string | number | boolean
function copy<T extends BaseType>(arg:T)T{
	return arg
}
```
类型约束通常和类型索引一起使用，例如我们有一个方法专门用来获取对象的值，但是这个对象并不确定，就可以用extends和keyof进行约束
```typescript
function getValue<T extends object, U extends keyof T>(obj:T, key: U){
    return obj[key]
}
const test = { a: 1 }
const b = getValue(test, 'a')
```
## 映射类型
通过in关键字做类型的映射，遍历已有接口的key或者是遍历联合类型，如下：
```typescript
type ReadOnly<T> = {
    readonly [P in keyof T]:T[P]
}
interface Obj{
    a: string
    b:string
}
type ReadOnlyoBJ = ReadOnly<Obj>

//上述结构，可以分成这些步骤
//keyof T：通过类型索引keyof得到联合类型'a'|'b'
//P in keyof T 等同于P in 'a'|'b',相当于执行一次forEach的逻辑，遍历'a'|'b'，结果为：
type ReadOnlyoBJ = {
	readonly a: string
	readonly b: string
}
```
## 条件类型
条件类型的语法规则和三元表达式一致，经常用于一些类型不确定的情况
```typescript
T extends U?X:Y //T是U的子集，是类型X，否则为类型Y
```
# 装饰器
## 是什么
装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，访问符，属性或参数上
是一种在不改变原类和使用继承的情况下，动态扩展对象的功能
本质上不是什么高大上的结构，就是一个普通的函数，`@expression` 的形式其实是`Object.defineProperty`的语法糖
## 使用方式
需要在`tsconfig.json`文件启动，如下：
```typescript
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    },
}
```
 `typescript`装饰器的使用和`javascript`基本一致
类的装饰器可以装饰：

- 类
- 方法/属性
- 参数
- 访问器
### 类装饰
例如声明一个函数`addAge`去给class的属性`age`添加年龄
```typescript
interface Person {
	name: string
	age: number
}
function addAge(constructor: Function) {
	constructor.prototype.age = 18
}
@addAge
class Person {
	name: string
	constructor() {
		this.name = 'huihui'
	}
}
let person = new Person()
console.log(person.age)
```
### 方法装饰
同样，装饰器可以用于修饰类的方法，这时候装饰器函数接收的参数变成了：

- target ：对象的原型
- propertyKey：方法的名称
- descriptor：方法的属性描述符

可以看到，这三个属性实际就是`Object.defineProperty`的三个参数，如果是类的属性，则没有传递第三个参数。如下：
```typescript
function method(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
	console.log(target) //{constructor: ƒ, say: ƒ}
	console.log(propertyKey) //say
	//{configurable: true
	//     enumerable: false
	//     value: ƒ say()
	//     writable: false
	// }
	console.log(descriptor)

	descriptor.writable = false
}
function property(target:any,propertyKey:string) {
	console.log(target, propertyKey) //{constructor: ƒ, say: ƒ} 'name'
}
class Person{
    @property
    name: string
    constructor() {
        this.name='huihui'
    }
    @method
    say() {
        return 'instance method'
    }
    static run() {
        return 'static method'
    }
}
const person = new Person()
person.say = () => {
	//报错Cannot assign to read only property 'say' of object '#<Person>'
	return 'edit'
}
```
### 参数装饰
接受3个参数，分别是：

- target：当前对象的类型
- propertyKey：参数的名称
- index：参数数组中的位置
```typescript
function logParameter(target: any, propertyKey: string, index: number) {
    console.log(target, propertyKey, index)    
}
class Employee{
    greet(@logParameter message: string) {
        return `hello ${message}`
    }
}
const emp = new Employee()
emp.greet('message')
```
### 访问器装饰
使用起来方式与方法装饰一致，如下：
```typescript

function modification(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
	console.log(target);
	console.log("prop " + propertyKey);
	console.log("desc " + JSON.stringify(descriptor) + "\n\n");
};

class Person{
	_name: string;
	constructor() {
		this._name = 'huihui';
	}
	
	@modification
	get name() {
		return this._name
	}
}
```
### 装饰器工厂
如果想要传递参数，是装饰器变成类似工厂函数，只需要在装饰器函数北部在返回一个函数即可，如下“
```typescript
function addAge(age: number) {
	return function (constructor: Function) {
        constructor.prototype.age = age
	}
}
interface Person {
    name: string
    age:number
}
@addAge(10)
class Person {
	constructor() {
		this.name = 'huihui'
	}
}
let person = new Person()
```
### 执行顺序
当多个装饰器应用于一个声明上，将由上至下依次对装饰器表达式求值，求值的结果会被当作函数，由下至上依次调用，如下：
```typescript
function f() {
    console.log('f(): evaluated')
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

		console.log('f(): called')
	}
}
function g() {
    console.log('g(): evaluated')
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('g(): called')
    }
}

class C{
    @f()
    @g()
    method() {
        
    }
}
// f(): evaluated
// main.ts:11 g(): evaluated
// main.ts:13 g(): called
// main.ts:7 f(): called
```
