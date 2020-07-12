# crontab 使用

1. 确认crontab是否安装：
```
执行 crontab 命令如果报 command not found，就表明没有安装
```
2. 安装 crontab
```
yum install -y vixie-cron
```
3. 确认是否安装成功:
```
crontab -l
```
4. 看是否设置了开机自动启动

```
systemctl list-unit-files | grep crond
```

5. 启动crontab

```
service crond start
```

6.添加计划任务
```
crontab -e

crontab -l
```
7.脚本sh设置755权限
```
chmod 755 ****.sh
```