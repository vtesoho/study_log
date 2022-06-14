# ziplist

ziplist 是一种特殊的『双端链表』，由于系统特殊编码的连续内存块组成。可以在任意一端进行压入，弹出操作，并且该操作的时候复杂度为O（1)


zlbytes|zltail|zllen|entry|entry|...|entry|zlend

总字节数|尾偏移量|entry个数|             ...|结束标识:0xff

|属性|类型|长度|用途|
|:---|:---|:---|:---|
zlbytes|uint32_t|4字节|记录整个压缩列表占用的内存字节数
zltail|uint32_t|4字节|记录压缩殂尾节点距离压缩列表的起始地址有多少字节，通过这个偏移量，可以确定链表尾节点的地址。
zllen|uint16_t|2字节|记录了压缩列表包含的节点数量。最大值为unit16_max(65534)，如果超过这个值，此处会记录为65535，但节点的真实数量需要遍历整个压缩列表才能计算得出。
entry|列表节点|不定|压缩列表包含的各个节点，节点的长度由节点保存的内容决定
zlend|unit8_t|1字节|特殊值0xFF(255)，用于标记压缩列表的未端



## ziplistentry
ziplist中的entry并不像普通链表那样记录前后节点的指针，因为记录两个指针要占用16个字节，浪费内存。而是采用了下面的结构
|previous_entry_length|encoding|content|

1. previous_entry_length:前一节点的长度，占1个或5个字节
    + 如果前一节点的长度小于254字节，而采用1个字节来保存这个长度值
    + 如果前一节点的长度大于254字节，而采用5个字节来保存这个长度值，第一个字节为0xfe，后四个字节才是真实的长度数据
2. encoding:编码属性，记录content的数据类型（字符串还是整数）以及长度，占用1个、2个或五个字节
3. contents：负责保存节点的数据，可以是字符串或整数

## ziplist的连锁更新问题
这里在某些极端情况下，可能会发现连续更新的问题
比如节点都是251bytes长度的情况下，又新增了一个超过253字节的元素，导致后一节点要记录前一节点大小会超过254字节，previous_entry_length字节数就会变成5，后续所有的就全部超过254，也就是整个ziplist都要更新



## encoding编码字符串
ziplistentry中的encoding编码分为字符串和整数两种：

字符串：如果encoding是以00,01,10开头，则证明content是字符串
|编码|编码长度|字符串大小|
|:---|:---|:---|
00******|1bytes|<=63 buytes
01****** ********|2bytes|<= 16383 bytes
10000000 ******** ******** ******** ********|5bytes|<=4294967295bytes

我们有一个压缩列表，保存的字符串ab和bc


0x13 00 00 00(zlbytes 总字节数19)|    4bytes
0x0e 00 00 00(zltail 尾偏移量:14)|    4bytes
0x02 00(entry数量:2)|   2bytes
0x00(前一节点长度) 0x02(encoding编码) 0x61(a) 0x62(b)|    4bytes
0x04(前一节点前长4) 0x02(encoding编码) 0x62(b) 0x63(c|    4bytes
0xff(结束)   1bytes



## encoding编码整数

整数：如果encoding是以11开始，则证明content是亚娟，且encoding固定只占用1个字节
|编码|编码长度|整数类型|
|:---|:---|:---|
11000000|1|int16_t(2 bytes)
11010000|1|int32_t(4 bytes)
11100000|1|int64_t(8 bytes)
11110000|1|24位有符号整数(3 bytes)
11111110|1|8位有符号整数(1 bytes)
1111****|1|直接在****保存数值，范围从0001~1101,减1后结果为实际值


例如一个ziplist中包含两个整数值2和5

这个ziplist在内存中的结构 
```
0x0f 00 00 00(zlbytes 总字节数：15) | 4 bytes
0x0c 00 00 00(zltail 尾偏移量:12 ) | 4 bytes
0x02 00(zllen entry数量2) 2 bytes
0x00(前一节点长度) 0xf3 (encoding编码) | 2 bytes
0x02(前一节点长度) 0xf6 (encoding编码) | 2 bytes
0xff(结束)|1 bytes

```




 






