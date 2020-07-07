# docker搭建php运行环境

### 前期准备

建立如下二个目录
```
mkdir /Users/***/web/www
mkdir /Users/***/web/nginx/conf.d
```

建立nginx配置文件
```
cd /Users/***/web/nginx/conf.d && 

touch default.conf 
```

default.conf
```
server {
    listen       80;
    server_name  localhost;
    root /var/www/html/public;
    index index index.html index.php;

    location / {
        if ($request_uri ~* "\.(flv|gif|jpe?g|png|ico|swf|js|css|pdf|otf|eot|svg|ttf|woff)(\?[0-9]+)?$") {
            expires max;
        }
        
        try_files $uri $uri/ /index.php?$query_string;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    location ~ \.php$ {
        fastcgi_pass   [php-fpm容器名]:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  /var/www/html/public/$fastcgi_script_name;
        include        fastcgi_params;
    }
}

```


先拉取线上的镜像
```
docker pull php:7.3.8-fpm

docker pull nginx
```

先运行php-fpm
```
docker run --name [容器名] -v [本地项目目录]:/var/www/html -d --privileged=true php:7.3.8-fpm

例：docker run --name name -v /Users/***/web/www:/var/www/html -d --privileged=true php:7.3.8-fpm
```

在运行nginx
```
docker run --name [容器名] -itd -v /Users/***/web/www:/usr/share/nginx/html:ro -v /Users/***/web/nginx/conf.d:/etc/nginx/conf.d:ro -p [宿主机端口]:80 --link [php-fpm容器名]:php  nginx
```

这几步走下来不出意外就已经跑起来了，如果项目有依赖mysql、redis等还需要安装插件。



### 其它问题

在容器里如果访问宿主机的一些服务，比如redis、数据库等

如果是mac系统，可以直接用 docker.for.mac.host.internal 域名来访问本地的数据库等。

windows或是liunx是可以桥接方式或是用net=host模式，共用宿主机的网卡。

