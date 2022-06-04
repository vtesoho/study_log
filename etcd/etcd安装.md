# etch 安装



### 下载
```
wget https://github.com/etcd-io/etcd/releases/download/v3.4.18/etcd-v3.4.18-linux-amd64.tar.gz
```

### 解压
```
tar -xzvf etcd-v3.4.18-linux-amd64.tar.gz
```


### 进入目录
```
cd etcd-v3.4.18-linux-amd64
```

### 把程序放入程序目录
```
cp etcd etcdctl /usr/local/bin
```



### 创建一个etcd服务
```
mkdir -p /var/lib/etcd/ && mkdir -p /etc/etcd/

vim /etc/etcd/etcd.conf
------------
# 节点名称
ETCD_NAME="etcd0"
# 指定数据文件存放位置
ETCD_DATA_DIR="/var/lib/etcd/"
------------

vim /etc/systemd/system/etcd.service
-------------
[Unit]
Description=Etcd Server
After=network.target
After=network-online.target
Wants=network-online.target
 
[Service]
User=root
Type=notify
WorkingDirectory=/var/lib/etcd/
## 根据实际情况修改EnvironmentFile和ExecStart这两个参数值
## 1.EnvironmentFile即配置文件的位置，注意“-”不能少
EnvironmentFile=-/etc/etcd/etcd.conf
## 2.ExecStart即etcd启动程序位置
ExecStart=/usr/local/bin/etcd
Restart=on-failure
LimitNOFILE=65536
 
[Install]
WantedBy=multi-user.target
-------------


重新加载systemd服务
systemctl daemon-reload


设置开机自启动
systemctl enable etcd 


启动etcd
systemctl start etcd


查看etcd运行状态
systemctl status etcd

停止服务
systemctl stop etcd

重启etcd
systemctl restart etcd
```


