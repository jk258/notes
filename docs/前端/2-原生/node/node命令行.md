# node命令行
在日常工作中我们会使用许多工具，例如：webpack、typescript、babel、tslint、eslint、prettier 等。我们可以从命令行访问所有这些工具，在这里我们将创建一个 CLI 工具的工作骨架。剩下的就是添加需要的特定逻辑

## 环境

介绍一下用到的环境和包版本

> node v22.17.0  
> npm 10.2.5
> 包版本
> "ajv": "^8.17.1",  
> "arg": "^5.0.2",  
> "better-ajv-errors": "^2.0.2",  
> "chalk": "^5.6.2",  
> "cosmiconfig": "^9.0.0",  
> "debug": "^4.4.3",  
> "package-up": "^5.0.0"

## 设置项目

首先创建两个文件夹`tool`和`toolProject`,在两个目录中运行 `npm init -y` 以创建空 `package.json` 文件  
在`tool`文件中，创建`bin/index.js`文件，并打印

```js
console.log("hello tool");
```

要执行 node 脚本，我们需要运行 node SCRIPT_NAME。在我们的例子中，我们希望能够在不显式调用节点的情况下运行该工具，就像我们执行 webpack、tsc 或 eslint 一样。  
我们在文件顶部放置一个 hashbang 指令，说明将使用哪个解释器来执行我们的脚本。

```js
#!/usr/bin/env node

console.log("hello tool");
```

在 `tool` 项目的 `package.json` 中，我们需要将新创建的入口点脚本配置为包的二进制文件。在配置中设置 bin 属性，其值为该脚本文件的路径。同时，将 esmodule 设置为项目模块类型

```json
{
  "name": "tool",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": "./bin/index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

在之前创建的测试项目中测试我们的工具。为此，我们需要在 `testProject` 目录中安装我们的工具包。 我们将使用 `npm link` 来模拟安装。  
运行`tool`命令，可以看到输出

```
hello tool
```

## 解析命令行参数

我们希望我们的工具能够运行多个命令。为此，我们需要能够使用各种参数运行该工具
我们可以使用节点内置的 `process.argv` 属性来处理它们。将`index.js`中的内容替换如下

```js
#!/usr/bin/env node

console.log(process.argv);
```

运行`tool --start`，可以看到返回的是一个数组

```
[
  'D:\\files\\nodejs\\node.exe',
  'D:\\files\\nvm\\npm\\node_global\\node_modules\\tool\\bin\\index.js',
  '--start'
]
```

我们可以使用 `node` 的 `process.argv` 属性，但存在多个库，可以使我们获取参数更轻松一点。该领域最简单的库之一是 arg。安装 arg

```
npm install arg
```

arg 接收一个配置对象，该对象说明它可以接收哪些参数及其类型,如下

```js
import arg from "arg";

