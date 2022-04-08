# kubectl常用命令


创建名为hello的命名空间
```
kubectl create ns hello
```

查看命名空间
```
kubectl ge ns
```

删除名为hello的命名空间
```
kubectl deletge ne hello
```

使用yaml创建命名空间
```yaml
apiVersion: v1
kind: Namespace
metadata:
    name: hello
```


## pod

查看default 名称空间pod
```Bash
kubectl get pod
```

查看某个pod的描述
kubectl describe pod pod名字

删除pod
kubectl delete pod pod名字

删除某个用yaml文件创建的pod
kubectl delete -f pod.yaml


查看某个pod的日志
```
kubectl logs mynginx 
kubectl logs -f mynginx //实时追踪日志
```


每个pod - k8s都会分配一个ip
```
kubectl get pod -owide
```
使用pod的ip+pod里面运行容器的端口




同一个pod下的不同容器，可以直接通过本地127.0.0.1:端口来访问，各应用之间端口不能冲突



## Deployment

```
# 清除所有Pod，比较下面两个命令有何不同效果？
kubectl run mynginx --image=nginx

kubectl create deployment mytomcat --image=tomcat:8.5.68
# 自愈能力

```


### 1、多副本
```
kubectl create deployment my-dep --image=nginx --replicas=3
```
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: my-dep
  name: my-dep
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-dep
  template:
    metadata:
      labels:
        app: my-dep
    spec:
      containers:
      - image: nginx
        name: nginx
```


### 扩缩容

```
kubectl scale --replicas=5 deployment/my-dep

kubectl edit deployment my-dep

#修改 replicas
```


### 3、自愈&故障转移
● 停机
● 删除Pod
● 容器崩溃
● ....