# rocketmq和kafka怎么选型？、

1. 主题很多：rocketmq(文件存储设计的原因)
2. 公司业务比较广：rocketmq(顺序消息，延时消息，事务消息，批量消息)
3. kafka:大数据，需要做流式处理（主题比较少）

零拷贝：一类技术

定义：减少没有必要的拷贝技术，称之为零拷贝

200M的数据，做4次拷贝，和mmap三次拷贝

一次dma时间2ms
一次cpu拷贝200ms


### 消息的写入流程

堆外内存

堆内存 new Object(),好用 ，jvm会自动揹回收管理

问题在此：拉级回收GC：会有暂停

堆外内存：jvm不会自去化拉级回收管理的区域

代码手动分配，手动回收


### 堆外内存怎么用？

开启条件：必须异步复制(如果是同步刷盘，堆外内存的缓冲机制 做不到，rocketmq内部进行了限制)

高并发：要求，多余的内存。对于消费来说可以接受一定的延迟