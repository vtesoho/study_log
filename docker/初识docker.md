安装一些必要的工具
```
yum install -y yum-utils device-mapper-persistent-data lvm2
```

添加Docker的存储库
```
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

安装Docker-ce
```
yum install -y docker-ce
```




### docker 导出容器
```
docker export ***.tar [容器名]
```

### docker 导入镜像
```
docker import ***.tar [镜像名]:[版本名]
```

### docker 运行镜像

--name [要设置容器名]
-itd --restart=always 
```
docker run [镜像名]:[版本名]
```


### 进入容器
```
docker attach [容器名||容器id]

docker exec -it [容器名||容器id] /bin/sh
```

### 重启容器
```
docker restart [容器名||容器id]
```

### 暂停容器
```
docker stop [容器名||容器id]
```

### 启动容器
```
docker start [容器名||容器id]
```

### 查看本地镜像
```
docker images
```

### 搜索dockerHub上的镜像
```
docker search [关键字]
```

### 删除容器
```
docker rm [容器名||容器id]
```


### 删除镜像
```
docker rmi [镜像名||镜像id]
```


### 查看镜像历史
```
docker history [镜像名]
```




