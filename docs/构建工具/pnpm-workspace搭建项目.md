# pnpm-workspace 搭建项目

## 安装 pnpm

```javascript
npm i -g pnpm
pnpm init
```

## [初始化 pnpm-workspace.yaml](https://www.pnpm.cn/pnpm-workspace_yaml)

新建`pnpm-workspace.yaml`

```
packages:
  # all packages in direct subdirs of packages/
  - 'packages/*'
  # all packages in subdirs of components/
  - 'components/**'
  # exclude packages that are inside test directories
  - '!**/test/**'
```
## 定义开发规范
### 代码规范检查与修复(eslint)
安装并初始化
```
pnpm i eslint -D -w
npx eslint --init -w
```
生成`.eslintrc.json`如下
```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    }
}
```
::: warning
如果使用`typescript`需要先安装`typescript`相关插件
```
pnpm i @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript -D -w
```
:::
### 代码风格: prettier
安装
```
pnpm i prettier -D -w
```
添加配置`.prettierrc.json`
```json
{
    "printWidth":150,
    "tabWidth": 2,
    "useTabs":true,
    "semi": false,
    "singleQuote":true,
    "quoteProps":"as-needed",
    "jsxSingleQuote":true,
    "trailingComma":"all",
    "bracketSpacing":true,
    "jsxBracketSameLine":true,
    "arrowParens":"always",
    "requirePragma":false,
    "insertPragma":false,
    "proseWrap":"preserve",
    "htmlWhitespaceSensitivity":"ignore",
    "vueIndentScriptAndStyle":false,
    "endOfLine":"lf",
    "embeddedLanguageFormatting":"auto",
    "bracketSameLine": true,
    "cursorOffset": -1,
    "overrides": [],
    "plugins": []
}
```

将`prettier`集成到`eslint`中,其中
* `eslint-config-prettier`：覆盖`ESLint`本身的规则配置
* `eslint-plugin-prettier`：用`Prettier`来接管修复代码即`eslint --fix`
```
pnpm i eslint-config-prettier eslint-plugin-prettier -D -w
```
为`lint`增加对应的执行脚本
```
"lint": "eslint --ext .ts,.jsx,.tsx --fix --quiet ./packages"
```
### commit规范检查
安装`husky`,用于拦截commit命令
```
pnpm i husky -D -w
```
初始化`husky`
```
npx husky install
```
将格式化命令`pnpm lint`纳入commit时`husky`执行的脚本
```
npx husky add .husky/pre-commit "pnpm lint"
```
::: warning
`pnpm`lint会对代码全量检查，当项目复杂后执行速度可能比较慢，届时可以考虑使用`lint-staged`，实现只对暂存区代码进行检查
:::

通过`commitlint`对`git`提交信息进行检查，首先安装相关库
```
pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D -w
```
新建配置文件`.commitlintrc.js`
```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"]
}; 
```
集成到`husky`中
```
npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"
```
conventional规范集意义：
```javascript
// 提交的类型: 摘要信息
<type>: <subject>
```
常见的`type`如下
* feat: 添加新功能
* fix: 修复 Bug
* chore: 一些不影响功能的更改
* docs: 专指文档的修改
* perf: 性能方面的优化
* refactor: 代码重构
* test: 添加一些测试代码等等
## 打包工具
比较不同打包工具的区别 参考资料：[Overview | Tooling.Report](https://bundlers.tooling.report/)我们要开发的项目的特点：
