# SQL初识和基本操作

## 什么是SQL

SQL, 全称为Structured Query Language（结构化查询语言)。 要讲SQL就绕不开database(数据库), 平时所说的数据库，一般就是指的 **Relational database(关系型数据库)**.

SQL用来操作数据里的数据，可以做数据查询，数据更新，写入数据等

## 关系型数据库

数据库由若干张表(Table)组成，这里说的数据Table很像Excel里的表; 正如Excel里的表格，Table也是由 **行(rows)**和**列(columns)**组成

一个Table存储一个类别的数据，每一行是一条数据，每一列是这种数据的一个属性； Table就像一个二维的表格，**列(columns)**是有限固定的，**行(rows)**是无限不固定的

## SQL的基本操作
### 添加数据
语法
```sql
INSERT INTO 表(字段1,字段2) VALUES (值1,值2);
```
例如：往表`students`中添加一条记录
```sql
INSERT INTO students(sname,sage) VALUES ("任",27);
```
### 删除数据
语法：
```sql
-- 如果不加where条件，删除表中所有记录
DELETE FROM 表 WHERE 删除条件
```
例如：删除表`students`中的记录
```sql
DELETE FROM students WHERE sno=1
DELETE FROM students -- 删除表中所有记录
```
### 修改数据
语法
```sql
UPDATE 表 SET 字段1=值1,字段2=值2 WHERE 修改条件
```
例如：将表`students`中sno为1的记录的sname改为test，sage改为28
```sql
UPDATE students SET sname="test",sage=28 WHERE sno=7
```

### SELECT 查询

`SELECT`语句, 通常又称为 查询 （queries), 正如其名, `SELECT` 可以用来从数据库中取出数据. 一条 `SELECT` 语句或者叫一个查询, 可以描述我们要从什么表取数据， 要取哪些数据，在返回之前怎么对结果做一些转化计算等等

语法

```sql
-- Select 查询某些属性列（specific columns）的语法
SELECT column（列名）, another_column, …
FROM mytable（表名）;

-- Select 查询所有列
SELECT *
FROM mytable（表名）;
```
#### 条件查询

`SELECT`查询的 `WHERE` 子句. 一个查询的 `WHERE`子句用来描述哪些行应该进入结果，具体就是通过 `condition`条件 限定这些行的属性满足某些具体条件，语法如下

```sql
SELECT *|字段1,字段2... FROM 表 WHERE 条件语句

SELECT column, another_column, …
FROM mytable
WHERE condition
    AND/OR another_condition
    AND/OR …;
```

可以用 `AND` or `OR` 这两个关键字来组装多个条件（表示并且，或者） (`num_wheels >= 4 AND doors <= 2 `这个组合表示 num_wheels属性 大于等于 4 并且 doors 属性小于等于 2). 下面的具体语法规则，可以用来筛选数字属性列（包括 整数，浮点数） :

|operator(关键字)|condition(意思)|sql example(例子)|
|--|--|--|
|`= != < <= > >=`|standard numerical operators(基础的大于、等于等比较)|col_name!=4|
|`BETWEEN... AND...`|number is whthin range of tow values(indlusive)在两个数之间|col_name BETWEEN  1.5 AND 10|
|`NOT BETWEEN ... AND ...`|number is not within range of two values(inclusive)不在两个数之间|col_name NOT BETWEEN 1 AND 10|
|`IN (...)`|number exists in a list在一个列表|col_name IN (2,4,6)|
|`NOT IN (...)`|number does not exist in a list不在一个列表|col_name NOT IN (1,3,5)|

越是精确的条件筛选，会让结果更容易理解，同时因为条件在返回之前筛掉不必要的结果，SQL的运行速度也会快很多

> PS :虽然之前我们的SQL 关键之如 SELECT, WHERE, AND,OR 都是大写的，但SQL其实是兼容写成 select,where小写的. 大写这些关键字有助于我们把 关键字 和 你的表名，列名区分开，让 SQL更容易理解。

- 不等于
    ```sql
    年龄不等于26的
    SELECT * FROM students WHERE sage!=26
    ```
- 从什么到什么
    ```sql
    -- 年龄从26到50
    SELECT * FROM students WHERE sage BETWEEN 26 AND 50
    ```
- 模糊查询
    ```sql
    -- 查询名字带m的人的信息
    SELECT * FROM students WHERE sname LIKE "%m%"
    ```
- `in`、`and`和`or`
    ```sql
    -- 查询年龄26和50的人
    SELECT * FROM students WHERE sage IN(26,50)

    -- 通过or和and链接
    SELECT * FROM students WHERE sage=26 OR sage=50
    ```
    
    
