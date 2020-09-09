## docker建立docker环境

```


创建目录
mkdir /home/jenkins

赋予权限
chown -R 1000:1000 /home/jenkins/

运行容器
docker run -d -p 80:8080 -p 50000:50000 -v /home/jenkins:/var/jenkins_home --name jenkins --privileged=true  -u root jenkins/jenkins


```