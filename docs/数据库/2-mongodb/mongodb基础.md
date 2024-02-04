# mongodb基础

## mongodb 基本使用
1. `db`:当前正在使用的数据库
2. `show dbs`:显示所有数据库
3. `show databases`:显示所有数据库
4. `use xxxx`:调整数据库
5. `db.dropDatabase()`:删除数据库
6. `show collections`:显示当前数据库中所有的集合（表）
7. `db.createCollection(name,{options})`创建集合
   - capped:是否卷动，size:大小
8. `db.collection._name.drop()`删除集合
9. `db.collection_name.insert()`向集合中添加数据（如果该集合不存在，自动创建）
10. `db.collection_name.isCapped()`判断是否有容量上限（判断该集合是否是固定容量的集合）

## MongoDB的增删改查

### mongodb中常见的数据类型（了解）
1. `Object ID`:主键ID
2. `String`:字符串
3. `Boolean`:布尔值
4. `Integer`:数字
5. `Doube`:小数
6. `Arrays`:数组
7. `Object`:文档（关联其他对象）`{sname:李嘉诚，sage:18,class:{cccc}}`
8. `Null`:空值
9. `Timestamp`:时间戳
10. `Date`:时间日期



### 添加数据
```
db.collection_name.insert({字段: 值,字段: 值})
```
示例
```
db.stu.insert({name:'test',age:12})
```
**如果集合不存在，会自动创建**
### 修改数据
1. update更新
    ```
    db.collection_name.update({条件},{修改内容},{multi:是否多条数据修改})
    ```
    示例 
    ```
    db.nor_col.update({name:"樵夫"},{$set:{title:"alex",hobby:['抽烟','喝酒','烫头']}},{multi:true});
    db.nor_col.update({name:"樵夫"},{title:"alex"})
    ```
    $set和没有$set的**区别**：
    - $set只会修改当前给出的字段，其他内容保留  
    - 没有$set只会保留当前给出字段，其他内容删除
    - `mutil`如果为true，必须用`$set`,非偶哦则报错
2. 保存(save)
    ```
    db.collection_name.save({字段: 值,字段: 值})
    ```
    注意，如果`save`的内容中的`_id`存在就更新，如果不存在就添加
### 删除数据
1. reomve()
    ```
    db.collection_name.remove({条件},{justOne:true|false})
    ```
    示例
    ```
    db.stu.remove({name:'test'},{justOne:true|false})
    ```
2. deleteOne()删除一条
    ```
    db.collection_name.deleteOne({条件})
    ```
3. deletetMany()删除多条
    ```
    db.collection_name.deleteMany({条件})
    ```
### 查询数据
```
db.collection_name.find({条件})
```
**不写条件查询全部**
#### 比较运算
1. 等于：默认是等于判断，Seq
2. 小于：`$lt(less than)
3. 小于等于：`$lte(less than equal)
4. 大于：`$gt(greater than)
5. 大于等于：`$gte
6. 不等于：$ne
```
1 db.stu.find({age:28})查询年龄是28岁的学生信息
2 db.stu.find({age:{$eq:28}})查询年龄是28岁的学生信息
3 db.stu.find({age:{$gt:30}})查询年龄大于30岁的学生
4 db.stu.find({age:{$lt:30}})查询年龄小于30岁的学生
5 db.stu.find({age:{$gte:38}})查询年龄大于等于30岁的学生
6 db.stu.find({fage:{$lte:38}})查询年龄小于等于30岁的学生
7 db.stu.find({age:{$ne:38}})查询年龄不等于38的学生
```
#### 逻辑运算符
1. and,`$and:[条件1，条件2]`
    ```
    db.stu.find({$and:[{age:{$gte:33}},{age:{$lt:100}}]})
    db.stu.find({age:{$gte:33,$lt:100}})
    ```
2. or,`$or:[条件1，条件2]`
    ```
    db.stu.find({$or:[{age:{$lt:30}},{age:{$gt:100}}]})
    ```
3. nor
    ```
    db.stu.find({$nor:[{age:{$lte:33}},{name:"朱元璋"}]})
    ```
#### 范围运算符
使用`$in`,`$nin`判断数据是否在某个数组内
```
db.stu.find({age:{$in:[33,35,38]}})
```

#### 正则表达式
```
db.stu.find({address: /^北京/})
```
#### 自定义查村
```
db.stu.find({$where:function(){return this.age>50}})
```
#### skip,limit
```
db.stu.find().skip(2).limit(2) 跳过2个，提取2个，可以做分页
```

#### 投影
投影可以控制最终查询的结果(字段筛选)
```
db.stu.find({},{name:1,age:1})
```
需要看的字段给1就可以，注意：**除了_id外，0和1不能共存**
#### 排序
`sort`,1升序，-1降序
```
db.stu.find().sort({age:1})
```
#### 统计
`count(条件)`查询
```
db.stu.count({age:33})
```
