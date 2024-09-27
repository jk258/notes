import{_ as s,c as a,a2 as t,o as n}from"./chunks/framework.D-H4MxKu.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"运行","slug":"运行","link":"#运行","children":[]},{"level":2,"title":"nest-cli","slug":"nest-cli","link":"#nest-cli","children":[]},{"level":2,"title":"命令","slug":"命令","link":"#命令","children":[{"level":3,"title":"nest g","slug":"nest-g","link":"#nest-g","children":[]}]}],"relativePath":"前端/3-生态/nestjs/1-nestjs.md","filePath":"前端/3-生态/nestjs/1-nestjs.md"}'),l={name:"前端/3-生态/nestjs/1-nestjs.md"};function r(i,e,d,o,c,p){return n(),a("div",null,e[0]||(e[0]=[t(`<h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p>作者：Kamil Mysliwiec nestjs 是一个用于构建高效、可扩展的<code>nodejs</code>服务器应用程序的开发框架。它利用<code>JavaScript</code> 的渐进增强的能力，使用并完全支持<code>TypeScript</code>（仍然允许开发者使用纯<code>JavaScript</code>进行开发），并结合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数响应式编程）。<br> 在底层，Nest 构建在强大的 HTTP 服务器框架上，例如<a href="https://expressjs.com/" target="_blank" rel="noreferrer">Express</a>（默认）,并且可以通过配置从而使用<a href="https://github.com/fastify/fastify" target="_blank" rel="noreferrer">Fastify</a> Nest 在这些常见的 Node.js 框架（<code>Express/Fastify</code>）之上提高了一个抽象级别，但仍然向开发者直接暴露了底层框架的 API。这使得开发者可以自由地使用适用于底层平台的无数第三方模块</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><p>使用<a href="https://nestjs.bootcss.com/cli/overview" target="_blank" rel="noreferrer">Nest cli</a>创建项目</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm i -g @nestjs/cli //安装</span></span>
<span class="line"><span>nest new project-name //新建项目</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="运行" tabindex="-1">运行 <a class="header-anchor" href="#运行" aria-label="Permalink to &quot;运行&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm run start //启动</span></span>
<span class="line"><span>npm run start:dev //监听文件更改</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="nest-cli" tabindex="-1">nest-cli <a class="header-anchor" href="#nest-cli" aria-label="Permalink to &quot;nest-cli&quot;">​</a></h2><p>nest生成curd模块，<code>—no-spec</code> 代表是否生成测试文件</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nest g res modules/category --no-spec</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="命令" tabindex="-1">命令 <a class="header-anchor" href="#命令" aria-label="Permalink to &quot;命令&quot;">​</a></h2><h3 id="nest-g" tabindex="-1">nest g <a class="header-anchor" href="#nest-g" aria-label="Permalink to &quot;nest g&quot;">​</a></h3><table tabindex="0"><thead><tr><th><strong>姓名</strong></th><th><strong>别名</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>app</td><td></td><td>在 monorepo 中生成一个新应用程序</td></tr><tr><td>constroller</td><td>co</td><td>生成控制器声明</td></tr></tbody></table>`,13)]))}const b=s(l,[["render",r]]);export{u as __pageData,b as default};
