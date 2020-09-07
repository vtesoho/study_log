## docker swarm

```
设置一台swarm-manager
[192.168.205.10]就是为manager
docker swarm init --advertise-addr=192.168.205.10
```

运行后会返回如下参数
```

Swarm initialized: current node (ik798eyujn6ebfzjvb0lzgpo0) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join \
    --token SWMTKN-1-38s9r6tg1ogao7k939e0t8v8ab6a79r05nz7vonh5codtb6zba-9h1twokzlpe9cedorrjr3y8rc \
    172.17.0.2:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.

```

然后进入其它docker结点去运行上面返回的命令
```
docker swarm join \
--token SWMTKN-1-38s9r6tg1ogao7k939e0t8v8ab6a79r05nz7vonh5codtb6zba-9h1twokzlpe9cedorrjr3y8rc \
172.17.0.2:2377
```

查看当前swarm信息使用
```
docker node ls
```




## Routing Mesh的两种体现
```
Internal -- container和container 之间的访问通过overlay网络（通过vip虚拟ip）

Ingress -- 如果服务有绑定接口，则此服务可以通过什么任意swarm节点相应接口访问
```