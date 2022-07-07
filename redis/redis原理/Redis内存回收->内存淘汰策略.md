# Redis内存回收->内存淘汰策略

当redis内存使用达到设置的阀值时，redis主动挑选部分key删除以释放更多的内存流程。

redis会在处理客户端命令的方法processCommand()中尝试做内存淘汰。


Redis支持8种不同策略来选择要删除的key
1. noeviction:不淘汰任何key，但是内存满时不允许写入新数据，默认就是这种策略
2. volatile-ttl:对设置了ttl的key，比较key的剩余ttl值，ttl越小越先被淘汰
3. allekys-random:对全体key，随机进行淘汰。也就是直接从db-dict中随机挑选
4. volatile-random:对设置了ttl的key，随机进行淘汰。也就是从db->expires中随机挑选。
5. allkeys-lru:对全体key，基于lur算法进行内存淘汰
6. volatile-lru:对设置了ttl的key,基于lru算法进行淘汰
7. allkeys-lfu: 对全体key，基于lfu算法进行淘汰
8. volatile-lfu: 对设置了ttl的key，基于lfu算法进行淘汰

比较容易混淆的有两个
* LRU(least recently used),最少最近使用。用当前时间减去最后一次访问的时间。这个值越大则淘汰优先级别越高。
* LFU(least frequently used),最少频率使用。会统计每个key的访问频率。值越小淘汰优先级越高。




```c++
typedef struct redisObject {
    unsigned type:4;  (对象类型，分别是string,hash,list,set和zset，占4个bit位)
    unsigned encoding:4;(底层编码方式，共11种，占4个bit位)
    unsigned lru:LRU_BITS;(lru表示该对象最后一次访问的时间，其占用24个bit位。便于判断空闲时间太久的key)
        LRU；以秒为单位记录最近一次访问时间，长度24bit
        LFU：高16位以分钟为单位记录最近一次访问时间，低8位记录逻辑访问次数(16位只最大只能存65535，(通过unix时间戳/60)&65535)计算出来
    int refcount;(对象引用计数器，计数器为0则说明对象太久无人引用，可以被回收)
    void *ptr;(指针，指向存放实际数据的空间)
} robj;
```


LFU的访问次数之所有叫逻辑访问次数，是因为并不是每次key被访问都计数，而是通过运算
1. 生成0~1之间的随机数R
2. 计算1/(旧次数 * lfu_log_factor + 1)，记录为P，lfu_log_factor默认为10
3. 如果R < P，则计数器+1，且最大不超过255
4. 访问次数会随时间衰减，距离上一次访问时间每隔lfu_decay_time分钟（默认为1），计数器-1



