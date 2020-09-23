## docker ci部署

准备工作：准备一台centos7主机

第一步，安装docker
```
curl -sSL https://get.docker.com/ | sh
```

第二步，安装docker-ci
```
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | sudo bash
sudo yum install gitlab-ci-multi-runner -y

# 检查gitlab-ci是否运行正常
gitlab-ci-multi-runner status
```

第三步 设置Docker权限

为了能让gitlab-runner能正确的执行docker命令，需要把gitlab-runner用户添加到docker group里, 然后重启docker和gitlab ci runner

```
usermod -aG docker gitlab-runner
sudo service docker restart
sudo gitlab-ci-multi-runner restart
```

## docker-ci 初始化
```
gitlab-ci-multi-runner register

[root@VM-0-2-centos ~]# gitlab-ci-multi-runner register
Running in system-mode.                            
                                                   
Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/):
http://git.shuachi.cn/
Please enter the gitlab-ci token for this runner:
MysU8h1hcazyX43ocCs_
Please enter the gitlab-ci description for this runner:
[VM-0-2-centos]: test_^H-
Please enter the gitlab-ci tags for this runner (comma separated):
test,demo
Whether to run untagged builds [true/false]:
[false]: 
Whether to lock Runner to current project [true/false]:
[false]: 
Registering runner... succeeded                     runner=MysU8h1h
Please enter the executor: docker-ssh, ssh, virtualbox, docker+machine, docker-ssh+machine, docker, shell, kubernetes, parallels:
shell
Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded! 

```



