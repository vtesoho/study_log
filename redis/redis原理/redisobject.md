# redisobject

redis中的任意数据类型的键和值都会被封装为一个redisobject，也叫做redis对象，源码如下

```c++
typedef struct redisObject {
    unsigned type:4;  (对象类型，分别是string,hash,list,set和zset，占4个bit位)
    unsigned encoding:4;(底层编码方式，共11种，占4个bit位)
    unsigned lru:LRU_BITS;(lru表示该对象最后一次访问的时间，其占用24个bit位。便于判断空闲时间太久的key)
    int refcount;(对象引用计数器，计数器为0则说明对象太久无人引用，可以被回收)
    void *ptr;(指针，指向存放实际数据的空间)
} robj;
```

一个redisObject实际就占用16字节的内存空间，如果有可能，尽量用集合，list


## redis的编码方式

|编号|编码方式|说明|
|--|--|--|
0|OBJ_ENCODING_RAW|raw编码动态字符串
1|OBJ_ENCODING_INT|long类型的整数的字符串
2|obj_encoding_ht|hash表
3|obj_encoding_zipmap| 废弃
4|obj_encoding_zinkedlist|双端链表
5|obj_encoding_ziplist|压缩列表
6|obj_encoding_intset|整数集合
7|obj_encoding_skiplist|跳表
8|obj_encoding_embstr|embstr的动态字符串
9|obj_encoding_quicklist|快速列表
10|obj_encoding_stream|stream流


## 五种数据结构 

|数据类型|编码方式|
|--|--|
|obj_string|int,embstr,raw
obj_list|linkedlist和ziplist(3.2以前),quicklist(3.2以后)
obj_set|intset,ht
obj_zset|ziplist,ht,skiplist
obj_hash|ziplist,ht


