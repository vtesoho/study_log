# frp安装记录

## 服务器


```
tar -xvf 'frp_0.34.0_linux_amd64.tar.gz'
cd frp_0.34.0_linux_amd64/
cp frps /usr/bin/
mkdir /etc/frp/
vim frps.ini
----------
[common]
bind_port = 5880

log_file = /var/log/frp/frps.log
log_level = info
log_max_days = 3

# Dashboard configuration
dashboard_addr = 0.0.0.0
dashboard_port = 7500
dashboard_user = admin
dashboard_pwd = admin

token = jieguoweiwu
----------
mkdir /var/log/frp/
chmod 777 /var/log/frp/
cp frps.ini /etc/frp/
cp frps.service /usr/lib/systemd/system/
systemctl enable frps
systemctl start frps
```



## 用户端
```
tar -xvf frp_0.34.0_linux_amd64.tar.gz
cd frp_0.34.0_linux_amd64

cp frpc /usr/bin/
mkdir /etc/frp/
vim frpc.ini
----------
[common]
server_addr = *.*.*.*
server_port = 5880
token = jieguoweiwu
[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6005
[centos-works1]
type = tcp
local_ip = 192.168.0.245
local_port = 22
remote_port = 6006
[centos-works2]
type = tcp
local_ip = 192.168.0.247
local_port = 22
remote_port = 6007
[centos-works3]
type = tcp
local_ip = 192.168.0.248
local_port = 22
remote_port = 6008


----------
cp frpc.ini /etc/frp/

```