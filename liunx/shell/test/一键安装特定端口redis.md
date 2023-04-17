# 一键安装特定端口redis

```bash
#!/bin/bash

wget http://download.redis.io/releases/redis-7.0.9.tar.gz

tar -zxvf redis-7.0.9.tar.gz

cd /root/redis-7.0.9

make

make install PREFIX=/usr/local/redis

cp /root/redis-7.0.9/redis.conf /usr/local/redis/bin/


mkdir /root/redis_data
mkdir /root/redis_log
for i in {130..199}
do
    if ((expr i % 4 == 1)); then
        mkdir /root/redis_data/redis_35${i}
        mkdir /root/redis_log/redis_35${i}

        cp /root/redis.conf /usr/local/redis/bin/redis_35${i}.conf
        sed -i "s/35130/35${i}/g" /usr/local/redis/bin/redis_35${i}.conf
        sed -i "s/# replicaof <masterip> <masterport>/replicaof no one${i}/g" /usr/local/redis/bin/redis_35${i}.conf
        sed -i "s/172.28.170.202/172.28.171.1/g" /usr/local/redis/bin/redis_35${i}.conf


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

for i in {130..199}
do
     if ((expr i % 4 == 1)); then
        systemctl daemon-reload

        systemctl start redis35${i}.service

        systemctl enable redis35${i}.service
    fi
done
```





```bash
#!/bin/bash

wget http://download.redis.io/releases/redis-7.0.9.tar.gz

tar -zxvf redis-7.0.9.tar.gz

cd /root/redis-7.0.9

make

make install PREFIX=/usr/local/redis

sleep 1s

i = 48478

mkdir /root/redis_data
mkdir /root/redis_log
mkdir /root/redis_data/redis_${i}
mkdir /root/redis_log/redis_${i}

cp /root/redis.conf /usr/local/redis/bin/redis_35${i}.conf
sed -i "s/35130/${i}/g" /usr/local/redis/bin/redis_${i}.conf

filename="/etc/systemd/system/redis${i}.service"
echo "[Unit]" > $filename
echo "Description=redis-${i}-server" >> $filename
echo "After=network.target" >> $filename
echo "[Service]" >> $filename
echo "Type=forking" >> $filename
echo "ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/bin/redis_${i}.conf" >> $filename
echo "PrivateTmp=true" >> $filename
echo "[Install]" >> $filename
echo "WantedBy=multi-user.target" >> $filename

    
sleep 1s

systemctl daemon-reload

systemctl start redis${i}.service

systemctl enable redis${i}.service
```








# 安装slave

```sh
#!/bin/bash

wget http://download.redis.io/releases/redis-7.0.9.tar.gz

tar -zxvf redis-7.0.9.tar.gz

cd /root/redis-7.0.9

make

make install PREFIX=/usr/local/redis

sleep 1s
# cp /root/redis-7.0.9/redis.conf /usr/local/redis/bin/

# mkdir /root/redis_data
# mkdir /root/redis_log
for i in {130..199}
do
    d=1
    b=4
    c=$((i % b))
    e=$((c+d))
    if ((e == 4)); then
        mkdir -p /root/redis_data/redis_35${i}
        mkdir -p /root/redis_log/redis_35${i}

        cp /root/redis.conf /usr/local/redis/bin/redis_35${i}.conf
        sed -i "s/# replicaof <masterip> <masterport>/replicaof 172.28.171.5 35${i}/g" /usr/local/redis/bin/redis_35${i}.conf
        sed -i "s/172.28.170.202/172.28.171.9/g" /usr/local/redis/bin/redis_35${i}.conf
        sed -i "s/# masterauth <master-password>/masterauth 4lWvlMEvaPNmeIqUc13m7qmaGzZQ53/g" /usr/local/redis/bin/redis_35${i}.conf
        sed -i "s/35130/35${i}/g" /usr/local/redis/bin/redis_35${i}.conf
        sed -i "s/save 3600 1/save ""/g" /usr/local/redis/bin/redis_35${i}.conf
        sed -i "s/save 3000 10000/# save 3000 10000/g" /usr/local/redis/bin/redis_35${i}.conf
        sed -i "s/save 600 1000000/# save 600 1000000/g" /usr/local/redis/bin/redis_35${i}.conf


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

for i in {130..199}
do
    d=1
    b=4
    c=$((i % b))
    e=$((c+d))
    if ((e == 4)); then
        systemctl daemon-reload

        systemctl start redis35${i}.service

        systemctl enable redis35${i}.service
    fi
done
```