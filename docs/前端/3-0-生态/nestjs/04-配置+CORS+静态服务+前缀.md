# nestjs 学习(四)，配置+CORS+静态服务+前缀
## 配置
应用通常运行不同的环境中，根据环境，应使用不同的配置设置。在 Node.js 应用中，通常使用 .env 文件，保存键值对，其中每个键代表一个特定值，以表示每个环境。  
在nestjs中，提供了开箱即用的`@nestjs/config`包  
安装`@nestjs/config`包
```bash
npm install --save @nestjs/config 
```
安装完成后，我们可以在`AppModule`中导入`ConfigModule`
```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
```
此时，代码将从默认位置（项目根目录）加载和解析 `.env` 文件，将 `.env` 文件中的键/值对与分配给 `process.env` 的环境变量合并，并将结果存储在私有结构中，我们可以通过 `ConfigService`访问`.env`中的环境变量。如下：  
我们将`ConfigModule`导入`CatsModule`
```ts
import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[ConfigModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```
或者在`AppModule`配置`isGlobal`选项为true`
```ts
ConfigModule.forRoot({
  isGlobal: true,
})
```
然后就可以通过`ConfigService`来访问配置值，使用标准构造函数来注入它：
```ts
constructor(private configService: ConfigService) {}
```
在代码中获取配置值。
```ts
const dbUser = this.configService.get<string>('DATABASE_USER');
const dbHost = this.configService.get<string>('database.host', 'localhost');//如果没有配置，则使用默认值localhost
```
我们可以像这样为 .env 文件指定多个路径：
```ts
ConfigModule.forRoot({
  envFilePath: ['.env.development.local', '.env.development'],
});
```
由于访问 `process.env` 可能很慢，我们可以设置 `ConfigModule.forRoot()` 选项中的 `cache` 属性，以提高 `ConfigService#get` 方法在涉及存储在 `process.env` 中的变量时的性能
```ts
ConfigModule.forRoot({
  cache: true,
});
```
## CORS
跨源资源共享 (CORS) 是一种允许从另一个域请求资源的机制。在底层，Nest 根据底层平台使用 Express cors 或 Fastify @fastify/cors 软件包。  
在nestjs中进行配置：
```ts
const app = await NestFactory.create(AppModule, { cors: true });
await app.listen(process.env.PORT ?? 3000);
```
或者
```ts
const app = await NestFactory.create(AppModule);
app.enableCors();
await app.listen(process.env.PORT ?? 3000);
```
`enableCors()` 方法采用可选的配置对象参数。该对象的可用属性在[CORS](https://github.com/expressjs/cors#configuration-options)文档中进行了描述，比如：
```ts
app.enableCors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
})
```
## 静态服务
为了像单页应用 (SPA) 一样提供静态内容，我们可以使用 `@nestjs/serve-static` 包中的 `ServeStaticModule`  
首先安装`@nestjs/serve-static`包
```bash
npm install --save @nestjs/serve-static
```

安装完成后，我们可以将 `ServeStaticModule` 导入到根 `AppModule` 中，并通过将配置对象传递给 `forRoot()` 方法来对其进行配置
```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
现在，把静态网站的资源放在`rootpath`指定的目录下，就可以访问了  
`ServeStaticModule`的配置可以在[这里](https://github.com/nestjs/serve-static/blob/master/lib/interfaces/serve-static-options.interface.ts)查看

## 全局前缀
使用 `setGlobalPrefix()` 设置的路由的全局前缀
```ts
app.setGlobalPrefix('/api')
```
这样访问的路由路径就会从`/cats`变成`/api/cats`
