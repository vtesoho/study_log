# tcp

## 三次握手

客户端---》syn  seq=1122(随机) --->服务端   listen()监听端口，全在此步建立把syn加入到syn队列里面

客户端<----ack acknum=1436,syn seq=3578<----服务端     

客户端---->ack acknum=6579 ---->服务端     到达此步，会在syn队列里面取出数据，把数据放入accept队列


accept函数在什么时候调用？
accept队列里没有数据的时候，accept函数会被阻塞

appept里面有数据的时候，会解除阻塞，accept返回



clientfd = accpet()

accept函数，从accept队列取出一个节点，为该节点分配一个fd。形成一个关联



listent(fd,backlog);  

backlog表示的是什么？？？

表示syn队列的最长有多少节点。

DDos功击,syn泛洪怎么解决

这些功击是只进行三次握手的前二步，造成syn队列满了，或是占用很多内存空间

把backlog设置小一点。



send();返回的是个正数，为什么对端还需要不一定能收到？？