# nestjs 学习(二)，controller+service+module

在 nestjs 中，可以通过`nest g mo <module-name>`来创建模块，一个模块通常由以下内容组成：

```
cats
|- dto 验证
|- cats.controller.ts # 具有单一路由的基本控制器
|- cats.module.ts # 模块
|- cats.service.ts # 具有单一方法的基本服务
```

## 控制器(controller)

控制器负责处理传入请求并向客户端返回响应  
控制器的目的是接收应用的特定请求。路由机制控制哪个控制器接收哪些请求。通常，每个控制器都有不止一条路由，不同的路由可以执行不同的操作  
如下：

```ts
import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'

@Controller('cats')
export class CatsController {
	@Get() //
	findAll(@Req() request: Request): string {
		return 'This action returns all cats'
	}
}
```

- `@Controller()`定义控制器，`cats`是路由前缀，减少重复代码
- `@Get()`定义路由，当请求/cats 时，执行 findAll 方法。Nest 为所有标准的 HTTP 方法提供装饰器：`@Get()`、`@Post()`、`@Put()`、`@Delete()`、`@Patch()`、`@Options()` 和 `@Head()`。此外，`@All()` 定义了一个端点来处理所有这些
- `@HttpCode()`修改相应状态码
  ```ts
  @Post()
  @HttpCode(204)
  create() {
    return 'This action adds a new cat';
  }
  ```
- `@Header()`修改响应头
  ```ts
  @Post()
  @Header('Cache-Control', 'no-store')
  create() {
    return 'This action adds a new cat';
  }
  ```
- `@Redirect()`可以将请求重定向到特定 URL
  ```ts
  @Get()
  @Redirect('https://nest.nodejs.cn', 301)
  ```
- `@Param()`可以接受动态数据作为请求的一部分
  ```ts
  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
  ```
- 将 `@Req()` 装饰器添加到处理程序的签名来指示 Nest 注入它来访问请求对象

nestjs 提供的装饰器列表和它们代表的普通平台特定对象
| 装饰器 | 参数 | 描述 |
|----------------------------|------------------|----------------------------------------------------------------------|
| @Request(), @Req() | req | 获取整个请求对象 `req`。 |
| @Response(), @Res() | res | 获取整个响应对象 `res`。使用 `*` 可以让你直接调用响应方法，例如 `res.send()`。 |
| @Next() | next | 获取 `next` 函数。 |
| @Session() | req.session | 获取会话对象 `req.session`。 |
| @Param(key?: string) | req.params / req.params[key] | 获取路由参数 `req.params` 或 `req.params[key]`。 |
| @Body(key?: string) | req.body / req.body[key] | 获取请求体 `req.body` 或 `req.body[key]`。 |
| @Query(key?: string) | req.query / req.query[key] | 获取查询参数 `req.query` 或 `req.query[key]`。 |
| @Headers(name?: string) | req.headers / req.headers[name] | 获取请求头 `req.headers` 或 `req.headers[name]`。 |
| @Ip() | req.ip | 获取客户端的 IP 地址 `req.ip`。 |
| @HostParam() | req.hosts | 获取主机参数 `req.hosts`。 |

### 请求负载

我们之前的 POST 路由处理程序示例不接受任何客户端参数。可以通过添加 `@Body()` 装饰器来解决  
首先需要确定 DTO（数据传输对象）架构

```ts
export class CreateCatDto {
	name: string
	age: number
	breed: string
}
```

它只有三个基本属性。此后我们可以在 CatsController 中使用新创建的 DTO：

```ts
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```

> `ValidationPipe` 可以过滤掉方法处理程序不应接收的属性。在这种情况下，我们可以将可接受的属性列入白名单，并且白名单中未包含的任何属性都会自动从生成的对象中删除
> 完整实例如下：

