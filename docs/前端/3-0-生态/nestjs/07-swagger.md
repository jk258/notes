# nestjs学习（七）swagger

在项目中，我们通常会为`开放 API`(开放 API 规范是一种与语言无关的定义格式，用于描述 RESTful API) 写对应的接口文档。Nest 提供了一个专用的 module，它允许通过利用装饰器生成这样的规范。

## 安装运行

首先我们安装所需的依赖：

```shell
npm install --save @nestjs/swagger
```

安装完成后，在`main.ts`中使用`SwaggerModule`并初始化 Swagger：

```ts
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder().setTitle('Cats example').setDescription('The cats API description').setVersion('1.0').addTag('cats').build()
	const documentFactory = () => SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, documentFactory)

	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
```

一般来说，我们在项目中都会统一返回数据格式，于是在 swagger 中我们也可以统一拦截，如下：

```ts
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

function docs(app) {
	const options = new DocumentBuilder().setTitle('Cats example').setDescription('The cats API description').setVersion('1.0').addTag('cats').build()
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
async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	docs(app)
	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
```
现在运行项目`npm run start`，并在浏览器并导航至 `http://localhost:3000/docs`，就会看到 Swagger UI了。  
同时，也可以通过`http://localhost:3000/docs-json`获取文档的 JSON 格式，引入到Apifox等其他平台中。
## 使用
nest swagger 模块提供了一些装饰器，用于生成文档。  
- 标签：要将控制器附加到特定标签，请使用 `@ApiTags(...tags)` 装饰器
  ```ts
  @ApiTags('cats')
  @Controller('cats')
  export class CatsController {}
  ```
- 标头：要定义预期作为请求一部分的自定义标头，请使用 `@ApiHeader()`
  ```ts
  @ApiHeader({
    name: 'X-MyHeader',
    description: 'Custom header',
  })
  @Controller('cats')
  export class CatsController {}
  ```
- 响应：要定义自定义 HTTP 响应，请使用 @ApiResponse() 装饰器
  ```ts
  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
  ```
- 要为请求指定返回模型或者指定请求模型，我们必须创建一个类并使用 `@ApiProperty()` 装饰器注释所有属性
  ```ts
  export class CreateCatDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    breed: string;
  }
  @ApiTags('cats')
  @Controller('cats')
  export class CatsController {
    @Post()
    @ApiCreatedResponse({
      description: 'The record has been successfully created.',
      type: CreateCatDto,
    })
    async create(@Body() createCatDto: CreateCatDto): Promise<CreateCatDto> {
      return this.catsService.create(createCatDto);
    }
  }
  ```
- 上传文件：使用 `@ApiBody` 装饰器和 `@ApiConsumes()` 为特定方法启用文件上传
  ```ts
  class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
  }
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  uploadFile(@UploadedFile() file) {}
  
  
  //多文件上传
  class FilesUploadDto {
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    files: any[];
  }
  ```
