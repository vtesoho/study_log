## linux virtual server

管理集群服务：增，改，删

转发80示例
```
ipvsadm -A -t 10.0.0.100:80 -s srr
```