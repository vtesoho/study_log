## git 新建分支 and 绑定远程分支

新建并切换分支
```
git checkout -b newbranch
```

提交到远程
```
git push origin newbranch
```

绑定远程分支
```
git branch --set-upstream-to=origin/newbranch
```

成功
```
git pull
```


本地目录直接绑定git

```
git init
git remote add origin <git地址>

```
如果是在之前的项目中修改地址，要先删除
```
git remote rm origin
```


## 设置用户名和邮箱
```
git config --global user.name "vteso"

git config --global user.email "vtesoho@163.com"
```


## 生成密钥

