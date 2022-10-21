# 安装redis


http://download.redis.io/releases/

```shell
#!/bin/bash
wget http://download.redis.io/releases/redis-7.0.5.tar.gz

tar -zxvf redis-7.0.5.tar.gz

cd redis-7.0.5

make

make install PREFIX=/usr/local/redis

cp /usr/local/redis-7.0.5/redis.conf /usr/local/redis/bin/


```
服务操作命令
```
systemctl start redis.service   #启动redis服务

systemctl stop redis.service   #停止redis服务

systemctl restart redis.service   #重新启动服务

systemctl status redis.service   #查看服务当前状态

systemctl enable redis.service   #设置开机自启动

systemctl disable redis.service   #停止开机自启动
```