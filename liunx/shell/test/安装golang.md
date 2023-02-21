# 安装golang 

# go1.19.2
```shell
#!/bin/bash
wget https://golang.google.cn/dl/go1.19.2.linux-amd64.tar.gz

tar -zxf go1.19.2.linux-amd64.tar.gz -C /usr/local

echo "" >> /etc/profile
echo "export GOROOT=/usr/local/go"  >> /etc/profile
echo "export GOPATH=/root/golang"  >> /etc/profile
echo "export PATH=$PATH:$GOROOT/bin:$GOPATH/bin"  >> /etc/profile

source /etc/profile
mkdir /root/golang

go env -w GOPROXY=https://goproxy.cn,direct

go env -w "GOFLAGS"="-mod=mod" 


```


#  1.20.1

```shell
#!/bin/bash
wget https://golang.google.cn/dl/go1.20.1.linux-amd64.tar.gz

tar -zxf go1.20.1.linux-amd64.tar.gz -C /usr/local

echo "" >> /etc/profile
echo "export GOROOT=/usr/local/go"  >> /etc/profile
echo "export GOPATH=/root/golang"  >> /etc/profile
echo "export PATH=$PATH:$GOROOT/bin:$GOPATH/bin"  >> /etc/profile

source /etc/profile
mkdir /root/golang

go env -w GOPROXY=https://goproxy.cn,direct

go env -w "GOFLAGS"="-mod=mod" 


```