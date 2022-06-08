# dict的扩容

dict中的hashtable就是数组结合单向链表的实现，当集合中元素较多时，必然导致哈希冲突增多，链表过长，则查询 效率会大大降低

dict在每次新增键值对时都会检查负载因子（已使用/哈希表大小）,满足以下两种情况时会触发哈希表扩容
1. 负载因子>=1，并且服务器没有执行bgsave或者bgrewriteaof等后台进程：
2. 负载因子>5;

# dice的收缩

dict 除了扩容以外，每次删除元素时，也会对负载因子做检查，当负载因子<0.1时会做哈希表收缩。


# dict的rehash

dict的rehash并不是一次性完成的，如果dict中包含几百万元素，要在一次rehash完成，会导致主线程阻塞。

因此dict的rehash是分多次、渐进式的完成，因此称为渐进式rehash


1. 计算hash表的size,值取永于当前要做的是扩容还是收缩
    + 如果是扩容，则新size为第一个大于等于dict.ht[0].used + 1 的2N次方
    + 如果是收缩，则新size为第一个大于等于dict.ht[0].sued 的2N次方(不得小于4)
2. 按照新的size申请内存空间，创建dictht，并赋值给dict.ht[1]
3. 设置dict.rehashidx = 0(正常是-1),表示开始rehash
4. 每次新增、查询、修改、删除操作时，都检查一下dict.rehashidx是否大于-1，如果是则将dict.ht[0].table[rehashidx]的entry链表rehash到dict.ht[1]，并且将rehashidx++。直至.ht[0]的所有数据都rehash到dict.ht[1]
5. 将dict.ht[1]赋值给dict.ht[0],并将dict.ht[1]清空为null,释放原来的dict.ht[0]的内存
6. 将rehashidx赋值为-1 ,代表rehash结束
7. 在rehash过程中，新增操作，直接写入ht[1],查询，修改和删除则会在ht[0]和ht[1]依次查找并执行。这样可以确保ht[0]的数据只减不增，随着rehash最终为空


# dict的结构 

类型java的hashtable，底层是数组加链表来解决哈希冲突
dict包含两个哈希表，ht[0]平常用,ht[1]用来rehash

















