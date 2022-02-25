## redis6特性

## io threads  

IO 线程和worker不是一个线程

setp:0 

多数复用器得到请求数，不包含数据的拷贝和传递

setp:1
接下来是读取请求数量到程序

io thread  只是读取io


setp:2
所有的请求放到一个线程还是多个线程

redis：是放到一个线程
tomcat交给多个线程



默认关闭io读
默认开启写io



理论知道：眼神的问题
计组的知道（network,io,nio,epoll)


写操作没有cpu缓存么？
worker是单线程