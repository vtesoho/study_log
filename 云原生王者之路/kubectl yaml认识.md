```yaml
apiVersion: v1  //版本号
kind: Pod  //资源类型
metadata:  //pod的一些源数据 
  labels:
    run: mynginx
  name: mynginx  //pod的名字叫什么
spec:  //pod的详细信息
  containers:  //pod里面启动的容器
  - image: nginx   //镜像名
    name: mynginx  //容器名
```