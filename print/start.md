siyu打印系统安装流程

安装docker

导入镜像
```
docker import node-siyu.tar node-siyu:latest
```

运行镜像
```
docer run -itd --name node-siyu --restart=always node-siyu:v1 /root/print/printer/printStart.sh
```

配置计划任务 
开机启动 docker-startup.bat