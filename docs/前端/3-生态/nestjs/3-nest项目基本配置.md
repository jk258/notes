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

# 配置验证

安装[class-validator](https://github.com/typestack/class-validator)

```shell
npm i --save class-validator class-transformer
```

向 dto 中添加一些装饰器，如下

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

添加管道(`CustomValidationPipe.pipe.ts`)将错误信息转为更加友好的形式

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


## 添加配置

安装`@nestjs/config`

```shell
npm i --save @nestjs/config
```
