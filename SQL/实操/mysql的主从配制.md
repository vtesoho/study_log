### mysql的主从配制


#### 安装
```
wget https://repo.mysql.com//mysql80-community-release-el8-1.noarch.rpm

rpm -ivh mysql80-community-release-el8-1.noarch.rpm

yum install mysql-server

systemctl list-unit-files|grep mysqld

systemctl enable mysqld.service

systemctl start mysqld.service

mysql -uroot -p

ALTER USER 'root'@'localhost' IDENTIFIED BY '11111111';

```

