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