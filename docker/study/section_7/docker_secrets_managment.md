## docker secrets managment

```
存在swarm manager节点raft database里
```

### 什么是secret?
```
用户名密码
ssh key
tls认证
任何不想让别人看到的数据
```

### 创建一个secret

第一种方式通过文件去创建
先创建一个password文件
```
vim password 
内容：test123
:wq

docker secret create my-pw password
```

第二种方式通过输入去创建
```
echo "testsecret" | docker secret create testsecret -
```

### 使用secret
```
在创建了secret之后，在创建service的时候，加上--secret [secret名]，这样会在容器内部的/run/secrets/目录下出现相应的密码文件。

例如创建mysql容器要设置密码的时候，就可以写上MYSQL_ROOT_PASSWORD_FILE=/run/secrets/[secret名]
```