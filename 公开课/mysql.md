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



## mysql 的qps  tps
看配置，以阿里rds
qps:9W
tps:5K
1T=18Q





事务的四大特点是什么？他们的实现原理是什么？

ACID

A 原子性  undolog 回滚日志
C 一致性
I 隔离性  MVCC  锁 
D 持久性  redolog

wal

write ahead log  顺序读写，随机读写

mysql的redolog,undolog,binlog分别有什么作用？

什么是二阶段提交，如何保证宕机时数据的一致性？

多主之间binlog同步


先写redolog  -> prepare的状态 ，如果断电，会先去寻找prepare

binlog -> redolog


mvcc如何实现多版本并发控制？如何解决读写冲突？




mysql中的幻读是什么？如何解决幻读问题？








数据库支持的并发有几种情况

读读

不存在任何问题，也不需要并发控制

读写

有数据安全问题，会出现脏读，幻读，不可重复读  - mvcc


当前读  

读取的是数据最新版本，而且要保证其它并发事务不能修改当前记录

lock in share mode ,for update, update,delete,insert  会触



快照读  不加锁的非阻塞读，读取的是历史版本的数据，不是最新的记录

不加锁的select  会触


写写

有数据安全问题，会存在丢失更新问题   - 锁 




client(cli,jdbc,navicat)


server
+ 连接器-》管理连接，验证权限
+ 分析器-》词法分析，语法分析-》AST(antlr,calcite)
+ 优化器-》CBO成本优化，RBO规则 
+ 执行器-》蹑存储引擎交互 

存储引擎
不同的的数据文件在磁盘的不同组织形式
innodb
myisam
memory






这四个日志位于server层面，跟存储引擎无关

errorlog 错误日志

binlog 主从复制日志

slowlog 慢日志

relaylog 中继日志


属于innodb存储引擎，其它存储引擎是不包含这两个日志的

undolog 回滚日志

redolog 前滚日志













