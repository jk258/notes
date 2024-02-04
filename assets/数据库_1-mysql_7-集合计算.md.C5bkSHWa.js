import{_ as s,c as i,o as a,V as n}from"./chunks/framework.BbAbY5cn.js";const y=JSON.parse('{"title":"集合计算","description":"","frontmatter":{},"headers":[{"level":2,"title":"表的加减法","slug":"表的加减法","link":"#表的加减法","children":[{"level":3,"title":"表的加法——UNION","slug":"表的加法——union","link":"#表的加法——union","children":[]},{"level":3,"title":"集合运算的注意事项","slug":"集合运算的注意事项","link":"#集合运算的注意事项","children":[]},{"level":3,"title":"包含重复行的集合运算——ALL选项","slug":"包含重复行的集合运算——all选项","link":"#包含重复行的集合运算——all选项","children":[]},{"level":3,"title":"选取表中公共部分——INTERSECT(交集)","slug":"选取表中公共部分——intersect-交集","link":"#选取表中公共部分——intersect-交集","children":[]},{"level":3,"title":"记录的减法——EXCEPT","slug":"记录的减法——except","link":"#记录的减法——except","children":[]}]},{"level":2,"title":"联结(以列为单位对表进行联结)","slug":"联结-以列为单位对表进行联结","link":"#联结-以列为单位对表进行联结","children":[{"level":3,"title":"内联结(INNER JOIN)","slug":"内联结-inner-join","link":"#内联结-inner-join","children":[]},{"level":3,"title":"外联结(OUTER JOIN)","slug":"外联结-outer-join","link":"#外联结-outer-join","children":[]},{"level":3,"title":"3 张以上的表的联结","slug":"_3-张以上的表的联结","link":"#_3-张以上的表的联结","children":[]},{"level":3,"title":"交叉联结(CROSS JOIN)","slug":"交叉联结-cross-join","link":"#交叉联结-cross-join","children":[]}]}],"relativePath":"数据库/1-mysql/7-集合计算.md","filePath":"数据库/1-mysql/7-集合计算.md"}'),l={name:"数据库/1-mysql/7-集合计算.md"},h=n(`<h1 id="集合计算" tabindex="-1">集合计算 <a class="header-anchor" href="#集合计算" aria-label="Permalink to &quot;集合计算&quot;">​</a></h1><h2 id="表的加减法" tabindex="-1">表的加减法 <a class="header-anchor" href="#表的加减法" aria-label="Permalink to &quot;表的加减法&quot;">​</a></h2><p>所谓集合运算，就是对满足同一规则的记录进行的加减等四则运算。通过集合运算，可以得到两张表中记录的集合或者公共记录的集合，又或者其中某张表中的记录的集合。像这样用来进行集合运算的运算符称为集合运算符</p><h3 id="表的加法——union" tabindex="-1">表的加法——UNION <a class="header-anchor" href="#表的加法——union" aria-label="Permalink to &quot;表的加法——UNION&quot;">​</a></h3><p>UNION等集合运算符通常都会除去重复的记录。使用 UNION 对表进行加法运算</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> product_id,product_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">UNION</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> product_id,product_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product2</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>上面的 SQL 的结果会包含两张表中的全部商品，也就是集合中的并集运算，</p><h3 id="集合运算的注意事项" tabindex="-1">集合运算的注意事项 <a class="header-anchor" href="#集合运算的注意事项" aria-label="Permalink to &quot;集合运算的注意事项&quot;">​</a></h3><ul><li>作为运算对象的记录的列数必须相同</li><li>作为运算对象的记录中列的类型必须一致</li><li>可以使用任何SELECT语句，但ORDER BY子句只能在最后使用一次</li></ul><h3 id="包含重复行的集合运算——all选项" tabindex="-1">包含重复行的集合运算——ALL选项 <a class="header-anchor" href="#包含重复行的集合运算——all选项" aria-label="Permalink to &quot;包含重复行的集合运算——ALL选项&quot;">​</a></h3><p>在 UNION 的结果中保留重复行的语法，只需要在 UNION 后面添加 ALL 关键字就可以了。</p><p>这里的 ALL 选项，在 UNION 之外的集合运算符中同样可以使用</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> product_id,product_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">UNION ALL</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> product_id,product_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product2</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="选取表中公共部分——intersect-交集" tabindex="-1">选取表中公共部分——INTERSECT(交集) <a class="header-anchor" href="#选取表中公共部分——intersect-交集" aria-label="Permalink to &quot;选取表中公共部分——INTERSECT(交集)&quot;">​</a></h3><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> product_id, product_name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">INTERSECT</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> product_id, product_name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product2</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ORDER BY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> product_id;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在mysql中使用 <code>INNER JOIN ... ON</code></p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> p1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">p1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product p1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">INNER JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product2 p2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> p1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> p2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="记录的减法——except" tabindex="-1">记录的减法——EXCEPT <a class="header-anchor" href="#记录的减法——except" aria-label="Permalink to &quot;记录的减法——EXCEPT&quot;">​</a></h3><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> product_id, product_name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">EXCEPT</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> product_id, product_name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product2</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ORDER BY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> product_id;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在 Oracle 中使用 MINUS</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- Oracle中使用MINUS而不是EXCEPT</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> …</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> …</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">MINUS</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> …</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> …;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在 mysql 中使用 <code>LEFT JOIN ... ON ...</code></p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Product</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Product</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">LEFT JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Product</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Product2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WHERE</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Product2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> IS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>EXCEPT 有一点与 UNION 和INTERSECT 不同，需要注意以下，那就是在减法运算减数和被减数的位置不同，所得到的结果也不相同</p><h2 id="联结-以列为单位对表进行联结" tabindex="-1">联结(以列为单位对表进行联结) <a class="header-anchor" href="#联结-以列为单位对表进行联结" aria-label="Permalink to &quot;联结(以列为单位对表进行联结)&quot;">​</a></h2><p>联结运算，就是将其他表中的列添加过来，进行“添加列”的运算。该操作通常用于无法从一张表获取期望数据（列）的情况。</p><h3 id="内联结-inner-join" tabindex="-1">内联结(INNER JOIN) <a class="header-anchor" href="#内联结-inner-join" aria-label="Permalink to &quot;内联结(INNER JOIN)&quot;">​</a></h3><p>将两张表进行内联结</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shop_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shop_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">P</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">P</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sale_price</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ShopProduct </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> SP </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	INNER JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> P </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">P</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>内联结要点：</p><ul><li>进行联结时需要在 FROM 子句中使用多张表。别名 SP 和 P 并不是必须要，但由于表名太长会影响 SQL 语句的可读性，因此还是希望可以习惯使用别名</li><li>进行内联结时必须使用 ON 子句，并且要书写在 FROM 和 WHERE 之间。联结条件可以使用“=”来记述，也可以使用 &lt;= 和 BETWEEN 等谓词。</li><li>使用联结时 SELECT 子句中的需要按照“<code>&lt;表的别名&gt;.&lt;列名&gt;</code>”的格式进行书写</li><li>内联结和 WHERE 子句结合使用。如下<div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shop_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shop_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">P</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">P</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sale_price</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ShopProduct </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> SP </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">INNER JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> P ①</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> P</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> WHERE</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shop_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;000A&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li></ul><h3 id="外联结-outer-join" tabindex="-1">外联结(OUTER JOIN) <a class="header-anchor" href="#外联结-outer-join" aria-label="Permalink to &quot;外联结(OUTER JOIN)&quot;">​</a></h3><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shop_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shop_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">P</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">P</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sale_price</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ShopProduct </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> SP </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RIGHT OUTER JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> P</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> P</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>外联结要点：</p><ul><li>选取出单张表中全部的信息。对于外联结来说，只要数据存在于某一张表中，就能读取出来。虽说如此，哪些表中不存在的信息我们还是无法得到，即“结果中包含原表中不存在的（在原表之外）的信息”</li><li>外联结还有一点非常重要，那就是要把那张表作为主表。最终的结果会包含主表内所有的数据。指定主表的关键字时 LEFT 和 RIGHT 。顾名思义，使用 LEFT 时 FROM 子句中写在左侧的表时主表，使用 RIGHT 时右侧的表时主表。使用二者所得到的结果完全相同</li></ul><h3 id="_3-张以上的表的联结" tabindex="-1">3 张以上的表的联结 <a class="header-anchor" href="#_3-张以上的表的联结" aria-label="Permalink to &quot;3 张以上的表的联结&quot;">​</a></h3><p>通常联结只涉及 2 张表，但有时也会出现必须同时联结 3 张以上的表的情况。原则上联结表的数量并没有限制。如下：</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shop_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shop_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">P</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">P</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sale_price</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">IP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">inventory_quantity</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ShopProduct </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> SP </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">INNER JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> P</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> P</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> INNER JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> InventoryProduct </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> IP</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> IP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> WHERE</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> IP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">inventory_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;P001&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>即使想要把联结的表增加到 4 张、5 张......使用 INNER JOIN 进行添加的方式也是完全相同的</p><h3 id="交叉联结-cross-join" tabindex="-1">交叉联结(CROSS JOIN) <a class="header-anchor" href="#交叉联结-cross-join" aria-label="Permalink to &quot;交叉联结(CROSS JOIN)&quot;">​</a></h3><p>交叉联结( CROSS JOIN )在实际业务中使用的次数屈指可数，但交叉联结是所有联结运算的基础。</p><p>将两张表进行交叉联结</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shop_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shop_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">P</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">product_name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ShopProduct </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> SP </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CROSS JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Product </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> P;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>对满足相同规则的表进行交叉联结的集合运算符是 CROSS JOIN（笛卡儿积）。进行交叉联结时无法使用内联结和外联结中所使用的 ON 子句，这是因为交叉联结时对两张表中全部记录进行交叉组合，因此结果中的记录数通常时两张表中行数的乘积。</p>`,44),p=[h];function t(k,e,r,d,E,g){return a(),i("div",null,p)}const o=s(l,[["render",t]]);export{y as __pageData,o as default};
