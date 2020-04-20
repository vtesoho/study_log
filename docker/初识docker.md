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