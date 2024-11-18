# nest 项目基本配置

## 目录

```
├─ root
|  ├─ prisma 数据库文件
|  ├─ ...
|  ├─ client spa网页
|  ├─ ...
|  ├─ src
|  |    ├─ common 公共模块
|  |    ├─ decorators
|  |    ├─ filtes 过滤器
|  |    ├─ interceptors 拦截器
|  |    ├─ pipes 管道
|  |    |  ├─ CustomValidationPipe.pipe.ts 自定义错误处理
|  ├─ config 配置
|  ├─ modules 业务模块
|  |  ├─ ...
|  ├─ prisma 数据库模块
|  |  ├─ ...
|  ├─ main.ts 入口文件
```

## 配置前缀

给接口配置`api`前缀，在`main.ts`中配置如下

```typescript{3}
async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	await app.listen(3000)
}
```

## 配置验证

安装[class-validator](https://github.com/typestack/class-validator)

```shell
npm i --save class-validator class-transformer
```

向 `dto` 中添加一些装饰器，如下

```typescript
import { IsString, IsInt } from 'class-validator'

export class CreateCatDto {
	@IsString()
	name: string

	@IsInt()
	age: number

	@IsString()
	breed: string
}
```

- 添加管道(`CustomValidationPipe.pipe.ts`)将错误信息转为更加友好的形式

  ```typescript
  import { ValidationPipe, ArgumentMetadata } from '@nestjs/common'

  import { BadRequestException } from '@nestjs/common'

  export class CustomValidationPipe extends ValidationPipe {
    async transform(value: any, metadata: ArgumentMetadata) {
      try {
        return await super.transform(value, metadata)
      } catch (error) {
        // 这里可以自定义错误处理，例如将错误信息转换为更友好的格式

        throw new BadRequestException(error.response.message[0], error.constraints)
      }
    }
  }
  ```

  在`main.ts` 中注册管道

  ```typescript{4}
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    ...
    app.useGlobalPipes(new CustomValidationPipe())
    ...
    await app.listen(3000);
  }
  ```
- 使用 nestjs 管道`ValidationPipe`
  ```typescript{4}
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    ...
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },//使参数类型转换(string '123'->number 123)
      }),
    )
    ...
    await app.listen(3000);
  }
  ```

## 添加拦截器

添加拦截器`transform.interceptor.ts` 规范返回数据格式

```typescript
import { CallHandler, ExecutionContext, NestInterceptor, Injectable, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((data) => {
				const result = {
					data: data,
					message: '成功',
					code: 200,
				}

				return result
			}),
		)
	}
}
```

在`main.ts` 注册

```typescript{4}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ...
  app.useGlobalInterceptors(new TransformInterceptor());
	...
  await app.listen(3000);
}
```

## 过滤器

添加异常过滤器`http-exception.filter.ts`,返回统一异常相应格式

```ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'
import { isArray } from 'class-validator'

/**
 * 异常过滤器 异常返回统一响应
 * 捕获作为HttpException类实例的异常，并为它们设置自定义响应逻辑
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name)
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		// 获取请求上下文中的 response对象
		const response = ctx.getResponse()

		// 获取异常状态码
		const status = exception.getStatus()
		const exceptionResponse = exception.getResponse() as any
		const exceptionMessage =
			exceptionResponse.message && isArray(exceptionResponse.message) ? exceptionResponse.message[0] : exceptionResponse.message || ''
		console.log(exceptionMessage)

		// 异常消息
		const message = exception.message ? exceptionMessage || exception.message : '网络错误，请稍后再试'
		this.logger.error(status + ' ' + message)
		// Response.json()方法，使用 Response对象直接控制发送的响应。
		response.status(status).json({
			code: status,
			message: message,
			data: null,
		})
	}
}
```

在`main.ts`注册

```typescript{3}
async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true })
	app.useGlobalFilters(new HttpExceptionFilter())
	await app.listen(3000)
}
```

## swagger 文档

安装

```shell
npm install --save @nestjs/swagger swagger-ui-express
```

在`main.ts`配置`swagger`并统一返回格式

```ts
function docs(app) {
	const options = new DocumentBuilder().setTitle('导航').setDescription('导航网站').setVersion('1.0').addTag('导航').build()
	const document = SwaggerModule.createDocument(app, options)
	for (const path of Object.keys(document.paths)) {
		const pathItem = document.paths[path]
		if (!pathItem) {
			continue
		}
		for (const method of Object.keys(pathItem)) {
			const responses = document.paths[path][method].responses
			if (!responses) {
				continue
			}
			for (const status of Object.keys(responses)) {
				const json = responses[status].content?.['application/json']
				if (!json) {
					responses[status].content = {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Response',
							},
						},
					}
					continue
				}
				const schema = json.schema
				json.schema = {
					allOf: [
						{
							$ref: '#/components/schemas/Response',
						},
						{
							type: 'object',
							properties: {
								data: schema,
							},
							required: ['data'],
						},
					],
				}
			}
		}
	}

	document.components.schemas.Response = {
		type: 'object',
		properties: {
			code: {
				type: 'integer',
				description: '状态码',
				example: 200,
				format: 'int32',
			},
			message: {
				type: 'string',
				description: '提示信息',
				example: '请求成功',
			},
		},
		required: ['code', 'message'],
	}
	SwaggerModule.setup('docs', app, document)
}
```

`swagger`文档如下

```typescript{8,13-18,26-32}
import { Controller, HttpStatus, Post,HttpCode, Request, UseGuards, Body, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { Public } from '@/common/decorators/index.decorator'
import { AuthDto, LoginResponse } from './dto/auth.dto'
import {  ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('用户认证')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @ApiResponse({
    status: 200,
    type: LoginResponse,
    description: '返回登录信息'
  })
	@HttpCode(HttpStatus.OK)
	@Post('login')
	@Public()
	signIn(@Body() signInDto: AuthDto) {
		return this.authService.signIn(signInDto.username, signInDto.password)
	}

	@ApiOperation({ summary: '获取用户信息' })
	@ApiHeader({
		name: 'authorization',
		description: '用户token',
		example: 'Bearer token',
		required: true,
	})
	@UseGuards(AuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user
	}
}
```

`LoginResponse`如下：

```typescript
export class LoginResponse {
	@ApiProperty({ description: '用户token' })
	access_token: string
}
```

## 添加配置

安装`@nestjs/config`

```shell
npm i --save @nestjs/config
```
在`app.module.ts`中初始化
```typescript{6,10-13}
import { Module } from '@nestjs/common'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

```
在`.env`里注册变量

```
AUTH_SECRET=*****
```

在模块中使用

```typescript{1,7-16}
import { ConfigService } from '@nestjs/config'
...
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
					secret: configService.get<string>('AUTH_SECRET'),
					global: true,
					signOptions: { expiresIn: '60s' },
				}
      },
      inject: [ConfigService],
		}),
	],
	...
})
export class AuthModule {}
```

## 静态服务
安装包`@nestjs/serve-static`
```sh
npm install --save @nestjs/serve-static
```
将`ServeStaticModule` 导入根 `AppModule`，并通过将配置对象传递给 forRoot() 方法来配置它
```TypeScript{4,9-11}
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


## 日志

安装winston

```
npm i nest-winston winston winston-daily-rotate-file
```

在app.module.ts注册nest-winston模块

```ts
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { WinstonModule } from 'nest-winston'
import type { WinstonModuleOptions } from 'nest-winston'
import { transports, format } from 'winston'
import 'winston-daily-rotate-file'

const NODE_ENV = process.env.NODE_ENV

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: NODE_ENV === 'development' ? '.env.development' : `.env.${NODE_ENV}`,
		}),
		WinstonModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				// 日志输出的管道
				const transportsList: WinstonModuleOptions['transports'] = [
					new transports.DailyRotateFile({
						level: 'error',
						dirname: `logs`,
						filename: `%DATE%-error.log`,
						datePattern: 'YYYY-MM-DD',
						maxSize: '20m',
					}),
					new transports.DailyRotateFile({
						dirname: `logs`,
						filename: `%DATE%-combined.log`,
						datePattern: 'YYYY-MM-DD',
						maxSize: '20m',
						format: format.combine(
							format((info) => {
								if (info.level === 'error') {
									return false // 过滤掉'error'级别的日志
								}
								return info
							})(),
						),
					}),
				]
				// 开发环境下，输出到控制台
				if (configService.get('NODE_ENV') === 'development') {
					transportsList.push(new transports.Console())
				}

				return {
					transports: transportsList,
				}
			},
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
```

ps:Winston的日志level等级的定义：

```ts
const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	verbose: 4,
	debug: 5,
	silly: 6,
}
```

### 请求中间件

```ts
import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

	use(req: Request, res: Response, next: NextFunction) {
		const { method, originalUrl, body, query, params, ip } = req

		// 记录日志
		this.logger.info('router', {
			req: {
				method,
				url: originalUrl,
				body,
				query,
				params,
				ip,
			},
		})

		next()
	}
}
```

去`app.module.ts`激活

```ts
export class AppModule {
	// 全局中间件
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*')
	}
}
```

### 响应日志

```ts
import { CallHandler, ExecutionContext, NestInterceptor, Injectable, HttpStatus, Inject } from '@nestjs/common'
import type { Response, Request } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

