# mysql

## 索引覆盖
id,name,age
a

id 主键  name普通索引
select id,name from table where name = 'wangwu';
不需要回表了

## 谓词下推

select t1.name t2.name from t1 join t2 on t1.id = t2.id;
1、先根据id进行表关联，然后获取到关联数据 之后再查询 name的值（笛卡尔积）
2、先把当前sql语句中所有的字段筛选出来，然后再根据id去进行关联，返回结果 (谓词下推)


## 索引下推
id,name,age,gender,address
id主，name,age组合索引
select * from table where name='zhangsan' and age = 12;
没有索引下推之前：先根据name从存储隐形中拉取所有的数据 到server层，再server层再根据age做数据过虑
有了索引下推之后：直接根据name,age两个值再存储隐形中做数据筛选，返回结果 


## 最左匹配
id,name,age,gender,address
id主，name,age组合索引
select * from table where name = ? and age= ?  会用
select * from table where  age= ?  不会
select * from table where name = ?  会用
select * from table where age= ? and name = ? 会用




mysql在8.0没有查询缓存了


## mysql 日志
binlog：进行主从同步：server
redolog：预写日志(innodb)
undolog：事务回滚和mvcc(innodb)
errorlog：错误日志:server
relaylog：中继日志:server
slowlog：慢日志:server


innodb  myisam
事务：有，没有
行锁：有，没有
表锁：有，有
外链：有，没有
计数器：没有，有
聚簇索引：有，没有


## mvcc多版本并发控制
读写：加锁，MVCC（可见性算法）

当前读，快照读，隐藏字段，undolog, readview,可见性算法




## 死锁
show engine innodb status