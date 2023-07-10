import{_ as s,o as n,c as a,U as l}from"./chunks/framework.254ce20d.js";const C=JSON.parse('{"title":"js api","description":"","frontmatter":{},"headers":[{"level":2,"title":"js 点击其他元素关闭选中元素","slug":"js-点击其他元素关闭选中元素","link":"#js-点击其他元素关闭选中元素","children":[]},{"level":2,"title":"app和h5交互","slug":"app和h5交互","link":"#app和h5交互","children":[{"level":3,"title":"ios","slug":"ios","link":"#ios","children":[]}]},{"level":2,"title":"取色，滴管工具（EyeDropper）","slug":"取色-滴管工具-eyedropper","link":"#取色-滴管工具-eyedropper","children":[]},{"level":2,"title":"富文本","slug":"富文本","link":"#富文本","children":[]}],"relativePath":"原生/js相关/js api.md","filePath":"原生/js相关/js api.md"}'),p={name:"原生/js相关/js api.md"},e=l(`<h1 id="js-api" tabindex="-1">js api <a class="header-anchor" href="#js-api" aria-label="Permalink to &quot;js api&quot;">​</a></h1><h2 id="js-点击其他元素关闭选中元素" tabindex="-1">js 点击其他元素关闭选中元素 <a class="header-anchor" href="#js-点击其他元素关闭选中元素" aria-label="Permalink to &quot;js 点击其他元素关闭选中元素&quot;">​</a></h2><p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath" target="_blank" rel="noreferrer">Event.composedPath()</a>：获取元素路径判断</p><h2 id="app和h5交互" tabindex="-1">app和h5交互 <a class="header-anchor" href="#app和h5交互" aria-label="Permalink to &quot;app和h5交互&quot;">​</a></h2><h3 id="ios" tabindex="-1">ios <a class="header-anchor" href="#ios" aria-label="Permalink to &quot;ios&quot;">​</a></h3><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">webkit</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">messageHandlers</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">[事件名]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">postMessage</span><span style="color:#A6ACCD;">(参数)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="取色-滴管工具-eyedropper" tabindex="-1">取色，滴管工具（EyeDropper） <a class="header-anchor" href="#取色-滴管工具-eyedropper" aria-label="Permalink to &quot;取色，滴管工具（EyeDropper）&quot;">​</a></h2><p>文档：<a href="https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper" target="_blank" rel="noreferrer">https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper</a></p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">start-button</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Open the eyedropper</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">result</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">start-button</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">click</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">resultElement</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">result</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">EyeDropper</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#A6ACCD;">resultElement</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">textContent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Your browser does not support the EyeDropper API</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#89DDFF;font-style:italic;">return</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">eyeDropper</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">EyeDropper</span><span style="color:#F07178;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#A6ACCD;">eyeDropper</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">open</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">result</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">				</span><span style="color:#A6ACCD;">resultElement</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">textContent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">sRGBHex</span></span>
<span class="line"><span style="color:#F07178;">				</span><span style="color:#A6ACCD;">resultElement</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">backgroundColor</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">sRGBHex</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">catch</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">e</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">				</span><span style="color:#A6ACCD;">resultElement</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">textContent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">e</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h2 id="富文本" tabindex="-1">富文本 <a class="header-anchor" href="#富文本" aria-label="Permalink to &quot;富文本&quot;">​</a></h2><ul><li>contenteditable：枚举属性，表明元素是否可被用户编辑</li><li>Selection： <ul><li>用户选择的文本范围或插入符号的当前位置</li><li>文本选区由用户拖拽鼠标经过文字而产生，可能横跨多个元素</li><li>光标有用户点击产生，表示当前插入的位置<code>window.getSelection()</code>获取</li></ul></li><li>execCommand： <ul><li>编辑模式下，document 暴露的方法</li><li>运行命令来操作可编辑内容区域的元素</li><li>大多数命令影响 selection 区域内的元素</li></ul></li></ul>`,11),o=[e];function t(r,c,F,y,i,D){return n(),a("div",null,o)}const u=s(p,[["render",t]]);export{C as __pageData,u as default};
