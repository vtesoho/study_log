# 安装mangodb
yum install -y libcurl openssl

wget https://repo.mongodb.org/yum/redhat/7/mongodb-org/6.0/x86_64/RPMS/mongodb-org-server-6.0.2-1.el7.x86_64.rpm

rpm -ivh mongodb-org-server-6.0.2-1.el7.x86_64.rpm 

systemctl enable mongod.service

vi /usr/lib/systemd/system/mongod.service





```
vim /etc/yum.repos.d/mongodb-org-6.0.repo


[mongodb-org-6.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/6.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-6.0.asc



```

```
sudo yum install -y mongodb-org

```

安装固定版本
```
sudo yum install -y mongodb-org-6.0.4 mongodb-org-database-6.0.4 mongodb-org-server-6.0.4 mongodb-org-mongos-6.0.4 mongodb-org-tools-6.0.4

```

```
sudo systemctl daemon-reload

sudo systemctl start mongod

```