```ts
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto'

@Controller('cats')
export class CatsController {
	@Post()
	create(@Body() createCatDto: CreateCatDto) {
		return 'This action adds a new cat'
	}

	@Get()
	findAll(@Query() query: ListAllEntities) {
		return `This action returns all cats (limit: ${query.limit} items)`
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return `This action returns a #${id} cat`
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
		return `This action updates a #${id} cat`
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return `This action removes a #${id} cat`
	}
}
```

## 提供器(service)

提供器的主要思想是它可以作为依赖注入；这意味着对象之间可以创建各种关系，并且 "接线" 这些对象的功能很大程度上可以委托给 Nest 运行时系统  
控制器应该处理 HTTP 请求并将更复杂的任务委托给提供器。提供程序是普通的 JavaScript 类，在 NestJS 模块中声明为 providers  
让我们从创建一个简单的 CatsService 开始。该服务将负责数据存储和检索，并设计为供 CatsController 使用

```ts
import { Injectable } from '@nestjs/common'
import { Cat } from './interfaces/cat.interface'

@Injectable()
export class CatsService {
	private readonly cats: Cat[] = []

	create(cat: Cat) {
		this.cats.push(cat)
	}

	findAll(): Cat[] {
		return this.cats
	}
}
```

`@Injectable()` 装饰器附加元数据，该元数据声明`CatsService`是可由 `Nest IoC` 容器管理的类。
其中，这个例子也使用了一个 Cat 接口，它可能看起来像这样：

```ts
export interface Cat {
	name: string
	age: number
	breed: string
}
```

然后，在`CatsController `中使用服务类

```ts
import { Controller, Get, Post, Body } from '@nestjs/common'
import { CreateCatDto } from './dto/create-cat.dto'
import { CatsService } from './cats.service'
import { Cat } from './interfaces/cat.interface'

@Controller('cats')
export class CatsController {
	constructor(private catsService: CatsService) {}

	@Post()
	async create(@Body() createCatDto: CreateCatDto) {
		this.catsService.create(createCatDto)
	}

	@Get()
	async findAll(): Promise<Cat[]> {
		return this.catsService.findAll()
	}
}
```

CatsService 通过类构造函数注入。请注意 private 语法的使用。这种简写允许我们立即在同一位置声明和初始化 catsService 成员  
提供程序通常具有与应用生命周期同步的生命周期 ("scope")

## 模块(module)

模块是用 `@Module()` 装饰器注释的类。`@Module()` 装饰器提供 Nest 用于组织应用结构的元数据  
每个应用至少有一个模块，即根模块。根模块是 Nest 用于构建应用图的起点 - Nest 用于解析模块和提供器关系及依赖的内部数据结构。虽然非常小的应用理论上可能只有根模块，但这不是典型的情况。强烈建议将模块作为组织组件的有效方式。因此，对于大多数应用来说，最终的架构将采用多个模块，每个模块封装一组密切相关的功能。  
`CatsController` 和 `CatsService` 属于同一个应用域。由于它们密切相关，因此将它们移动到功能模块中是有意义的。特性模块只是简单地组织与特定特性相关的代码，保持代码的组织性并建立清晰的边界

```ts
import { Module } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

@Module({
	controllers: [CatsController],
	providers: [CatsService],
})
export class CatsModule {}
```

最后，将模块导入到根模块中

```ts
import { Module } from '@nestjs/common'
import { CatsModule } from './cats/cats.module'

@Module({
	imports: [CatsModule],
})
export class AppModule {}
```

### 全局模块

`@Global()` 装饰器使模块全局化

```ts
import { Module, Global } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

@Global()
@Module({
	controllers: [CatsController],
	providers: [CatsService],
	exports: [CatsService],
})
export class CatsModule {}
```

`@Global()` 装饰器使模块具有全局作用域。全局模块应该只注册一次，通常由根模块或核心模块注册。在上面的示例中，`CatsService` 提供程序将无处不在，希望注入服务的模块将不需要在其导入数组中导入 `CatsModule`

### 动态模块

Nest 模块系统包含一个称为动态模块的强大功能。以下是一个`DatabaseModule`示例

```ts
import { Module, DynamicModule } from '@nestjs/common'
import { createDatabaseProviders } from './database.providers'
import { Connection } from './connection.provider'

@Module({
	providers: [Connection],
	exports: [Connection],
})
export class DatabaseModule {
	static forRoot(entities = [], options?): DynamicModule {
		const providers = createDatabaseProviders(options, entities)
		return {
			module: DatabaseModule,
			providers: providers,
			exports: providers,
		}
	}
}
```

> forRoot() 方法可以同步或异步（即通过 Promise）返回动态模块
> 如果要在全局作用域内注册动态模块，请将 global 属性设置为 true

```ts
{
  global: true,
  module: DatabaseModule,
  providers: providers,
  exports: providers,
}
```

`DatabaseModule`通过以下方式导入和配置

```ts
import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { User } from './users/entities/user.entity'

