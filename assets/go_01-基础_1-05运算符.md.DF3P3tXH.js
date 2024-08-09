import{_ as t,c as d,o as r,a4 as e}from"./chunks/framework.DdZcq5U1.js";const m=JSON.parse('{"title":"运算符","description":"","frontmatter":{},"headers":[{"level":2,"title":"算术运算符","slug":"算术运算符","link":"#算术运算符","children":[]},{"level":2,"title":"关系运算符","slug":"关系运算符","link":"#关系运算符","children":[]},{"level":2,"title":"逻辑运算符","slug":"逻辑运算符","link":"#逻辑运算符","children":[]},{"level":2,"title":"位运算符","slug":"位运算符","link":"#位运算符","children":[]},{"level":2,"title":"赋值运算符","slug":"赋值运算符","link":"#赋值运算符","children":[]}],"relativePath":"go/01-基础/1-05运算符.md","filePath":"go/01-基础/1-05运算符.md"}'),a={name:"go/01-基础/1-05运算符.md"},l=e('<h1 id="运算符" tabindex="-1">运算符 <a class="header-anchor" href="#运算符" aria-label="Permalink to &quot;运算符&quot;">​</a></h1><p>go的运算符有：</p><ul><li>算术运算符</li><li>关系运算符</li><li>逻辑运算符</li><li>位运算符</li><li>赋值运算符</li></ul><h2 id="算术运算符" tabindex="-1">算术运算符 <a class="header-anchor" href="#算术运算符" aria-label="Permalink to &quot;算术运算符&quot;">​</a></h2><table tabindex="0"><thead><tr><th>运算符</th><th>描述</th></tr></thead><tbody><tr><td>+</td><td>相加</td></tr><tr><td>-</td><td>相减</td></tr><tr><td>*</td><td>相乘</td></tr><tr><td>/</td><td>相除</td></tr><tr><td>%</td><td>求余</td></tr><tr><td>注意： ++（自增）和--（自减）在Go语言中是单独的语句，并不是运算符。</td><td></td></tr></tbody></table><h2 id="关系运算符" tabindex="-1">关系运算符 <a class="header-anchor" href="#关系运算符" aria-label="Permalink to &quot;关系运算符&quot;">​</a></h2><table tabindex="0"><thead><tr><th>运算符</th><th>描述</th></tr></thead><tbody><tr><td>==</td><td>检查两个值是否相等，如果相等返回 True，否则返回 False。</td></tr><tr><td>!=</td><td>检查两个值是否不相等，如果不相等返回 True，否则返回 False。</td></tr><tr><td>&gt;</td><td>检查左边值是否大于右边值，如果是返回 True，否则返回 False。</td></tr><tr><td>&gt;=</td><td>检查左边值是否大于等于右边值，如果是返回 True，否则返回 False。</td></tr><tr><td>&lt;</td><td>检查左边值是否小于右边值，如果是返回 True，否则返回 False。</td></tr><tr><td>&lt;=</td><td>检查左边值是否小于等于右边值，如果是返回 True，否则返回 False。</td></tr></tbody></table><h2 id="逻辑运算符" tabindex="-1">逻辑运算符 <a class="header-anchor" href="#逻辑运算符" aria-label="Permalink to &quot;逻辑运算符&quot;">​</a></h2><table tabindex="0"><thead><tr><th>运算符</th><th>描述</th></tr></thead><tbody><tr><td>&amp;&amp;</td><td>逻辑 AND 运算符。 如果两边的操作数都是 True，则为 True，否则为 False。</td></tr><tr><td>ll</td><td>逻辑 OR 运算符。 如果两边的操作数有一个 True，则为 True，否则为 False。</td></tr><tr><td>!</td><td>逻辑 NOT 运算符。 如果条件为 True，则为 False，否则为 True。</td></tr></tbody></table><h2 id="位运算符" tabindex="-1">位运算符 <a class="header-anchor" href="#位运算符" aria-label="Permalink to &quot;位运算符&quot;">​</a></h2><p>位运算符对整数在内存中的二进制位进行操作。</p><table tabindex="0"><thead><tr><th>运算符</th><th>描述</th></tr></thead><tbody><tr><td>&amp;</td><td>参与运算的两数各对应的二进位相与。（两位均为1才为1）</td></tr><tr><td></td><td></td></tr><tr><td>^</td><td>参与运算的两数各对应的二进位相异或，当两对应的二进位相异时，结果为1。（两位不一样则为1）</td></tr><tr><td>&lt;&lt;</td><td>左移n位就是乘以2的n次方。“a&lt;&lt;b”是把a的各二进位全部左移b位，高位丢弃，低位补0。</td></tr><tr><td>&gt;&gt;</td><td>右移n位就是除以2的n次方。“a&gt;&gt;b”是把a的各二进位全部右移b位。同上</td></tr></tbody></table><h2 id="赋值运算符" tabindex="-1">赋值运算符 <a class="header-anchor" href="#赋值运算符" aria-label="Permalink to &quot;赋值运算符&quot;">​</a></h2><table tabindex="0"><thead><tr><th>运算符</th><th>描述</th></tr></thead><tbody><tr><td>=</td><td>简单的赋值运算符，将一个表达式的值赋给一个左值。</td></tr><tr><td>+=</td><td>相加后再赋值。</td></tr><tr><td>-=</td><td>相减后再赋值。</td></tr><tr><td>*=</td><td>相乘后再赋值。</td></tr><tr><td>/=</td><td>相除后再赋值。</td></tr><tr><td>%=</td><td>求余后再赋值。</td></tr><tr><td>&lt;&lt;=</td><td>左移后赋值。</td></tr><tr><td>&gt;&gt;=</td><td>右移后赋值。</td></tr><tr><td>&amp;=</td><td>按位与后赋值。</td></tr><tr><td>|=</td><td>按位或后赋值。</td></tr><tr><td>^=</td><td>按位异或后赋值。</td></tr></tbody></table>',14),h=[l];function i(o,n,s,b,c,u){return r(),d("div",null,h)}const p=t(a,[["render",i]]);export{m as __pageData,p as default};
