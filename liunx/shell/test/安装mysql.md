# 安装mysql


https://dev.mysql.com/

```shell
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

wget https://repo.mysql.com//mysql80-community-release-el7-7.noarch.rpm

rpm -ivh mysql80-community-release-el7-7.noarch.rpm

```



mysql 目录	说明
/var/lib/mysql	mysql数据文件存放路径，可自定义
/etc/my.cnf	mysql配置文件路径
/usr/lib64/mysql	mysql库文件路径
/usr/bin/mysql*	mysql二进制可执行文件路径
/etc/rc.d/init.d/mysqld	mysql服务管理脚本地址
/var/log/mysqld.log	mysql日志文件路径
