import{_ as i,c as a,a2 as n,o as l}from"./chunks/framework.D-H4MxKu.js";const g=JSON.parse('{"title":"命令","description":"","frontmatter":{},"headers":[],"relativePath":"go/01-基础/1-04命令.md","filePath":"go/01-基础/1-04命令.md"}'),p={name:"go/01-基础/1-04命令.md"};function h(k,s,e,F,t,r){return l(),a("div",null,s[0]||(s[0]=[n(`<h1 id="命令" tabindex="-1">命令 <a class="header-anchor" href="#命令" aria-label="Permalink to &quot;命令&quot;">​</a></h1><p>假如已安装了golang环境，可以在命令行执行go命令查看相关的Go语言命令：</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> go</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> is</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tool</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> managing</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> source</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> code.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Usage:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> command</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [arguments]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">The</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> commands</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> are:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    build</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">       compile</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> packages</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> and</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dependencies</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    clean</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">       remove</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> object</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> files</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    doc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         show</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> documentation</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> package</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> or</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> symbol</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    env</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         print</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> environment</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> information</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    bug</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bug</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> report</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    fix</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tool</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fix</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> packages</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    fmt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gofmt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> package</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sources</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    generate</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    generate</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> files</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> by</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> processing</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> source</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         download</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> and</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> packages</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> and</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dependencies</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     compile</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> and</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> packages</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> and</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dependencies</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    list</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        list</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> packages</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         compile</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> and</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> program</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> packages</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    tool</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> specified</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tool</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    version</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     print</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> version</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    vet</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tool</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vet</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> packages</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Use</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;go help [command]&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> more</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> information</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> about</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> command.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Additional</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> help</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> topics:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">           calling</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> between</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> and</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> C</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    buildmode</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   description</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> of</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> modes</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    filetype</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    file</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> types</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    gopath</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      GOPATH</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> environment</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> variable</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    environment</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> environment</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> variables</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    importpath</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> path</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> syntax</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    packages</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    description</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> of</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> package</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> lists</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    testflag</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    description</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> of</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> testing</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> flags</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    testfunc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    description</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> of</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> testing</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> functions</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Use</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;go help [topic]&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> more</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> information</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> about</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> that</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> topic.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><ul><li><p><code>go env</code>用于打印Go语言的环境信息。</p></li><li><p><code>go run</code>命令可以编译并运行命令源码文件。</p></li><li><p><code>go get</code>可以根据要求和实际情况从互联网上下载或更新指定的代码包及其依赖包，并对它们进行编译和安装。</p></li><li><p><code>go build</code>命令用于编译我们指定的源码文件或代码包以及它们的依赖包。</p></li><li><p><code>go install</code>用于编译并安装指定的代码包及它们的依赖包。</p></li><li><p><code>go clean</code>命令会删除掉执行其它命令时产生的一些文件和目录。</p></li><li><p><code>go doc</code>命令可以打印附于Go语言程序实体上的文档。我们可以通过把程序实体的标识符作为该命令的参数来达到查看其文档的目的。</p></li><li><p><code>go test</code>命令用于对Go语言编写的程序进行测试。</p></li><li><p><code>go list</code>命令的作用是列出指定的代码包的信息。</p></li><li><p><code>go fix</code>会把指定代码包的所有Go语言源码文件中的旧版本代码修正为新版本的代码。</p></li><li><p><code>go vet</code>是一个用于检查Go语言源码中静态错误的简单工具。</p></li><li><p><code>go tool pprof</code>命令来交互式的访问概要文件的内容。</p></li></ul>`,4)]))}const o=i(p,[["render",h]]);export{g as __pageData,o as default};
