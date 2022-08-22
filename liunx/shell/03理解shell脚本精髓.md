# shell 语法

* 如何抒写一个shell脚本
* shell脚本运行
* shell中的特殊符号
* 管道
* 重定向
* shell中数学运算
* 脚本退出


shell脚本就是将完成一个任务的所有命令执照执行的先后顺序，自上而上写入到一个文件中，然后给予执行权限 。

### 如何抒写一个shell脚本



### 如何运行一个脚本
脚本执行需要执行权限，当我们给一个文件赋予执行权限后，该脚本就可以运行
```
chmod u+x filename
```
如果不希望赋予脚本执行权限，那么可以使用bash命令来运行未给执行权限的脚本
```
bash filename
```







### shell中的一些特殊符号


有基础的同学不要和正则表达式中的符号含义搞混淆了。    
    !:                执行历史命令   !! 执行上一条命令
    $:                变量中取内容符
    + - * / %:        对应数学运算  加 减 乘 除 取余数  
    &:                后台执行
    ;：               分号可以在shell中一行执行多个命令，命令之间用分号分割    
    \:                转义字符
    ``:               反引号 命令中执行命令    echo "today is `date +%F`"
    ' ':              单引号，脚本中字符串要用单引号引起来，但是不同于双引号的是，单引号不解释变量
    " ":              双引号，脚本中出现的字符串可以用双引号引起来

通配符    
    ~:                家目录    # cd ~ 代表进入用户家目录
    *:                星号是shell中的通配符  匹配所有
    ?:                问号是shell中的通配符  匹配除回车以外的一个字符
    [list]: 匹配[list]中的任意单个字符
[!list]: 匹配除list中的任意单个字符
{string1,string2,...}： 匹配string1,string2或更多字符串


重定向
>      覆盖输入 
>> 追加输入
< 输出
<< 追加输出

管道命令
|：               管道符 上一个命令的输出作为下一个命令的输入   cat filename | grep "abc"








我们重点回顾以下几类命令

数据检索命令

    行检索：grep  egrep

    字符串检索:cut  tr

数据处理命令       

    数据排序：sort

    数据去重: uniq

    文本数据合并: paste

    数据输出: tee

    数据处理: xargs    


```
脚本命令演示
创建一个用户：harry     useradd harry
密码设置为:yunwei.98989 echo "yunwei.98989"|passwd --stdin harry
该用户创建文件夹/tmp/zutuanxue   mkdir /tmp/zutuanxue
该用户创建文件/tmp/zutuanxue/README  touch /tmp/zutuanxue/README
将“hello world“输入到/tmp/zutuanxue/README  echo 'hello world' &gt; /tmp/zutuanxue/README

实现代码 01_task.sh
#!/bin/bash

#DESC: this is a test script 
#AUTHOR: Bai Shuming
#RELEASE: 1.0

#main 

#创建用户harry
useradd harry

#设置用户密码 yunwei.98989
echo "yunwei.98989"|passwd --stdin harry


#使用harry创建文件夹，文件，输入文件中内容
su - harry -c "mkdir /tmp/zutuanxue"
su - harry -c "touch /tmp/zutuanxue/README"
su - harry -c "echo 'hello world' &gt; /tmp/zutuanxue/README"

```


### 什么时候用到脚本？

重复化、复杂化的工作，通过把工作的命令写成脚本，以后仅仅需要执行脚本就能完成这些工作。

1. 自动化分析处理
2. 自动化备份
3. 自动化批量部署安装


### 如何学习shell脚本？

尽可能记忆更多的命令

掌握脚本的标准的格式（指定魔法字节、使用标准的执行方式运行脚本）


### 学习脚本的秘诀：

多看（看懂）——>多模仿（多练）——>多思考


### shell脚本语法

```

1、#!/bin/bash
//脚本第一行， #！魔法字符，指定脚本代码执行的程序。即它告诉系统这个脚本需要什么解释器来执行，也就是使用
哪一种Shell

2、#代表注释，#！特例 

3、//以下内容是对脚本的基本信息的描述,大家可以根据实际情况尽可能的写详细一些，方便后续使用者
# Name: 脚本名字
# Desc:描述describe
# Path:存放路径
# Usage:用法
# Update:更新时间
# Author:作者
# Release: 分发版本

//下面就是脚本的具体内容
commands
...

```

脚本执行的方法
* 脚本标准插方法（建议）：
```
[root@zutuanxue shell01]# cat 1.sh 
#!/bin/bash
#xxxx
#xxx
#xxx
hostname
date
[root@zutuanxue shell01]# chmod +x 1.sh 
[root@zutuanxue shell01]# ll
total 4
-rwxr-xr-x 1 root root 42 Jul 22 14:40 1.sh
[root@zutuanxueshell01]# /shell/shell01/1.sh 
zutuanxue
Sun Jul 22 14:41:00 CST 2018
[root@zutuanxue shell01]# ./1.sh 
zutuanxue
Sun Jul 22 14:41:30 CST 2018

```

* 非脚本标准插方法（建议）：
```
[root@zutuanxue shell01]# bash 1.sh 
zutuanxue
Sun Jul 22 14:42:51 CST 2018
[root@zutuanxue shell01]# sh 1.sh
zutuanxue
Sun Jul 22 14:43:01 CST 2018
[root@zutuanxue shell01]# 
[root@zutuanxue shell01]# bash -x 1.sh
+ hostname
zutuanxue
+ date
Sun Jul 22 14:43:20 CST 2018

-x:一般用于排错，查看脚本的执行过程
-n:用来查看脚本的语法是否有问题

注意：如果脚本没有加可执行权限，不能使用标准的执行方法执行，bash 1.sh

其他：
[root@zutuanxueshell01]# source 2.sh
server
Thu Nov 22 15:45:50 CST 2018
[root@zutuanxue shell01]# . 2.sh
server
Thu Nov 22 15:46:07 CST 2018

source 和 . 表示读取文件，执行文件里的命令

```