/**
 * 拦截器，统一返回格式
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
	constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()
		const code = response.statusCode
		const message = response.statusMessage
		return next.handle().pipe(
			map((data) => {
				let jsonData = { code: code, message: message || '成功', data: data ?? null }
				// 记录日志
				const { method, originalUrl, body, query, params, ip } = request
				this.logger.info('response', {
					req: {
						method,
						url: originalUrl,
						body,
						query,
						params,
						ip,
					},
					res: jsonData,
				})
				return jsonData
			}),
		)
	}
}
```

### 错误日志记录

我们找到全局的错误过滤器：http-exception.filter.ts

```ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject } from '@nestjs/common'
import type { Response, Request } from 'express'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
	constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()
		const code = response.statusCode
		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
		const message = exception instanceof HttpException ? exception.message : exception

		const { method, originalUrl, body, query, params, ip } = request
		this.logger.error('HttpException', {
			res: {
				code,
				status,
				message: message,
			},
			req: {
				method,
				url: originalUrl,
				body,
				query,
				params,
				ip,
			},
		})
		response.status(status).json({
			code: status,
			message: message,
		})
	}
}
```

在`app.module.ts`中注册

```ts
import { Module } from '@nestjs/common'
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor'
import { HttpExceptionsFilter } from '@/common/filters/http-exception.filter'

@Module({
	imports: [],
	controllers: [],
	providers: [
		{
			provide: 'APP_INTERCEPTOR',
			useClass: TransformInterceptor,
		},
		{
			provide: 'APP_FILTER',
			useClass: HttpExceptionsFilter,
		},
	],
})
export class AppModule {}
```

