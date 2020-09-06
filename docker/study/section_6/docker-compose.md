## docker-composer

docker 搭建一个wordpress
```
//建立一个mysql container
docker run -d --name mysql -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=wordpress mysql

//建立一个wordpress container
docker run -d -e WORDPRESS_DB_HOST=mysql:3306 --link mysql -p 8080:80 wordpress
```


## docker-compser 的三个概念

### services
```
一个service 代表一个container，这个container可以从dockerhub的image来创建，或者从本地的dockerfile build出来的image创建

service的启动类似docker run ，我们可以给其指定network和volume，所以可以给service指定network和volume的引用。
```


一个简单的workpress的yml
```
version: '3'

services:
  wordpress:
    image: wordpress
    ports:
      - 8080:80
    environment:
      WORDPRESS_DB_HOST: mysql
      WORDPRESS_DB_PASSWORD: root
    networks:
      - my-bridge
    
  mysql:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: wordpress
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - my-bridge
  
volumes:
  mysql-data:

networks:
  my-bridge:
    driver: bridge
```


## 一些简单的docker-compose 命令
```
启动一个编写好的docker-compose文件
docker-compose up //在当前目录的情况下，如果文件名不叫docker-compose.yml，则需加-f [文件名] 来运行

//查看所运行的情况
docker-compose ps

//查看docker-compose.yml所创建的images情况
docker-compose images

//进入docker-compose.yml所创建的容器，与docker exec一样
docker-compose exec [容器名] bash
```