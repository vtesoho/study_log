# 04shell变量详解

## 一、变量介绍

在编程中，我们总有一些数据需要临时存放在内存，以待后续使用时快速读出。先了解一下计算机的存储单位吧。
```
计算机的单位:
1B=8bit

1KB=1024B
1MB=1024KB
1GB=1024MB
1TB=1024GB
1PB=1024TB
1EB=1024PB
1ZB=1024EB
...
好了，已经够大了！当然还有YB、BB更大的单位，同样进制也是1024.

1G=1024*1024*1024=1073741824B
```

假如你将一个1B的字符存入内存，如何读出呢？有没有一种大海捞针的感觉啊！我们讨论一下计算机是如何通过让我们人类快速将数据存在内存，如何从内存中读出数据的。我们研究过变量后就明白了。

变量：变量是编程中最常用的一种临时在内存中存取数据的一种方式。

变量存取原理

```
关于内存的说明
a、系统启动    内存被按照1B一个单位划分成N块     并且以十六进制为每一个空间编号

b、内存跟踪表记录  使用和未使用的内存的地址编号

c、内存申请    系统从未使用的内存中拿出一个或者一段连续空间  给你使用   同时在内存跟踪表中记录
该地址被占用不在分给别人，同时在系统中建立映射机制   
比如:变量名 STRING1=‘ABC’

name<==>0x5

d、释放内存
从内存跟踪表中将记录删除，下次存数据直接覆盖



CHAR1(0x3)=A
从图片可以看出，当我们在脚本中定义变量存值的时候，可以从以下方面看到变化：
a、内存占用：如果存的是一个字符则占用1个字节，如果存的是字符串则是字符串的长度加1个字节长度(\0是一个
特殊字符，代表字符串结束)。

b、变量名与内存空间关系：计算机中会将对应的内存空间地址和变量名称绑定在一起，此时代表这段内存空间已经被
程序占用，其他程序不可复用；然后将变量名对应的值存在对应内存地址的空间里。
```


## 二、变量定义

2.1、什么时候需要定义变量？

如果某个内容需要多次使用，并且在代码中重复出现，那么可以用变量代表该内容。这样在修改内容的时候，仅仅需要修改变量的值。

在代码运作的过程中，可能会把某些命令的执行结果保存起来，后续代码需要使用这些结果，就可以直接使用这个变量。

2.2、定义一个变量

变量格式： 变量名=值

在shell编程中的变量名和等号之间不能有空格。
```
变量名命名规则：
    命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
    中间不能有空格，可以使用下划线（_）。
    不能使用标点符号。
    不能使用bash里的关键字（可用help命令查看保留关键字）。

定义变量举例：
VAR1=1
age=18 整形
name=‘baism’ 字符串
score=88.8 浮点


注意：字符串要用单引号或双引号引起来
建议变量名为大写，和命令区分
			_name

```


```
变量赋值，此种方法设置为本地变量
[root@zutuanxue ~]# name="baism"
[root@zutuanxue ~]# school='ayitula'
[root@zutuanxue ~]# age=30
[root@zutuanxue ~]# score=88.8
```


2.3、取消变量 unset

```
取消当前环境中的变量，如果是变量设置是保存在文件中，下次重启又会恢复
[root@zutuanxue ~]# unset name
[root@zutuanxue ~]# echo $name
```


2.4、 有类型变量 declare

-i 将变量看成整数
-r 使变量只读 readonly,该变量的值无法改变，并且不能为unset
-x 标记变量通过环境导出 export
-a 指定为索引数组（普通数组）；查看普通数组
-A 指定为关联数组；查看关联数组

```
[root@zutuanxue ~]# declare -i num='asa'
[root@zutuanxue ~]# echo $num
0
[root@zutuanxue ~]# num=100
[root@zutuanxue ~]# echo $num
100
[root@zutuanxue ~]# declare -r num
[root@zutuanxue ~]# echo $num
100
[root@zutuanxue~]# num=200
-bash: num: 只读变量

[root@zutuanxue ~]# declare -x
declare -x HISTCONTROL="ignoredups"
declare -x HISTSIZE="1000"
declare -x HOME="/root"
declare -x HOSTNAME="Bai_Shuming"
declare -x LANG="zh_CN.UTF-8"
declare -x LESSOPEN="||/usr/bin/lesspipe.sh %s"

```