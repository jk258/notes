import{_ as s,c as a,o as i,a4 as n}from"./chunks/framework.DdZcq5U1.js";const g=JSON.parse('{"title":"问题","description":"","frontmatter":{},"headers":[{"level":2,"title":"去掉控制台warning警告","slug":"去掉控制台warning警告","link":"#去掉控制台warning警告","children":[]},{"level":2,"title":"electron请求跨域问题","slug":"electron请求跨域问题","link":"#electron请求跨域问题","children":[]}],"relativePath":"前端/3-生态/electron/问题.md","filePath":"前端/3-生态/electron/问题.md"}'),e={name:"前端/3-生态/electron/问题.md"},l=n(`<h1 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-label="Permalink to &quot;问题&quot;">​</a></h1><h2 id="去掉控制台warning警告" tabindex="-1">去掉控制台warning警告 <a class="header-anchor" href="#去掉控制台warning警告" aria-label="Permalink to &quot;去掉控制台warning警告&quot;">​</a></h2><p>在main.js(主进程)设置<code>process.env[&#39;ELECTRON_DISABLE_SECURITY_WARNINGS&#39;] = &#39;true</code></p><h2 id="electron请求跨域问题" tabindex="-1">electron请求跨域问题 <a class="header-anchor" href="#electron请求跨域问题" aria-label="Permalink to &quot;electron请求跨域问题&quot;">​</a></h2><p>设置<code>webSecurity: false</code></p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> mainWindow</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BrowserWindow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  width: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">900</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  height: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">670</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  webPreferences: {</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    webSecurity: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,6),t=[l];function r(p,h,c,d,o,k){return i(),a("div",null,t)}const u=s(e,[["render",r]]);export{g as __pageData,u as default};
