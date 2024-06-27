#sss



```shell
#!/bin/bash

yum install -y gcc zlib-devel pcre-devel openssl-devel systemd-devel

tar -zxvf haproxy-3.0.2.tar.gz

cd haproxy-3.0.2/

make clean

make ARCH=x86_64 TARGET=linux-glibc USE_PCRE=1 USE_OPENSSL=1 USE_ZLIB=1 USE_SYSTEMD=1

make install  PREFIX=/usr/local/haproxy

filename="/usr/lib/systemd/system/haproxy.service"

echo "[Unit]" > $filename
echo "Description=HAProxy Load Balancer" >> $filename
echo "After=syslog.target network.target" >> $filename
echo "[Service]" >> $filename
echo "ExecStartPre=/usr/local/haproxy/sbin/haproxy -f /usr/local/haproxy/haproxy.cfg -f /usr/local/haproxy/conf.d/ -c -q" >> $filename
echo "ExecStart=/usr/local/haproxy/sbin/haproxy -Ws -f /usr/local/haproxy/haproxy.cfg -f /usr/local/haproxy/conf.d/ -p /usr/local/haproxy/haproxy.pid" >> $filename
echo "ExecReload=/bin/bash -c '/usr/local/haproxy/sbin/haproxy -f /usr/local/haproxy/haproxy.cfg -f /usr/local/haproxy/conf.d/ -p /usr/local/haproxy/haproxy.pid -sf $(/usr/bin/cat /usr/local/haproxy/haproxy.pid)'" >> $filename
echo "ExecStop=/bin/bash -c '/usr/local/haproxy/sbin/haproxy -p /usr/local/haproxy/haproxy.pid -sf $(/usr/bin/cat /usr/local/haproxy/haproxy.pid)'" >> $filename
echo "Restart=always" >> $filename
echo "[Install]" >> $filename
echo "WantedBy=multi-user.target" >> $filename

haproxycfgfilename="/usr/local/haproxy/haproxy.cfg"

echo "global" > $haproxycfgfilename
echo "    maxconn 40960" >> $haproxycfgfilename
echo "    daemon" >> $haproxycfgfilename
echo "defaults" >> $haproxycfgfilename
echo "    log global" >> $haproxycfgfilename
echo "    mode http" >> $haproxycfgfilename
echo "    timeout connect 20000" >> $haproxycfgfilename
echo "    timeout client 20000" >> $haproxycfgfilename
echo "    timeout server 20000" >> $haproxycfgfilename
echo "    timeout check 2000" >> $haproxycfgfilename
echo "" >> $haproxycfgfilename

mkdir -p /usr/local/haproxy/conf.d/

haproxyconfdcfgfilename="/usr/local/haproxy/conf.d/default.cfg"
echo "frontend https_proxy" >> $haproxyconfdcfgfilename
echo "    bind *:6754" >> $haproxyconfdcfgfilename
echo "    option forwardfor" >> $haproxyconfdcfgfilename
echo "    default_backend default" >> $haproxyconfdcfgfilename
echo "backend default" >> $haproxyconfdcfgfilename
echo "    server server1 127.0.0.1:6854" >> $haproxyconfdcfgfilename
echo "" >> $haproxyconfdcfgfilename

systemctl enable haproxy

systemctl start haproxy


```