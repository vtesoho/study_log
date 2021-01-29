
### componser安装
```
#安装
yum -y install curl
#检查是否安装成功
curl --version

curl -sS https://getcomposer.org/installer | php
```



docker run -d -p 8092:80  --restart=always --privileged  --name ydn_tools \
-v /root/ydntool/www/ydntool:/var/www/html \
-v /root/ydntool/nginx/conf.d:/etc/nginx/conf.d \
-v /root/ydntool/log:/var/log/nginx \
ydn_tools:latest