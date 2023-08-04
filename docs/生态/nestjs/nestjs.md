## 简介

作者：Kamil Mysliwiec
nestjs 是一个用于构建高效、可扩展的`nodejs`服务器应用程序的开发框架。它利用`JavaScript` 的渐进增强的能力，使用并完全支持`TypeScript`（仍然允许开发者使用纯`JavaScript`进行开发），并结合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数响应式编程）。  
在底层，Nest 构建在强大的 HTTP 服务器框架上，例如[Express](https://expressjs.com/)（默认）,并且可以通过配置从而使用[Fastify](https://github.com/fastify/fastify)
Nest 在这些常见的 Node.js 框架（`Express/Fastify`）之上提高了一个抽象级别，但仍然向开发者直接暴露了底层框架的 API。这使得开发者可以自由地使用适用于底层平台的无数第三方模块

## 安装

使用[Nest cli](https://nestjs.bootcss.com/cli/overview)创建项目

```
npm i -g @nestjs/cli //安装
nest new project-name //新建项目
```

## 运行

```
npm run start //启动
npm run start:dev //监听文件更改
```

## nest-cli

## 命令

### nest g

| **姓名**    | **别名** | **描述**                         |
| ----------- | -------- | -------------------------------- |
| app         |          | 在 monorepo 中生成一个新应用程序 |
| constroller | co       | 生成控制器声明                   |
