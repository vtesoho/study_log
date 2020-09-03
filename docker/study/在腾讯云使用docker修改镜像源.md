## 在腾讯云使用docker修改镜像源

第一步
```
vim /etc/docker/daemon.json
```

加入如下内容
```
{
   "registry-mirrors": [
       "https://mirror.ccs.tencentyun.com"
  ]
}
```


第二步
```
systemctl daemon-reload
service docker restart
```

第三步

查看是否生效
```
docker info
```

如果生效会包含如下内容
```
Registry Mirrors:
    https://mirror.ccs.tencentyun.com
```