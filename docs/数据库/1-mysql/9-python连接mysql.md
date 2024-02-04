# python连接mysql

## pip安装pymysql
```sh
pip install pymysql
```
## python连接
```python
import pymysql

try:
    # 创建连接
    conn = pymysql.connect(
        host="ip地址",
        port=端口,
        user=用户名,
        password=密码,
        database=数据库,
    )
    # 创建游标
    cursor = conn.cursor()

    # 准备sql
    sql = """
        insert into stu(sname, sgender, sage, score,class) values 
        ("赵本",1,60,99,"一年二班")
        """
    result = cursor.execute(sql)
    print(result)
    conn.commit()
except Exception as e:
    # 出错后回滚
    conn.rollback()
finally:
    # 结束后关闭链接
    if cursor:
        cursor.close()
    if conn:
        conn.close()

```
