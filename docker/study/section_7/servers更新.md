## servers更新


### 如何在保证服务不中断的情况下进行更新

```
# 测试

# 创建一上overlay的网络
docker network create -d overlay demo

# 建立一个service
docker service create --name web --publish 8080:5000 --network demo xiaopeng163/python-flask-demo:1.0

# 横向扩展一个scale
docker service scale web=2

# 更新image
docker service update --image xiaopeng163/python-flask-demo:2.0 web


```