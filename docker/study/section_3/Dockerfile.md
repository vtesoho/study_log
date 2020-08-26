## Dockerfile

### FROM

```
FROM scratch //制作base image
FROM centos # 使用base image
```


### LABEL
相当于描述
```
Metadata不可少

```


### RUN
为了美观，复杂的run用反斜线换行，避免无用的分层，合并多条命令成一行！
```
RUN yum dpdate && yum install -y vim \
python-dev  #反斜线换行
```


### WORKDIR
用WORKDIR，不要用run cd，尽量使用绝对目录
```
WORKDIR /root
WORKDIR /test  #如果 没有会自动创建test目录

```


### ADD
ADD添加到目录并解压，大部分情况下，COPY优于ADD

ADD除了COPY还有额外的功能（解压）

添加远程文件、目录请使用curl或者wget!
```
ADD hello /test  #把本地的文件添加到docker contaner 的/test目录里面，如果是压缩文件ADD会解压
```

### COPY
```
COPY hello /test  #把本地的文件添加到docker contaner 的/test目录里面，
```

### ENV
设置一个环境变量
```
ENV MYSQL_VERSION 5.6
RUN apt-get install -y mysql-server = "${MYSQL_VERSION}"  #引用常量
```

### VOLUME
存储
```
```

### EXPOSE
网络
```
```


### CMD


### ENTRYPOINT