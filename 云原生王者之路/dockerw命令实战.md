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