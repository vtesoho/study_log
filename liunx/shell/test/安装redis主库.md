```sh
#!/bin/bash

wget http://download.redis.io/releases/redis-7.0.9.tar.gz

tar -zxvf redis-7.0.9.tar.gz

cd /root/redis-7.0.9

make

make install PREFIX=/usr/local/redis

sleep 1s
for i in {130..200}
do
    d=1
    b=4
    c=$((i % b))
    e=$((c+d))
    if ((e == 2)); then
        mkdir -p /root/redis_data/redis_35${i}
        mkdir -p /root/redis_log/redis_35${i}

        cp -f /root/redis.conf /usr/local/redis/bin/redis_35${i}.conf
        sed -i "s/35130/35${i}/g" /usr/local/redis/bin/redis_35${i}.conf
        sed -i "s/# replicaof <masterip> <masterport>/replicaof no one/g" /usr/local/redis/bin/redis_35${i}.conf
        sed -i "s/172.28.170.202/172.28.171.3/g" /usr/local/redis/bin/redis_35${i}.conf


        filename="/etc/systemd/system/redis35${i}.service"
        echo "[Unit]" > $filename
        echo "Description=redis-35${i}-server" >> $filename
        echo "After=network.target" >> $filename
        echo "[Service]" >> $filename
        echo "Type=forking" >> $filename
        echo "ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/bin/redis_35${i}.conf" >> $filename
        echo "PrivateTmp=true" >> $filename
        echo "[Install]" >> $filename
        echo "WantedBy=multi-user.target" >> $filename
        
    fi
    
done
sleep 1s

for i in {130..200}
do
    d=1
    b=4
    c=$((i % b))
    e=$((c+d))
    if ((e == 2)); then
        systemctl daemon-reload

        systemctl start redis35${i}.service

        systemctl enable redis35${i}.service
    fi
done
```