const args = arg({
  "--start": Boolean,
  "--build": Boolean,
});
if (args["--start"]) {
  console.log("starting the app");
}
```

此时我们执行`tool --start`会输入`starting the app`，如果执行其他命令如`tool --publish`会报错

```
C:\Users\18135\Desktop\tool-tutorial\tool\node_modules\arg\index.js:132
                                                throw new ArgError(
                                                      ^

ArgError: unknown or unexpected option: --pubilsh
```

让我们处理一下这个报错

```js
#!/usr/bin/env node
import arg from "arg";

try {
  const args = arg({
    "--start": Boolean,
    "--build": Boolean,
  });
  if (args["--start"]) {
    console.log("starting the app");
  }
} catch (e) {
  console.log(e.message);
  usage();
}

function usage() {
  console.log(`
  Usage: tool [options]
  Options:
    --start       Start the application
    --build       Build the application
  `);
}
```

此时在执行`tool --pubilsh`提示如下

```
unknown or unexpected option: --pubilsh

  Usage: tool [options]
  Options:
    --start       Start the application
    --build       Build the application
```

## 开发体验

在可视化应用中，用户体验（UX）如同承重支柱般关键；而在为开发者打造工具时，开发体验（DX）同样扮演着这样的角色。

优良的 DX 体现在多个方面：工具使用时的愉悦感、更清晰的错误提示、减少不必要的猜测、完善的文档支持，以及流畅敏捷的操作反馈。归根结底，好的开发体验旨在最大化开发价值，同时最大限度地减少时间浪费。

### chalk 配置

使用`chalk`包来为`console.log`添加颜色。安装`chalk`

```
npm i chalk
```

在`index.js`添加`chalk`

```js
#!/usr/bin/env node
import arg from "arg";
import chalk from "chalk";

try {
  const args = arg({
    "--start": Boolean,
    "--build": Boolean,
  });

  if (args["--start"]) {
    console.log(chalk.bgCyanBright("starting the app"));
  }
} catch (e) {
  console.log(chalk.yellow(e.message));
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright("tool [CMD]")}
  ${chalk.greenBright("--start")}\tStarts the app
  ${chalk.greenBright("--build")}\tBuilds the app`);
}
```

### 自定义配置 1(package-up)

大多数工具都可以由用户配置，最佳做法是让工具通过 `package.json` 中的属性进行配置
在`toolProject`的`package.json`中添加以下属性

```json
{
  ...
  "tool": {
    "port": 9999
  }
}
```

然后使用 pkg-up 来查找`package.json`文件，pkg-up 会在目录树并查找 `package.json` 文件并返回其路径

```
npm install pkg-up
```

在`index.js`中获取

```js
#!/usr/bin/env node
import arg from 'arg';
import chalk from 'chalk';
import { packageUp } from 'package-up';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

try {
  const args = arg({
    '--start': Boolean,
    '--build': Boolean,
  });

  if (args['--start']) {
    console.log(chalk.bgCyanBright('starting the app'));
    const pkgPath = await packageUp({ cwd: process.cwd() });
    const pkg = require(pkgPath);
    if (pkg.tool) {
      console.log("Found configuration", pkg.tool);
    } else {
      console.log(chalk.yellow("Could not find configuration, using default"));
    }
  }
} catch (e) {
  ...
}
```

此时执行`tool --start`,输入

```
Found configuration { port: 9999 }
```

### 重构

到了这里，让我们稍微重构以下我们的代码  
在`tool`中创建`src`目录，并在`src`下创建`commands/start.js`和`config/comfig-mgr.js`  
`start.js`文件内容如下

```js
import chalk from "chalk";

export default function start(config) {
  console.log(chalk.bgCyanBright("  Starting the app  "));
  console.log(chalk.gray("Received configuration in start -"), config);
}
```

`comfig-mgr.js`内容如下

```js
import chalk from "chalk";
import { packageUp } from "package-up";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

export default async function getConfig() {
  const pkgPath = await packageUp({ cwd: process.cwd() });
  const pkg = require(pkgPath);
  if (pkg.tool) {
    console.log("Found configuration", pkg.tool);
    return pkg.tool;
  } else {
    console.log(chalk.yellow("Could not find configuration, using default"));
    return { port: 1234 };
  }
}
```

同时，将`index.js`简化为

```js
#!/usr/bin/env node
import arg from "arg";
import chalk from "chalk";
import getConfig from "../src/config/config-mgr.js";
import start from "../src/commands/start.js";

try {
  const args = arg({
    "--start": Boolean,
    "--build": Boolean,
  });

  if (args["--start"]) {
    const config = await getConfig();
    start(config);
  }
} catch (e) {
  console.log(chalk.yellow(e.message));
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright("tool [CMD]")}
  ${chalk.greenBright("--start")}\tStarts the app
  ${chalk.greenBright("--build")}\tBuilds the app`);
}
```

### 自定义配置 2(cosmiconfig)

在上面，我们通过 `package.json` 文件配置了我们的工具，但大多数工具都有多种配置方式。其中一种方法是 Javascript 配置文件  
我们可以在 `config-mgr` 中添加另一个条件来搜索和读取 Javascript 配置文件。让我们使用 cosmiconfig 包替换我们的 package-up 逻辑。cosmiconfig 支持配置处理的许多不同方面，例如其他文件格式、异步搜索、缓存等  
安装 cosmiconfig

```sh
npm i cosmiconfig
```

`config-mgr`修改如下

```js
import chalk from "chalk";
import { cosmiconfigSync } from "cosmiconfig";
const configLoader = cosmiconfigSync("tool");

export default async function getConfig() {
  const result = configLoader.search(process.cwd());
  if (!result) {
    console.log(chalk.yellow("Could not find configuration, using default"));
    return { port: 1234 };
  } else {
    console.log("Found configuration", result.config);
    return result.config;
  }
}
```

现在在`toolProject`项目中创建一个名为`tool.config.js`的文件，如下：

```js
module.exports = {
  port: 6666,
};
```

注意，这里要删除`toolProject/package.json`文件中的`tool`属性  
然后执行`tool --start`可以看到输出如下：

```
Found configuration { port: 6666 }
  Starting the app
Received configuration in start - { port: 6666 }
```

### 验证

由于配置来自用户输入，我们不能相信它的有效性。验证它的一种方法是使用自定义代码检查配置对象中的每个属性和子属性。这里我们将使用一个名为 ajv 的库，它根据 Json 模式验证配置

让我们首先创建架构。在 `tool/src/config` 目录中创建一个名为 `schema.json` 的新文件，然后输入以下代码。我们定义端口属性的唯一有效类型是数字

```json
{
  "properties": {
    "port": {
      "type": "number"
    }
  }
}
```

安装`ajv`

```sh
npm i ajv
```

修改`config-mgr.js`

```js
import chalk from "chalk";
import { cosmiconfigSync } from "cosmiconfig";
import Ajv from "ajv";
import  schema from "./schema.json" with { type: "json" };
const ajv = new Ajv();
const configLoader = cosmiconfigSync("tool");

