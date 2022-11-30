# 简介
作者：Kamil Mysliwiec
nestjs是一个用于构建高校、可扩展的`nodejs`服务器应用程序的开发框架。它利用`JavaScript` 的渐进增强的能力，使用并完全支持`TypeScript`（仍然允许开发者使用纯`JavaScript`进行开发），并结合了OOP（面向对象编程）、FP（函数式编程）和FRP（函数响应式编程）
在底层，Nest构建在强大的HTTP服务器框架上，例如[Express](https://expressjs.com/)（默认）,并且可以通过配置从而使用[Fastify](https://github.com/fastify/fastify)
Nest在这些常见的Node.js框架（`Express/Fastify`）之上提高了一个抽象级别，但仍然向开发者直接暴露了底层框架的API。这使得开发者可以自由地使用适用于底层平台的无数第三方模块
# 安装
使用[Nest cli](https://nestjs.bootcss.com/cli/overview)创建项目
```typescript
npm i -g @nestjs/cli
nest new project-name
```
# nest-cli
## 命令
### nest g
| **姓名** | **别名** | **描述** |
| --- | --- | --- |
| app  |  | 在monorepo中生成一个新应用程序 |
| constroller | co  | 生成控制器声明 |

# 概述
## 控制器
控制器负责处理传入的请求并将响应返回给客户端
### 请求
如下：
```typescript
import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll() {
        return 'this is all coffees'
    }
}
```
### 动态参数

- @Param：需要接受动态数据作为请求的一部分时（`GET /coffees/1`），可以使用 `@Param` 装饰器访问访问`@Get(:id)`声明的路由参数，如下：
```typescript
@Get(':id')
findOne(@Param() param) {
	return `this action return #${param.id} coffees`
}
//or
@Get(':id')
findOne(@Param('id') id:string) {
	return `this action return #${id} coffees`
}
```

- @Body：需要接受动态数据`body`（`POST /coffess`）,可以使用`@Body`装饰器访问`@Post`的路由参数，如下：
```typescript
@Post()
create(@Body() body) {
	return body
}
//or
@Post()
create(@Body("name") body) {
	return body
}
```
