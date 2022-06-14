# quicklist

Q:ziplist虽然节省内存，但申请内存必须是连续空间，如果内存占用较多，申请内存效率很低，怎么办？

A:为了缓解这个问题，我们必须限制ziplist的长度和entry大小。

Q：但是我们要存储大量数据，超出了ziplist最佳上限怎么办？

A：可以创建多个ziplist来分片存储数据。

Q：数据拆分后比较分散，不方便管理和查找，这多个ziplist如何建立联系。

A；redis在3.2版本引入了新的数据结构 quicklist，它是一个双端链表，只不过链表中的每个节点都是一个ziplist


为了避免quick中的每个ziplist中entry过多，redis提供了一个配置项：list-max-ziplist-size来限制。

* 如果为正数，则代表ziplist的允许entry个数的最大值
* 如果为负数，则代表zip的最大内存大小，有5种情况
    1. -1：每个ziplist的内存占用不能超过4kb
    2. -2：每个ziplist的内存占用不能超过8kb
    3. -3：每个ziplist的内存占用不能超过16kb
    4. -4：每个ziplist的内存占用不能超过32kb
    5. -5：每个ziplist的内存占用不能超过64kb

默认配置是-2





quicklist的特点

是一个节点为ziplist的双端链表

节点采用ziplist，解决了传统链表的内存占用问题

控制ziplist大小，解决连续内存空间申请效率问题

中间节点可以压缩，进一步节省内存