export default async function getConfig() {
  const result = configLoader.search(process.cwd());
  if (!result) {
    console.log(chalk.yellow("Could not find configuration, using default"));
    return { port: 1234 };
  } else {
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      console.log(chalk.yellow("Invalid configuration was supplied"));
      console.log(ajv.errors);
      process.exit(1);
    }
    console.log("Found configuration", result.config);
    return result.config;
  }
}
```

将`toolProject/tool.config.js`中的`prot`改为字符串，运行命令，可以看到如下错误

```
Invalid configuration was supplied
[
  {
    instancePath: '/port',
    schemaPath: '#/properties/port/type',
    keyword: 'type',
    params: { type: 'number' },
    message: 'must be number'
  }
]
```

让我们使用 better-ajv-errors 包使返回得错误更语义化

```
npm i better-ajv-errors
```

在`config-mgr.js`中

```js
...
import betterAjvErrors from 'better-ajv-errors';
...
export default async function getConfig() {
  ...
  console.log(betterAjvErrors(schema, result.config, ajv.errors));
  ...
}
```

此时输出如下

```
Invalid configuration was supplied
TYPE must be number

> 1 | {"port":"6666"}
    |         ^^^^^^ 👈🏽  type must be number
```

### logger

到目前为止，我们在代码中散布了各种 console.log 语句。有些 console.log 是面向用户的，有些是调试的，有些是信息性的，有些是警告性的。让我们处理一下

在 `tool/src` 下创建一个名为 `logger.js` 的文件。此文件将返回一个记录器函数，该函数接收名称并返回记录器对象。我们将创建不同类型的消息，每种消息都有不同的颜色。

```js
import chalk from "chalk";

export default function (name) {
  return {
    log: (...args) => console.log(chalk.gray(...args)),
    warning: (...args) => console.log(chalk.yellow(...args)),
    highlight: (...args) => console.log(chalk.bgCyanBright(...args)),
    debug: console.log,
  };
}
```

修改`config-mgr.js`

```js
import { cosmiconfigSync } from "cosmiconfig";
import Ajv from "ajv";
import betterAjvErrors from 'better-ajv-errors';
import schema from "./schema.json" with { type: "json" };
import createLogger from "../logger.js";
const logger = createLogger('config:mgr');
const ajv = new Ajv();
const configLoader = cosmiconfigSync("tool");

export default async function getConfig() {
  const result = configLoader.search(process.cwd());
  if (!result) {
    logger.warning('Could not find configuration, using default');
    return { port: 1234 };
  } else {
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      logger.warning('Invalid configuration was supplied');
      console.log(betterAjvErrors(schema, result.config, ajv.errors));
      process.exit(1);
    }
    logger.debug('Found configuration', result.config);
    return result.config;
  }
}

```

修改`start.js`

```js
import createLogger from "../logger.js";
const logger = createLogger("start");

export default function start(config) {
  logger.highlight("  Starting the app  ");
  logger.debug("Received configuration", config);
}
```

修改`bin/index.js`

```
#!/usr/bin/env node
import arg from 'arg';
import chalk from 'chalk';
import createLogger from "../src/logger.js";
const logger = createLogger("bin");
import getConfig from '../src/config/config-mgr.js';
import start from '../src/commands/start.js';

try {
  const args = arg({
    '--start': Boolean,
    '--build': Boolean,
  });

  logger.debug("Received args", args);

  if (args['--start']) {
    const config = await getConfig();
    start(config);
  }
} catch (e) {
  logger.warning(e.message);
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app`);
}

```

运行命令后，我们将看到和以前相同的日志。让我们更近一步，安装`debug`

```
npm i debug
```

`logger.js`改为

```js
import chalk from "chalk";
import debug from "debug";

export default function (name) {
  return {
    log: (...args) => console.log(chalk.gray(...args)),
    warning: (...args) => console.log(chalk.yellow(...args)),
    highlight: (...args) => console.log(chalk.bgCyanBright(...args)),
    debug: debug(name),
  };
}
```

此时，当我们现在运行我们的工具时，我们只会看到这个面向用户的消息。调试日志是隐藏的，直到我们需要调试代码

```
tool-tutorial/testProject$ tool --start
Starting the app
```

如果我们使用名为 `DEBUG` 的环境变量运行我们的工具，就可以触发调试包的日志

```sh
tool-tutorial/testProject$ DEBUG=* tool --start
bin Received args { _: [], '--start': true } +0ms
config:mgr Found configuration { port: 6666 } +0ms
  Starting the app
commands:start received configuration { port: 6666 } +0ms
```

debug 还允许我们通过命名环境变量来过滤日志,如下

```
DEBUG=commands:*       启用所有以 "commands:" 开头的调试命名空间
DEBUG=commands:*,bin   启用 commands:* 和 bin 两个调试命名空间
DEBUG=*,-bin tool      启用所有调试信息，但排除 bin 相关的
```

注意，在 window 上不支持`DEBUG`的直接使用，我们可以使用 cross-env

```
npm install -g cross-env
cross-env DEBUG=* tool --start
```

到这里，我们就有一个基本的用于命令行工具的工作骨架了  

项目地址：[https://github.com/jk258/tool-tutorial-demo](https://github.com/jk258/tool-tutorial-demo)
