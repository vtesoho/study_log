1、安装killall命令
yum install -y psmisc

2、安装sz（下载）和rz（上传）命令
yum install -y lrzsz

3、 安装 ifconfig 命令
yum install -y net-tools.x86_64

4、 安装vim
yum install -y vim*

5、安装unzip命令
yum install -y unzip

6、安装netstat命令
yum install -y net-tools

7、安装lsof安装 是一个列出当前系统打开文件的工具
yum install -y lsof

8、安装ssh服务
yum install sshd

9、安装wget(迅雷)
yum install -y wget

10、安装vim编辑器
yum install -y vim

11、安装unzip命令
yum install -y unzip

12、pip命令是python里的命令，类似于linux系统里的yum命令
yum install -y python-pip

13、安装rpmbuild命令
yum install -y rpm-build

yum卸载命令
yum erase 安装包名称

yum删除命令
yum remove 安装包名称

yum离线下载安装包
1、离线下载vim编辑器及其所有依赖包
yum -y install vim --downloadonly --downloaddir ./

yum查询想安装的软件
1.使用YUM查找软件包
yum search

2.列出所有可安装的软件包
yum list

3.列出所有可更新的软件清单
yum check-update

4.列出所有已安装的软件包
yumlist installed

5.列出所有已安装但不在Yum Repository內的软件包
yumlist extras

6.获取所有软件包信息
yum info

7.列出软件包提供哪些文件
yum provides~

清除缓存命令
1、清除缓存目录下的软件包
yum clean packages

2、清除缓存目录下的 headers
yum clean headers

3、清除缓存目录下旧的 headers
yum clean oldheaders

4、清除缓存目录下的软件包及旧的headers
yum clean, yum clean all (= yum clean packages; yum clean oldheaders)

yum命令工具使用举例
yum update 更新所有软件命令

yum group list 查看系统中已经安装的和可用的软件组，可用的可以安装

yum grooup install 安装上一个命令显示的可用的软件组中的一个

yum grooup update 更新指定软件组的软件包

yum grooup remove 卸载指定软件组中的软件包

yum deplist 查询指定软件包的依赖关系

yum list yum* 列出所有以yum开头的软件包

yum local install 从硬盘安装rpm包并使用yum解决依赖

yum高级管理应用技巧
1.加快你的yum的速度.使用yum的扩展插件yum-fastestmirror，个人认为这个插件非常有效，速度真的是明显提高
yum -y install yum-fastestmirror

2.通过yum工具下载RPM源码包。前提是有安装yum-utils这个软件包.如果有安装的话
yum downloader --source RPM源码包
yum downloader --source vsftpd 没有源包的话,还要加入一个源

3.软件组安装有时我们安装完系统，管理有一类软件没有安装，比如用于开发的开发包,我们可以用软件包来安装

列出所有的软件包
yum group list

安装开发有关的包
yum group install "Development Libraries"
yum groupinstall "Development Tools"

安装中方支持的包
yum groupinstall "Chinese Support"

查看程序package依赖情况
yum deplist package

升级内核
yum install kernel-headers kernel-devel
```shell

yum install -y psmisc
yum install -y lrzsz
```