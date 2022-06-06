# 动态字符串

redis中保存的是key是字符串,value往往是字符串或者字符串的集合，可见字符串是redis中最常用的一种数据结构。

不过redis没有直接使用c语言中的字符串，因为C语言字符串存在很多问题：

1. 获取字符串长度需要遍历
2. 非二进制安全（如果存在\0就会被认为是结束）
3. 不可修改（分配了就不能修改）

所以Redis构建了一种新的字符串结构，称为简单动态字符串（simple dynamic string)，简称SDS.



```C
struct __attribute__ ((__packed__)) sdshdr8 {
    uint8_t len; /* used */ buf已保存的字符串字节数
    uint8_t alloc; /* excluding the header and null terminator */ buf申请的总字节数
    unsigned char flags; /* 3 lsb of type, 5 unused bits */ 不同的sds的头类型，用来控制sds的大小
    char buf[];
};
```



sds 之所以叫做动态字符串，是因为它具备动态扩容的能力，例如一个内容为hi的sds:

len:2|alloc:2|floags:1|hi\0

假如我们要给sds追加一段字符串,amy，这里首先会申请新内存空间：

len:6|alloc:12|flags:1|hi,amy\0

1. 如果新字符串小于1M，则新空间为扩展后字符串长度的两倍+1
2. 如果新字符串大于1M，则新空间扩展后字符串长度+1M+1。这种称之为内存预分配


## sds的优点
1. 获取动态字符串长度的时间复杂度为O(1)
2. 支持动态扩容
3. 减少内存分配次数
4. 二进制安全










