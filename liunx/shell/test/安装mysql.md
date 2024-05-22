# 安装mysql


https://dev.mysql.com/

```shell
#!/bin/bash

# 定义MySQL版本和安装路径
MYSQL_VERSION="8.0.28"  # 修改为您需要的版本号
MYSQL_BASE_DIR="/usr/local/mysql"
MYSQL_DATA_DIR="/var/lib/mysql"
MYSQL_LOG_DIR="/var/log/mysql"

# 定义实例端口和MySQLX端口
MYSQL_PORTS=(3306 3307 3308)
MYSQLX_PORTS=(33060 33061 33062)
ROOT_PASSWORD="YourStrongPassword"

# 更新系统并安装必要的软件包
sudo yum update -y
sudo yum install -y wget

# 下载并安装MySQL Yum Repository
wget https://repo.mysql.com//mysql84-community-release-el8-1.noarch.rpm
sudo yum localinstall -y mysql84-community-release-el8-1.noarch.rpm

# 安装MySQL Server
sudo yum install -y mysql-community-server

# 停止默认的MySQL服务
sudo systemctl stop mysqld

# 函数：安装MySQL实例
install_mysql_instance() {
    local port=$1
    local xport=$2
    local base_dir="${MYSQL_BASE_DIR}/${port}"
    local data_dir="${MYSQL_DATA_DIR}${port}"
    local log_dir="${MYSQL_LOG_DIR}"
    local conf_file="/etc/my${port}.cnf"
    local socket_file="/var/run/mysqld/mysqld${port}.sock"
    local log_file="${log_dir}/${port}.log"
    local pid_file="/var/run/mysqld/mysqld${port}.pid"

    echo "安装MySQL实例到端口${port}..."

    # 创建必要的目录
    sudo mkdir -p ${base_dir}
    sudo mkdir -p ${data_dir}
    sudo mkdir -p ${log_dir}
    sudo chown -R mysql:mysql ${base_dir}
    sudo chown -R mysql:mysql ${data_dir}
    sudo chown -R mysql:mysql ${log_dir}

    # 复制默认的配置文件并修改端口和数据目录
    sudo cp /etc/my.cnf ${conf_file}
    sudo sed -i "s|^datadir=.*|datadir=${data_dir}|g" ${conf_file}
    sudo sed -i "s|^socket=.*|socket=${socket_file}|g" ${conf_file}
    sudo sed -i "s|^log-error=.*|log-error=${log_file}|g" ${conf_file}
    sudo sed -i "s|^pid-file=.*|pid-file=${pid_file}|g" ${conf_file}
    sudo sed -i "s|^port=.*|port=${port}|g" ${conf_file}
    sudo sed -i "/\[mysqld\]/a mysqlx-port=${xport}" ${conf_file}
    sudo sed -i "/\[mysqld\]/a mysqlx-bind-address=0.0.0.0" ${conf_file}

    # 初始化MySQL数据目录
    sudo mysqld --initialize-insecure --user=mysql --datadir=${data_dir}

    # 创建systemd服务文件
    local service_file="/etc/systemd/system/mysqld${port}.service"
    sudo cp /usr/lib/systemd/system/mysqld.service ${service_file}
    sudo sed -i "s|/etc/my.cnf|${conf_file}|g" ${service_file}
    sudo sed -i "s|/var/lib/mysql|${data_dir}|g" ${service_file}
    sudo sed -i "s|/var/run/mysqld/mysqld.pid|${pid_file}|g" ${service_file}
    sudo sed -i "s|/usr/sbin/mysqld|/usr/sbin/mysqld --defaults-file=${conf_file}|g" ${service_file}

    # 启动MySQL实例
    sudo systemctl daemon-reload
    sudo systemctl start mysqld${port}
    sudo systemctl enable mysqld${port}

    # 设置root密码
    mysql -u root --socket=${socket_file} <<-EOF
        ALTER USER 'root'@'localhost' IDENTIFIED BY '${ROOT_PASSWORD}';
        FLUSH PRIVILEGES;
EOF

    if [ $? -eq 0 ]; then
        echo "MySQL实例（端口：${port}）的root密码设置成功。"
    else
        echo "MySQL实例（端口：${port}）的root密码设置失败。"
    fi

    echo "MySQL实例已安装并运行在端口${port}，MySQLX端口为${xport}。"
}

# 安装和配置每个MySQL实例
for i in "${!MYSQL_PORTS[@]}"; do
    install_mysql_instance ${MYSQL_PORTS[$i]} ${MYSQLX_PORTS[$i]}
done

echo "所有MySQL实例已成功安装和配置。"


```

查看初始密码
```
grep 'temporary password' /var/log/mysqld.log
```


mysql 目录	说明
/var/lib/mysql	mysql数据文件存放路径，可自定义
/etc/my.cnf	mysql配置文件路径
/usr/lib64/mysql	mysql库文件路径
/usr/bin/mysql*	mysql二进制可执行文件路径
/etc/rc.d/init.d/mysqld	mysql服务管理脚本地址
/var/log/mysqld.log	mysql日志文件路径
