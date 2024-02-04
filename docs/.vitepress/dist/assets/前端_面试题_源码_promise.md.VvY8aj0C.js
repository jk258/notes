import{_ as e,c as o,o as d,V as i}from"./chunks/framework.BbAbY5cn.js";const _=JSON.parse('{"title":"promise 源码","description":"","frontmatter":{},"headers":[{"level":2,"title":"术语","slug":"术语","link":"#术语","children":[]},{"level":2,"title":"必要条件","slug":"必要条件","link":"#必要条件","children":[{"level":3,"title":"promise的状态","slug":"promise的状态","link":"#promise的状态","children":[]},{"level":3,"title":"then方法","slug":"then方法","link":"#then方法","children":[]}]}],"relativePath":"前端/面试题/源码/promise.md","filePath":"前端/面试题/源码/promise.md"}'),l={name:"前端/面试题/源码/promise.md"},c=i('<h1 id="promise-源码" tabindex="-1">promise 源码 <a class="header-anchor" href="#promise-源码" aria-label="Permalink to &quot;promise 源码&quot;">​</a></h1><p><code>promise</code>表示一个异步操作的最终结果，与之进行交互的方式主要是<code>then</code>方法，该方法接收两个回调函数，用于接受<code>promise</code>解决后的值或拒绝的原因</p><h2 id="术语" tabindex="-1">术语 <a class="header-anchor" href="#术语" aria-label="Permalink to &quot;术语&quot;">​</a></h2><ul><li><code>promise</code>: 是一个拥有<code>then</code>方法的对象或函数</li><li><code>thenable</code>: 是一个定义了<code>then</code>方法的对象或者函数</li><li><code>value</code>: 只任何javascript的合法值(包括<code>undefined</code>,<code>thenable</code>和<code>promise</code>)</li><li><code>exception</code>: 指一个promise的拒绝原因</li></ul><h2 id="必要条件" tabindex="-1">必要条件 <a class="header-anchor" href="#必要条件" aria-label="Permalink to &quot;必要条件&quot;">​</a></h2><h3 id="promise的状态" tabindex="-1">promise的状态 <a class="header-anchor" href="#promise的状态" aria-label="Permalink to &quot;promise的状态&quot;">​</a></h3><p>一个promise所处的状态必须是以下三者之一: pending(待定)、fulfilled(兑现)、拒绝(rejected)</p><ol><li><code>pending</code>: 可以流转为代表成功的<code>fulfilled</code>,或代表失败的<code>rejected</code></li><li><code>fulfilled</code>: 不可流转到其他任何状态，必须拥有一个不可变的终值</li><li><code>rejected</code>: 不可流转到其他任何状态，必须拥有一个不可变的拒因</li></ol><h3 id="then方法" tabindex="-1">then方法 <a class="header-anchor" href="#then方法" aria-label="Permalink to &quot;then方法&quot;">​</a></h3><ol><li><code>then</code>方法接收两个参数<code>promise.then(onFulfilled,onRejected)</code></li><li>参数可选，非函数忽略</li><li><code>onFulfilled</code>在<code>promise</code>成功后被调用，且最多被调用一次</li><li><code>onRejected</code>在<code>promise</code>被拒绝后调用，且最多被调用一次</li><li><code>onfulfilled</code>和<code>onRejected</code>必须被当作函数调用</li><li><code>then</code>方法可以被同意<code>peomise</code>调用多次，所有<code>onFulfilled</code>和<code>onRejected</code>按照注册顺序回调</li><li><code>then</code>方法返回值是<code>promise</code></li></ol>',10),t=[c];function a(r,n,s,h,p,m){return d(),o("div",null,t)}const f=e(l,[["render",a]]);export{_ as __pageData,f as default};
