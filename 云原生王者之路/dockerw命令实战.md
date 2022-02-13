## 进阶实战

#### 以前部署

golang为例
1. 编程成可执行文件
2. 上传到服务器
3. 执行可执行文件

#### 现在部署
1. 所有机器都安装docker，任何应用都是镜像，所有机器都可以运行。

## 怎么打包-Dockerfile
```
FROM openjdk:8-jdk-slim
LABEL maintainer=leifengyang

COPY target/*.jar   /app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
```

## Dockerfile编译成image
```
docker build -t java-demo:v1.0 .
```

## 分享镜像
```
# 登录docker hub
docker login

#给旧镜像起名
docker tag java-demo:v1.0  leifengyang/java-demo:v1.0

# 推送到docker hub
docker push leifengyang/java-demo:v1.0

# 别的机器
docker pull leifengyang/java-demo:v1.0

# 别的机器运行
docker run -d -p 8080:8080 --name myjava-app java-demo:v1.0 
```