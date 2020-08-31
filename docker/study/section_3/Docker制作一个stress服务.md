## docker 制作一个服务

建立一个Dockerfile文件
```
FROM ubuntu
RUN apt-get update && apt-get install -y stress
ENTRYPOINT ["/usr/bin/stress"]  //默认运行进程
CMD []  //一个空的cmd用来传递参数 
```