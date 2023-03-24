#sss



```shell
#!/bin/bash
wget http://www.haproxy.org/download/2.7/src/haproxy-2.7.5.tar.gz

wget http://www.lua.org/ftp/lua-5.4.4.tar.gz
tar xvf lua-5.4.4.tar.gz -C /usr/local/src/
cd /usr/local/src/lua-5.4.4/
make linux test
src/lua -v

cd haproxy-2.7.5/

make ARCH=x86_64 TARGET=linux-glibc USE_PCRE=1 USE_OPENSSL=1 USE_ZLIB=1 USE_SYSTEMD=1 USE_LUA=1 LUA_INC=/usr/local/src/lua-5.4.4/src/ LUA_LIB=/usr/local/src/lua-5.4.4/src/


make install PREFIX=/usr/local/haproxy

cp examples/option-http_proxy.cfg /usr/local/haproxy/conf/haproxy.cfg
```