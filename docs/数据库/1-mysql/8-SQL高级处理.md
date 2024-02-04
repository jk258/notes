# SQL高级处理

## 窗口函数

窗口函数也称为 OLAP 函数。OLAP 时 OnLine Analytical Processing 的简称，意思时对数据库数据进行实时分析处理。例如，市场分析、创建财务报表、创建计划等日常性商务工作

窗口函数语法：

```
<窗口函数> OVER ([PARTITION BY <列清单>])
	ORDER BY <排序用列清单>
```

其中重要的关键字时 PARTITION BY 和 ORDER BY

窗口函数答题可以分为以下两种：

- 能够作为窗口函数的聚合函数 ( SUM、AVG、COUNT、MAX、MIN )
- RANK、DENSE_RANK、ROW_NUMBER等专用窗口函数

ps：在mysql中，窗口函数是从8.0开始引进的

### 语法的基本使用方法——使用RANK函数

如其名称所示，RANK时用来计算记录排序的函数

```sql
SELECT product_name, product_type, sale_price,
 RANK () OVER (PARTITION BY product_type
 ORDER BY sale_price) AS ranking
 FROM Product;
```

PARTITION BY 能够设定排序的对象范围。本例中，为了按照商品种类进行排序，我们指定了 product_type

ORDER BY 能够指定按照哪一列、何种顺序进行排序。为了按照销售单价的升序进行排列，我们指定了 sale_price。此外窗口函数中的 ORDER BY 于 SELECT语句末尾的 ORDER BY 一样，可以通过关键字 ASC/DESC 来指定升序和降序。省略该关键字时会默认按照ASC，也就是升序进行排序。

窗口函数兼具 ROUP BY 子句的分组功能以及 ORDER BY 子句的排序功能。但是，PARTITION BY 子句并不具备 GROUP BY 子句的汇总功能。

通过 PARTITION BY 分组后的记录集合称为“窗口”

使用窗口函数时起到关键作用的是 PARTITION BY 和 GROUP BY。其中，PARTITION BY 并不是必须的，即使不指定也可以正常使用窗口函数。如下：

```sql
SELECT product_name, product_type, sale_price,
 RANK () OVER (ORDER BY sale_price) AS ranking
 FROM Product;
```

### 专用窗口函数的种类

- RANK函数：计算排序时，如果存在相同位次的记录，则会跳过之后的位次
- DENSE_RANK函数：同样时计算排序，即使存在相同位次的记录，也不会跳过之后的位次
- ROW_NUMBER函数：赋予唯一的连续位次

### 窗口函数的使用范围

窗口函数只能书写在一个特定的位置。这个位置就是 SELECT 子句之中。反过来说，就是这类函数不能在 WHERE 子句或者 FROUP BY 子句中使用

### 作为窗口函数使用的聚合函数

所有的聚合函数都能用坐窗口函数，其语法和专用窗口函数完全相同。如下：

```sql
SELECT product_id, product_name, sale_price,
 SUM (sale_price) OVER (ORDER BY product_id) AS current_sum
 FROM Product;
```

### 计算移动平均

窗口函数就是将表以窗口为单位进行分割，并在其中进行排序的函数。其实其中还包含在窗口中指定更加详细的汇总范围的备选功能，该备选功能中的汇总范围称为框架

指定“最靠近的 3 行”作为汇总对象

```sql
SELECT product_id, product_name, sale_price,
 AVG (sale_price) OVER (ORDER BY product_id
 ROWS 2 PRECEDING) AS moving_avg
 FROM Product;
```

- 指定框架（汇总范围），由于框架时分局当前记录来确定的，因此和固定的窗口不同，其范围会随着当前记录的变化而变化，这样的统计方法称为移动平均（moving average）。这种方法在希望实时把握“最近状态”时非常方便
- 将当前记录的前后行作为汇总对象
  ```sql
  SELECT product_id, product_name, sale_price,
   AVG (sale_price) OVER (ORDER BY product_id
   ROWS BETWEEN 1 PRECEDING AND 
   1 FOLLOWING) AS moving_avg
   FROM Product;
  ```

ps：将聚合函数作为窗口函数使用时，会以当前记录为基准来决定汇总对象的记录

## GROUPING运算符

## 同时得到合计行

分别计算出合计行和按照商品种类汇总的结果，然后通过 UNION ALL连接在一起

```sql
SELECT '合计' AS product_type, SUM(sale_price)
 FROM Product
UNION ALL
SELECT product_type, SUM(sale_price)
 FROM Product
GROUP BY product_type;
```

### ROLLUP——同时得出合计和小计

GROUPING运算符包含以下3种

- ROLLUP
- CUBE
- GROUPING SETS

ROLLUP的使用方法

```sql
SELECT product_type, SUM(sale_price) AS sum_price
 FROM Product
 GROUP BY ROLLUP(product_type);
-- mysql
SELECT product_type,SUM(sale_price) as sum_price FROM Product 
	GROUP BY product_type WITH ROLLUP -- 超级分组记录默认使用 NULL 作为聚合键
```

将“登记日期”添加到聚合键中

```sql
SELECT product_type,regist_date,SUM(sale_price) AS sum_price FROM Product GROUP BY product_type,regist_date WITH ROLLUP
```

这时，会发现使用 ROLLUP 时多出了一个合计行和不同商品种类的小计行

### GROUPING函数——让NULL更加容易分辨

SQL 提供了一个用来判断超级分组记录的 NULL 的特定函数 —— GROUPING 函数。该函数在其参数列的值为超级分组记录所产生的 NULL 时返回1，其他情况返回 0

```sql
SELECT GROUPING(product_type) AS product_type,
 GROUPING(regist_date) AS regist_date, SUM(sale_price) AS sum_price
 FROM Product
 GROUP BY ROLLUP(product_type, regist_date);

```

### CUBE 用数据来搭积木

所谓 CUBE，就是将 GROUP BY 子句中聚合键的“所有可能的组合”的汇总结果集合到一个结果中。因此，组合的个数就是 2 `<sup>`n `</sup>`（n 是聚合键的个数）

```sql
SELECT CASE WHEN GROUPING(product_type) = 1
 THEN '商品种类 合计'
 ELSE product_type END AS product_type,
 CASE WHEN GROUPING(regist_date) = 1
 THEN '登记日期 合计'
 ELSE CAST(regist_date AS VARCHAR(16)) END AS regist_date,
 SUM(sale_price) AS sum_price
 FROM Product
 GROUP BY CUBE(product_type, regist_date);
```

### GROUPING SETS ——取得期望的积木

GROUPING SETS可以用于从 ROLLUP 或者 CUBE 的结果中取出部分记录

```sql
SELECT CASE WHEN GROUPING(product_type) = 1
 THEN '商品种类 合计'
 ELSE product_type END AS product_type,
 CASE WHEN GROUPING(regist_date) = 1
 THEN '登记日期 合计'
 ELSE CAST(regist_date AS VARCHAR(16)) END AS regist_date,
 SUM(sale_price) AS sum_price
 FROM Product
 GROUP BY GROUPING SETS (product_type, regist_date);
```
