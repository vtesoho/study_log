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