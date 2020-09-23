# ks8实践记录

## 第一步准备几台Linux服务器

角色|主机名|IP地址
--|--|--
Master | centos-master | 192.168.0.246
Node | centos-works1 | 192.168.0.245
Node | centos-works2 | 192.168.0.247
Node | centos-works3 | 192.168.0.248

并设置hosts文件添加主机名与IP映射关系
```
# vim /etc/hosts
192.168.0.246 cnetos-master
192.168.0.245 cnetos-works1
192.168.0.247 cnetos-works2
192.168.0.248 cnetos-works3
```
