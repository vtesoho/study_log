## 什么是container

```
通过image创建(copy)
在image layer 之上建立一个container layer(可读写)
类比面向对象：类和实例
image负责app的存储和分发，container负责运行app
```

## 快捷操作删除掉所有容器
```
docker rm $(docker container ls -aq)
```

## 删除掉所有已经停掉的容器
```
docker container ls -f "status=exited" -q
```
