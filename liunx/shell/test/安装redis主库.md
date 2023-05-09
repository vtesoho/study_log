```sh
#!/bin/bash

wget http://download.redis.io/releases/redis-7.0.9.tar.gz

tar -zxvf redis-7.0.9.tar.gz

cd /root/vs/redis-7.0.9

make

make install PREFIX=/usr/local/redis

sleep 1s


funWithParam(){
    mkdir -p /root/redis_data/redis_${1}
    mkdir -p /root/redis_log/redis_${1}

    cp -f /root/vs/redis.conf /usr/local/redis/bin/redis_${1}.conf
    sed -i "s/35130/${1}/g" /usr/local/redis/bin/redis_${1}.conf
    sed -i "s/172.28.170.202/10.192.10.200/g" /usr/local/redis/bin/redis_${1}.conf
    sed -i "s/# replicaof <masterip> <masterport>/replicaof no one/g" /usr/local/redis/bin/redis_${1}.conf


    filename="/etc/systemd/system/redis${1}.service"
    echo "[Unit]" > $filename
    echo "Description=redis-${1}-server" >> $filename
    echo "After=network.target" >> $filename
    echo "[Service]" >> $filename
    echo "Type=forking" >> $filename
    echo "ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/bin/redis_${1}.conf" >> $filename
    echo "PrivateTmp=true" >> $filename
    echo "[Install]" >> $filename
    echo "WantedBy=multi-user.target" >> $filename
}


for i in {35130..35199}
do
    funWithParam ${i}
done

for i in {35130..35199}
do
    systemctl daemon-reload
    systemctl start redis35${i}.service
    systemctl enable redis35${i}.service
done
