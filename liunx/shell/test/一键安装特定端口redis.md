# 一键安装特定端口redis

```bash
#!/bin/bash


mkdir /root/redis_data
mkdir /root/redis_log
for i in {130..199}
do
    # if ((i % 2 == 0)); then
        mkdir /root/redis_data/redis_35${i}
        mkdir /root/redis_log/redis_35${i}

        cp /root/redis.conf /usr/local/redis/bin/redis_35${i}.conf
        sed -i "s/35130/35${i}/g" /usr/local/redis/bin/redis_35${i}.conf

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

        
        
    # fi
    
done
sleep 1s

for i in {130..199}
do
    # if ((i % 2 == 0)); then
        systemctl daemon-reload

        systemctl start redis35${i}.service

        systemctl enable redis35${i}.service
    # fi
done
```





```bash
#!/bin/bash
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




