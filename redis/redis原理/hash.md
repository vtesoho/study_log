# hash

hash底层采用的编码与zset基本一致，因为hash不需要排序，把spiplist的部分去掉既可。

1. hash结构默认采用ziplist编码，用以节省内存。ziplist中相邻的两个entry分别保存field和value
2. 当数据量较大时，hash结构会转为ht编码，也就是dict，会被二个条件触发
    * zip中的元素数量超过了hash-max-ziplist-entries(默认512)
    * ziplist中任意entry大小超过了hash-max-ziplist-value(默认64字节)
    