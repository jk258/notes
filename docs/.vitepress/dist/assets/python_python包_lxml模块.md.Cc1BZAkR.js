import{_ as s,c as i,o as a,V as n}from"./chunks/framework.BbAbY5cn.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"etree","slug":"etree","link":"#etree","children":[{"level":3,"title":"Element","slug":"element","link":"#element","children":[]},{"level":3,"title":"tostring()","slug":"tostring","link":"#tostring","children":[]},{"level":3,"title":"XML()/HTML()","slug":"xml-html","link":"#xml-html","children":[]}]},{"level":2,"title":"xpath","slug":"xpath","link":"#xpath","children":[{"level":3,"title":"基本语法","slug":"基本语法","link":"#基本语法","children":[]},{"level":3,"title":"实例","slug":"实例","link":"#实例","children":[]}]},{"level":2,"title":"lxml.cssselect","slug":"lxml-cssselect","link":"#lxml-cssselect","children":[{"level":3,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":3,"title":"实例","slug":"实例-1","link":"#实例-1","children":[]}]}],"relativePath":"python/python包/lxml模块.md","filePath":"python/python包/lxml模块.md"}'),t={name:"python/python包/lxml模块.md"},l=n(`<p>lxml 是一种使用 Python 编写的库，可以迅速、灵活地处理 XML 和 HTML</p><p>安装</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>pip install lxml ||</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pip install lxml -i http://pypi.douban.com/simple/ --trusted-host http://pypi.douban.com  #代理</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="etree" tabindex="-1">etree <a class="header-anchor" href="#etree" aria-label="Permalink to &quot;etree&quot;">​</a></h2><h3 id="element" tabindex="-1">Element <a class="header-anchor" href="#element" aria-label="Permalink to &quot;Element&quot;">​</a></h3><p>使用Element类来创建xml内容</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lxml </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> etree</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">root </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> etree.Element(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;root&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(root.tag)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">child</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">etree.SubElement(root,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;child&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">child.set(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;test_id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(etree.tostring(root))</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#tostring序列化b&#39;&lt;root&gt;&lt;child id=&quot;test_id&quot;/&gt;&lt;/root&gt;&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="tostring" tabindex="-1">tostring() <a class="header-anchor" href="#tostring" aria-label="Permalink to &quot;tostring()&quot;">​</a></h3><p>tostring()主要是对对象进行序列化，不能对集合进行序列化</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lxml </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> etree</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">root </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> etree.XML(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&lt;root&gt;&lt;div&gt;&lt;p&gt;&lt;/p&gt;&lt;/div&gt;&lt;/root&gt;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(etree.tostring(root))</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(etree.tostring(root, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">encoding</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;iso-8859-1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(etree.tostring(root, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">pretty_print</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">True</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(etree.tostring(root, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">method</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#method=&quot;text&quot;|&quot;html&quot;|&quot;xml&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="xml-html" tabindex="-1">XML()/HTML() <a class="header-anchor" href="#xml-html" aria-label="Permalink to &quot;XML()/HTML()&quot;">​</a></h3><div class="language-PYTHON vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">PYTHON</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lxml </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> etree</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">root </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> etree.XML(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&lt;root&gt;data&lt;/root&gt;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(etree.tostring(root))</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#b&#39;&lt;root&gt;data&lt;/root&gt;&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">root </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> etree.HTML(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&lt;p&gt;data&lt;/p&gt;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(etree.tostring(root))</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#b&#39;&lt;html&gt;&lt;body&gt;&lt;p&gt;data&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="xpath" tabindex="-1">xpath <a class="header-anchor" href="#xpath" aria-label="Permalink to &quot;xpath&quot;">​</a></h2><p>lxml 支持XPath语法</p><ul><li>xpath的返回结果都是集合(list)</li><li>xpath只能作用于对象(object)上</li></ul><h3 id="基本语法" tabindex="-1">基本语法 <a class="header-anchor" href="#基本语法" aria-label="Permalink to &quot;基本语法&quot;">​</a></h3><table><thead><tr><th>表达式</th><th>描述</th><th>实例</th></tr></thead><tbody><tr><td>nodename</td><td>选取此节点的所有子节点</td><td><code>html.xpath(&quot;body/div&quot;)</code></td></tr><tr><td><code>/</code></td><td>从根节点选取</td><td><code>html.xpath(&quot;/html/body/div&quot;)</code></td></tr><tr><td><code>//</code></td><td>从匹配选择的当前节点选择文档中的节点，而不考虑它们的位置</td><td><code>html.xpath(&quot;//div&quot;)</code></td></tr><tr><td><code>.</code></td><td>选取当前节点</td><td><code>html.xpath(&quot;//div/.&quot;)</code></td></tr><tr><td><code>..</code></td><td>选择当前节点的父节点</td><td><code>html.xpath(&quot;//div/..&quot;)</code></td></tr><tr><td><code>@</code></td><td>选择属性</td><td><code>html.xpath(&quot;//a/@href&quot;)</code></td></tr><tr><td><code>*</code></td><td>匹配任何元素节点</td><td><code>html.xpath(&quot;*&quot;)</code></td></tr><tr><td><code>@*</code></td><td>匹配任何属性节点</td><td><code>html.xpath(&quot;@*&quot;)</code></td></tr><tr><td><code>@attribute</code></td><td>选取具有给定属性的所有元素</td><td><code>html.xpath(&quot;//a[@href]&quot;)</code></td></tr><tr><td><code>@attribbute=value</code></td><td>选取给定属性具有给定值的所有元素</td><td><code>html.xpath(&#39;//div[@class=&quot;item-1&quot;]&#39;)</code></td></tr><tr><td><code>text()</code></td><td>返回标签的内容</td><td><code>html.xpath(&quot;//a/text()&quot;)</code></td></tr></tbody></table><h3 id="实例" tabindex="-1">实例 <a class="header-anchor" href="#实例" aria-label="Permalink to &quot;实例&quot;">​</a></h3><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lxml </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> etree</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">text </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &lt;div class=&quot;item-1&quot; style=&quot;color:red;&quot;&gt;&lt;a href=&quot;link1.html&quot;&gt;Python知识学堂&lt;/a&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &lt;div class=&quot;item-2&quot;&gt;&lt;a href=&quot;link2.html&quot;&gt;&lt;div&gt;学习Python&lt;/div&gt;&lt;/a&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &lt;div class=&quot;item-3 item-4&quot;&gt;&lt;a href=&quot;link5.html&quot;&gt;很好玩&lt;/div&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">html </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> etree.HTML(text)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># print(html.xpath(&quot;body/div&quot;))</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># print(html.xpath(&quot;/html/body/div&quot;))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># result=html.xpath(&quot;//div&quot;)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># for i in result:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   print(etree.tostring(i,encoding=&quot;utf-8&quot;).decode(&quot;utf-8&quot;))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># print(html.xpath(&quot;//div/.&quot;))</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># print(html.xpath(&quot;//div/..&quot;))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">hrefList </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> html.xpath(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;//a[@href]&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> href </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> hrefList:</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(href)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># result1 = html.xpath(&quot;//@href&quot;)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># for i in result1:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     print(i)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># result2 = html.xpath(&#39;//div[@class=&quot;item-1&quot;]&#39;)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># print(result2)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># result3 = html.xpath(&quot;//a/text()&quot;)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># print(result3)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># result4 = html.xpath(&quot;//a/string()&quot;)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># print(result4)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h2 id="lxml-cssselect" tabindex="-1">lxml.cssselect <a class="header-anchor" href="#lxml-cssselect" aria-label="Permalink to &quot;lxml.cssselect&quot;">​</a></h2><p>lxml.cssselect模块中最重要的是CSSSelector 即CSS选择器</p><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>pip install cssselect</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="实例-1" tabindex="-1">实例 <a class="header-anchor" href="#实例-1" aria-label="Permalink to &quot;实例&quot;">​</a></h3><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lxml.cssselect </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CSSSelector</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lxml </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> etree</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">text</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     &lt;div class=&quot;item-1 item-2&quot; style=&quot;color:red;&quot;&gt;&lt;a href=&quot;link1.html&quot;&gt;Python知识学堂&lt;/a&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     &lt;div class=&quot;item-2&quot;&gt;&lt;a href=&quot;link2.html&quot;&gt;&lt;div&gt;学习Python&lt;/div&gt;&lt;/a&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     &lt;div class=&quot;item-3 item-4&quot;&gt;&lt;a href=&quot;link5.html&quot;&gt;很好玩&lt;/div&gt;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">html</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">etree.HTML(text)      </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#初始化生成一个XPath解析对象  并且会补全html</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">result</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">html.cssselect(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;div.item-1.item-2 a&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#选择div标签并且含有class属性且值含有&quot;item-1&quot;与&quot;item-2&quot; 下的a 标签子节点</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> item </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result:</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(item.text)       </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 获取标签的内容</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(item.get(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;href&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#获取a 标签的属性值</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div>`,25),e=[l];function p(h,r,k,d,o,c){return a(),i("div",null,e)}const g=s(t,[["render",p]]);export{E as __pageData,g as default};