#### group by(分组)
- 聚合函数：SUM(),COUNT(),AVG(),MIN(),MAX()
- 聚合函数一般与`group by`子句搭配使用
- 凡是没有放在聚合函数内的东西，都要堆在group by后面  
案例如下：
```sql
-- 统计每个班级的平均成绩是多少
SELECT class,AVG(score) FROM stu GROUP BY class

-- 统计男生女生有多少人
SELECT sgender,COUNT(*),AVG(score),MAX(score),MIN(score) FROM stu GROUP BY sgender


-- 统计每个班级的男生女生数量
SELECT class,sgender,COUNT(*) FROM stu GROUP BY class,sgender 
```
对统计结果进行筛选`HAVING`
```sql
-- 统计出平均成绩合格的班级
SELECT class,AVG(score) FROM stu GROUP BY class HAVING AVG(score)>=60
```

### 过滤

`DISTINCT` 关键字来指定某个或某些属性列唯一返回

```sql
SELECT DISTINCT column, another_column, …
FROM mytable
WHERE condition(s);
```

### 排序

`ORDER BY col_name` 排序的语法来让结果按一个或多个属性列做排序.

```sql
SELECT column, another_column, …
FROM mytable
WHERE condition(s)
ORDER BY column ASC/DESC;
```

`ORDER BY col_name` 这句话的意思就是让结果按照 `col_name` 列的具体值做 `ASC`升序 或 `DESC` 降序，对数字来说就是升序 1，2，3，... 或降序 ... 3,2,1 . 对于文本列，升序和降序指的是按文本的字母序

### limit选取部分结果

`LIMIT` 和 `OFFSET` 子句通常和`ORDER BY` 语句一起使用，当我们对整个结果集排序之后，我们可以以 `LIMIT` 来指定只返回多少行结果 ,用 `OFFSET`来指定从哪一行开始返回。你可以想象一下从一条长绳子剪下一小段的过程，我们通过 `OFFSET` 指定从哪里开始剪，用 `LIMIT` 指定剪下多少长度。从哪条开始，取多少条`(n-1)*pageSize,pageSize`

```sql
SELECT column, another_column, …
FROM mytable
WHERE condition(s)
ORDER BY column ASC/DESC
LIMIT num_limit OFFSET num_offset;
```
也可以简写为
```sql
SELECT * FROM stu LIMIT OFFSET,num_offset
```

## 多表联合查询

> 数据库范式是数据表设计的规范，在范式规范下，数据库里每个表存储的重复数据降到最少（这有助于数据的一致性维护），同时在数据库范式下，表和表之间不再有很强的数据耦合，可以独立的增长 (ie. 比如汽车引擎的增长和汽车的增长是完全独立的). 范式带来了很多好处，但随着数据表的分离，意味着我们要查询多个数据属性时，需要更复杂的SQL语句，也就是本节开始介绍的多表连接技术。这样SQL的性能也会面临更多的挑战，特别是当大数据量的表很多的情况下

### 用joins进行多表联合查询

主键(`primary key`), 一般关系数据表中，都会有一个属性列设置为 主键(`primary key`)。主键是唯一标识一条数据的，不会重复复（想象你的身份证号码)。一个最常见的主键就是`auto-incrementing integer`(自增ID，每写入一行数据ID+1, 当然字符串，hash值等只要是每条数据是唯一的也可以设为主键.

借助主键(`primary key`)（当然其他唯一性的属性也可以），我们可以把两个表中具有相同 主键ID的数据连接起来（因为一个ID可以简要的识别一条数据，所以连接之后还是表达的同一条数据）（你可以想象一个左右连线游戏）。具体我们用到 `JOIN` 关键字。我们先来学习 `INNER JOIN`.

```sql
SELECT column, another_table_column, …
FROM mytable （主表）
INNER JOIN another_table （要连接的表）
    ON mytable.id = another_table.id (想象一下刚才讲的主键连接，两个相同的连成1条)
WHERE condition(s)
ORDER BY column, … ASC/DESC
LIMIT num_limit OFFSET num_offset;
```

`INNER JOIN` 只会保留两个表都存在的数据

### 外连接（OUTER JOINs）

```sql
SELECT column, another_column, …
FROM mytable
INNER/LEFT/RIGHT/FULL JOIN another_table
    ON mytable.id = another_table.matching_id
WHERE condition(s)
ORDER BY column, … ASC/DESC
LIMIT num_limit OFFSET num_offset;
```

和`INNER JOIN` 语法几乎是一样的. 我们看看这三个连接方法的工作原理：
在表A 连接 B, `LEFT JOIN`保留A的所有行，不管有没有能匹配上B 反过来 `RIGHT JOIN`则保留所有B里的行。最后`FULL JOIN` 不管有没有匹配上，同时保留A和B里的所有行

ps :将两个表数据1-1连接，保留A或B的原有行，如果某一行在另一个表不存在，会用 NULL来填充结果数据。所有在用这三个JOIN时，需要单独处理 NULL
