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

