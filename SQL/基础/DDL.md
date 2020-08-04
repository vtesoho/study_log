## 创建语句的语法格式:

```
create table 表名(
    字段名1 数据类型,
    字段名2 数据类型 default 默认值,
    字段名3 数据类型,
    ...
);


drop table if exists 表名;   //当这个表存在的话就删除此表
```


### 常见的数据类型

int     整数型
bigint  长整型
float   浮点型
double  双精度浮点型
char    定长字符串
varchar 可变长字符串
date    日期类型
BLOB    二进制大对象(存储图片、视频等流媒体信息)  Binary large Object
CLOB    字符大对象(存储较大文本，可存储4G的字符串)  Character Large Object


### insert 插入数据 

要求：字段的数量和值的数量相同，并且数据类型要对应相同。
```
insert into 表名(字段名1,字段名2,字段名3,...) values (值1,值2,值3,....)


//字段可以省略不写，但后面的value对数量和顺序都有要求。
insert init 表名 values(值1,值2,值3,....)


//一次插入多行数据
insert into 表名(字段名1,字段名2,字段名3,...) values (值1,值2,值3,....),(值1,值2,值3,....),(值1,值2,值3,....);
```




### 表的复制
```
此句的意思是复制A表的(字段1,字段3,字段3)作为新表名表的结构
create table 新表名 as select 字段1,字段3,字段3 from A表;
```





### 修改数据
```
//注意，如果 没有条件，将会对整张表进行更新
update 表名 set 字段名1 = 值1 , 字段名2 = 值2 ... where 条件;
```



### 删除数据

```
//需要注意，没有条件，将会全部删除
delete from 表名 where 条件;
```


