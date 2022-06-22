# string

string是redis中最常见的数据存储类型

1. 最基本的编码方式是raw，基于简单动态字符串sds 实现，存储上限为512mb.
2. 如果存储的sds长度小于44字节，则会采用embstr编码，此时object head与sds是一段连续内存空间，申请内存时只需要调用一次内存分配函数，效率更高
3. 如果存储的字符串是整数值，并且大小在long_max范围内，则会采用int编码：直接将数据保存在redisobject的ptr指针位置，刚好8字节。不需要sds

