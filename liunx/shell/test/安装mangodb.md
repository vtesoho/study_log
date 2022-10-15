# 安装mangodb
yum install libcurl openssl

wget https://repo.mongodb.org/yum/redhat/7/mongodb-org/6.0/x86_64/RPMS/mongodb-org-server-6.0.2-1.el7.x86_64.rpm 

rpm -ivh mongodb-org-server-6.0.2-1.el7.x86_64.rpm 

systemctl enable mongod.service

vi /usr/lib/systemd/system/mongod.service