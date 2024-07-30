import{_ as i,c as a,o as n,V as e}from"./chunks/framework.jEbjPO8a.js";const _=JSON.parse('{"title":"Init函数和main函数","description":"","frontmatter":{},"headers":[{"level":2,"title":"init函数","slug":"init函数","link":"#init函数","children":[]},{"level":2,"title":"main函数","slug":"main函数","link":"#main函数","children":[]},{"level":2,"title":"init函数和main函数的异同","slug":"init函数和main函数的异同","link":"#init函数和main函数的异同","children":[]}],"relativePath":"go/1-基础/1-03init函数和main函数.md","filePath":"go/1-基础/1-03init函数和main函数.md"}'),t={name:"go/1-基础/1-03init函数和main函数.md"},l=e(`<h1 id="init函数和main函数" tabindex="-1">Init函数和main函数 <a class="header-anchor" href="#init函数和main函数" aria-label="Permalink to &quot;Init函数和main函数&quot;">​</a></h1><h2 id="init函数" tabindex="-1">init函数 <a class="header-anchor" href="#init函数" aria-label="Permalink to &quot;init函数&quot;">​</a></h2><p>go语言中<code>init</code>函数用于包(package)的初始化，该函数是go语言的一个重要特性，其特征如下：</p><ul><li>init函数是用于程序执行前做包的初始化的函数，比如初始化包里的变量等</li><li>每个包可以拥有多个init函数</li><li>包的每个源文件也可以拥有多个init函数</li><li>同一个包中多个init函数的执行顺序go语言没有明确的定义(说明)</li><li>不同包的init函数按照包导入的依赖关系决定该初始化函数的执行顺序</li><li>init函数不能被其他函数调用，而是在main函数执行之前，自动被调用</li></ul><h2 id="main函数" tabindex="-1">main函数 <a class="header-anchor" href="#main函数" aria-label="Permalink to &quot;main函数&quot;">​</a></h2><p>Go语言程序的默认入口函数(主函数)：<code>func main()</code> 函数体用<code>{}</code>一对括号包裹。</p><div class="language-go vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //函数体</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="init函数和main函数的异同" tabindex="-1">init函数和main函数的异同 <a class="header-anchor" href="#init函数和main函数的异同" aria-label="Permalink to &quot;init函数和main函数的异同&quot;">​</a></h2><p>相同点：两个函数在定义时不能有任何的参数和返回值，且Go程序自动调用。<br> 不同点：</p><ul><li>init可以应用于任意包中，且可以重复定义多个。</li><li>main函数只能用于main包中，且只能定义一个。</li></ul><p>两个函数的执行顺序：</p><ul><li>对同一个go文件的<code>init()</code>调用顺序是从上到下的。</li><li>对同一个package中不同文件是按文件名字符串比较“从小到大”顺序调用各文件中的init()函数。</li><li>对于不同的package，如果不相互依赖的话，按照main包中&quot;先import的后调用&quot;的顺序调用其包中的init()，如果package存在依赖，则先调用最早被依赖的package中的init()，最后调用main函数。</li><li>如果init函数中使用了<code>println()</code>或者<code>print()</code>你会发现在执行过程中这两个不会按照你想象中的顺序执行。这两个函数官方只推荐在测试环境中使用，对于正式环境不要使用。</li></ul>`,12),s=[l];function o(r,c,p,d,h,m){return n(),a("div",null,s)}const k=i(t,[["render",o]]);export{_ as __pageData,k as default};
