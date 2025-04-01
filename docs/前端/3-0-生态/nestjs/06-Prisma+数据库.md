# nestjs学习（六）Prisma+数据库
Nest 与数据库无关，但我们可以轻松地与任何 SQL 或 NoSQL 数据库集成。同时也可以直接使用任何通用 Node.js 数据库集成库或 ORM。  
在这里我们使用 Prisma 作为数据库集成库，首先我们先了解一些 Prisma 的相关知识：

## Prisma 指南

### Prisma cli

#### 初始化

安装

```
npm install prisma @prisma/client --save-dev
```

初始化 sqlite

```
npx prisma init --datasource-provider sqlite
```

配置 model，初始化 model

```
npx prisma migrate dev --name init
```

初始化后项目根目录下回多出一个`prisma`文件夹，里面有对应的 model 文件`schema.prisma`和每次变换的记录`migrations`

#### Prisma Studio

Prisma 可视化操作

```
npx prisma studio
```

此操作会启动一个 web 服务，访问`http://localhost:5555`即可，通过访问此链接可以更加方便地操作数据

### 数据操作

#### 添加

添加一条数据

```ts
const newUser = await prisma.user.create({
	data: {
		email: 'test@test.com',
	},
})
```

添加多条数据

```ts
await prisma.user.createMany({
	data: [
		{
			email: 'test1@test.com',
		},
		{
			email: 'test2@test.com',
		},
	],
})
```

#### 修改

修改数据

```ts
await prisma.user.update({
	where: {
		email: 'test1@test.com',
	},
	data: {
		email: 'test5@test.com',
	},
})
```

修改数据,未找到时添加数据

```ts
const upsertUser = await prisma.user.upsert({
	where: {
		email: 'test4@test.com',
	},
	update: {
		email: 'test3@test.com',
	},
	create: {
		email: 'test4@test.com',
	},
})
```

#### 删除数据

```ts
await prisma.user.delete({
	where: {
		id: 1,
	},
})
```

#### 查找数据

查照全部

```ts
await prisma.user.findMany({})
```

查照特定条件

```ts
const users = await prisma.user.findMany({
	where: {
		email: 'test3@test.com',
	},
})
```

模糊查询

```ts
await prisma.user.findMany({
	where: {
		email: {
			contains: 'test',
		},
	},
})
```

小于`lt`,小于等于`lte`

```ts
const users = await prisma.user.findMany({
	where: {
		id: {
			lt: 3,
		},
	},
})
```

分页

```ts
// 从第skip(从0开始)条开始查询take条
await prisma.user.findMany({
	skip: 2,
	take: 2,
})
```

获取关联数据

```ts
await prisma.user.findMany({
	include: {
		posts: {
			select: {
				id: true,
				title: true,
			},
		},
	},
})
```
## nest 集成 Prisma
安装Prisma Cli依赖
```shell
npm install prisma --save-dev
```
使用Prisma Cli创建初始Prisma配置：
```shell
npx prisma init
```
如此会创建一个`prisma`目录，包含`schema.prisma`,并将数据库凭据存储在`.env`环境变量中  
数据库连接在 `schema.prisma` 文件的 `datasource` 块中配置，在本地测试的时候可以使用 `sqlite`，生产环境推荐使用 `postgresql` 或 `mysql`。`schema.prisma`文件如下:
```
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```
修改`.env`文件，添加数据库连接信息，如：
```
DATABASE_URL="file:./dev.db"
```
注意，这里需要配置`ConfigModule`  
将以下两个模型添加到 `schema.prisma` 文件中：
```
model User {
  id    Int     @default(autoincrement()) @id
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int      @default(autoincrement()) @id
  title     String
  content   String?
  published Boolean? @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```
然后使用Prisma Migrate生成 SQL 迁移文件
```shell
npx prisma migrate dev --name init
```
此时，会在`prisma`目录下生成一个`migrations`文件夹，里面有对应的迁移文件
### 安装并生成 Prisma Client
Prisma Client 是一种类型安全的数据库客户端，它是根据 Prisma 模型定义生成的。使用Prisma Client进行CURD操作。  
安装 Prisma Client
```shell
npm install @prisma/client
```
在 `src` 目录中，创建一个名为 `prisma.service.ts` 的新文件并向其中添加以下代码：
```typescript
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect()
	}
	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit' as never, async () => {
			await app.close()
		})
	}
}
```
在对应的模块中引入PrismaService，并注入到对应的模块中，如：
```typescript
...
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
	controllers: [AppController],
	providers: [AppService,PrismaService],
})
```
使用`constructor`注入就可以使用PrismaClient了，在`app.controller.ts`中：
```typescript
...
import { PrismaService } from 'src/prisma/prisma.service';

@Controller()
export class AppController {
	constructor(
    private prisma:PrismaService
	) {}
	@Get()
  async findAll() {
		return await this.prisma.user.findMany()
	}
}
```
