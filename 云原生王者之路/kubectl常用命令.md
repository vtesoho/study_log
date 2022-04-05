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