@Module({
	imports: [DatabaseModule.forRoot([User])],
})
export class AppModule {}
```

## 验证

在`controller`中，我们通过`@Body()`装饰器获取请求体数据，并通过`dto`架构来确定参数  
同样的，我们还需要验证发送到 Web 应用的任何数据的正确性。为了自动验证传入的请求，Nest 提供了几个开箱即用的管道：

- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe  
  `ValidationPipe` 使用强大的 `class-validator` 包及其声明式验证装饰器。`ValidationPipe` 提供了一种方便的方法来为所有传入的客户端有效负载执行验证规则，其中在每个模块的本地类/DTO 声明中使用简单注释声明特定规则

使用`ValidationPipe`需要先安装依赖

```bash
npm i --save class-validator class-transformer
```

自动验证

```ts
async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(process.env.PORT ?? 3000)
}
```
为了测试管道，创建一个基本端点
```ts
@Post()
create(@Body() createUserDto: CreateUserDto) {
  return 'This action adds a new user';
}
```
在`CreateUserDto`中定义验证规则
```ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
```
有了这些规则，如果请求在请求正文中使用无效的 email 属性到达我们的端点，应用将自动响应 400 Bad Request 代码以及以下响应正文：
```ts
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["email must be an email"]
}
```
除了验证请求主体之外，ValidationPipe 还可以与其他请求对象属性一起使用。想象一下，我们想在端点路径中接受 :id。为确保此请求参数只接受数字，我们可以使用以下结构
```ts
@Get(':id')
findOne(@Param() params: FindOneParams) {
  return 'This action returns a user';
}
```
`FindOneParams` 和 DTO 一样，只是一个使用 `class-validator` 定义验证规则的类。它看起来像这样：
```ts
import { IsNumberString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  id: number;
}
```
### 映射类型
`PartialType()` 函数返回一个类型（类），其中输入类型的所有属性都设置为可选。例如，假设我们有这样的类型：
```ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```
默认情况下，所有这些字段都是必需的。用`PartialType()`把它们变成可选
```ts
export class UpdateCatDto extends PartialType(CreateCatDto) {}
```
`PickType()` 函数通过从输入类型中选取一组属性来构造一个新类型（类）。  
我们还是使用上面的`CreateCatDto`类型，但只选取`age`属性`
```ts
export class UpdateCatAgeDto extends PickType(CreateCatDto, ['age'] as const) {}
```
`OmitType()` 函数通过从输入类型中选取所有属性然后删除一组特定的键来构造一个类型
使用`CreateCatDto`类型，但选取除了`name`之外的属性`
```ts
export class UpdateCatDto extends OmitType(CreateCatDto, ['name'] as const) {}
```
`IntersectionType()` 函数将两种类型合并为一种新类型（类）。例如，假设我们从两种类型开始
```ts
export class CreateCatDto {
  name: string;
  breed: string;
}

export class AdditionalCatInfo {
  color: string;
}
```
我们可以生成一个新类型，它结合了两种类型的所有属性
```ts
export class UpdateCatDto extends IntersectionType(
  CreateCatDto,
  AdditionalCatInfo,
) {}
```
### 转换负载对象
通过网络传入的有效负载是纯 JavaScript 对象(如在前端传的是字符串"1"，但dto定义的是number时需要进行转换以防止报错)。`ValidationPipe` 可以自动将有效负载转换为根据其 DTO 类类型化的对象。要启用自动转换，请将 `transform` 设置为 `true`
```ts
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
  }),
);
```
然后，在`CreateUserDto`中定义转换规则
```ts
export class CreateCatDto {
  @IsNumber({}, { message: 'age is required' })
  @Type(()=>Number)
  age: number
}
```
同时，也可以这样，不使用`@Type()`启动转换，会出现`[Object Object]`的问题
```ts
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }),
);
```
### 剥离属性
`ValidationPipe` 还可以过滤掉不应由方法处理程序接收的属性。例如，接口里需要处理的是 `email` 和 `password` 属性，但是前端还传递了`age`属性，此时，设置`whitelist`为`true`即可去除`age`属性
```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
  }),
);
```
