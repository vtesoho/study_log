# Redis内存回收

## 过期策略

redis可以通过expire命令给redis的key设置TTL(存活时间)

当key的TTL到期以后，再次访问name返回的是nil，说明这个key已经不存在了，对应的内存也得到释放。从而起到内存回收的目的。


#### Redis是如何知道一个key是否过期呢？
利用两个dict分别记录key-value对及key-ttl对

#### 是不是TTL到期就立即 删除了呢？
1. 惰性删除
2. 周期删除



## 过期策略-惰性删除
惰性删除：并不是在TTL到期后就立即删除，而是在访问一个key的时候，检查该key的存活时间，如果已经过期才执行删除。


## 过期策略-周期删除
是通过一个定时任务，周期性的抽样部分过期key,然后执行删除。执行周期有两种：

1. redis会设置一个定时任务serverCron(),按照server.hz的频率来执行key清理，模式为SLOW
2. redis的每个事件循环前会调用beforeSleep()函数，执行过期key清理，模式为FAST

+ SLOW模式规则
1. 执行频率受server.hz影响，默认为10，即每秒执行10次，每个执行周期100ms
2. 执行清理耗时不超过一次执行周期的25%
3. 逐个遍历db，逐个遍历db中的bucket，抽取20个key判断是否过期
4. 如果没达到时间上限（25ms)并且过期key比例大于10%，再进行一次抽样，否则结束

+ FAST模式(过期key比例小于10%不执行)
1. 执行频率受beforeSleep()调用频率的影响，但两次FAST模式间隔不低于2ms
2. 执行清理耗时不超过1ms
3. 逐个遍历db，逐个遍历db中的bucket，抽取20个key判断是否过期
4. 如果没达到时间上限(1ms)并且过期key比例大于10%，再进行一次抽样，否则结束


## 总结
+ 在redis中通过一个dict记录每个key的TTL时间

过期key的删除策略
+ 惰性清理：每次查找key时判断是否过期。如果过期则删除
+ 定期清理：定期抽样部分key，判断是否过期，如果过期则删除

定期清理的两种模式：
+ SLOW模式执行频率默认为每秒10次,每次不超过25ms
+ FAST模式执行频率不固定，但两次间隔不低于2ms，每次耗时不超过1ms