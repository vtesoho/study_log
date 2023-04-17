# supervisord安装


```
yum install -y supervisor

supervisord -c /etc/supervisord.conf

systemctl start supervisord

systemctl enable supervisord



yum install epel-release
yum install -y supervisor
systemctl enable supervisord # 开机自启动
systemctl start supervisord # 启动supervisord服务
systemctl status supervisord # 查看supervisord服务状态
ps -ef|grep supervisord # 查看是否存在supervisord进程

supervisorctl status 查看状态
```

## 配置文件
```
cd /etc/supervisord.d

[program:goSocketHttp]
directory=[运行目录]
command=[运行程序]
autostart=true    //
autorestart=false   //
stderr_logfile=/tmp/goSocketHttp_stderr.log   //错误日志
stdout_logfile=/tmp/goSocketHttp_stdout.log   //运行日志

```


## 参数详解
```
[program:automobile]

command=/root/miniconda3/bin/uwsgi --ini uwsgib.ini      ; 程序启动命令

directory=/root/xxxx/automobile

autostart=True      ; 在supervisord启动的时候也自动启动

startsecs=10        ; 启动10秒后没有异常退出，就表示进程正常启动了，默认为1秒

autorestart=true    ; 程序退出后自动重启,可选值：[unexpected,true,false]，默认为unexpected，表示进程意外杀死后才重启

startretries=3      ; 启动失败自动重试次数，默认是3

user=root          ; 用哪个用户启动进程，默认是root

priority=999        ; 进程启动优先级，默认999，值小的优先启动

redirect_stderr=true ; 把stderr重定向到stdout，默认false

stdout_logfile_maxbytes=20MB  ; stdout 日志文件大小，默认50MB

stdout_logfile_backups = 20  ; stdout 日志文件备份数，默认是10

; stdout 日志文件，需要注意当指定目录不存在时无法正常启动，所以需要手动创建目录（supervisord 会自动创建日志文件）

stdout_logfile=/root/yangdefeng/touna/automobile/logs/automobile.out

loglevel=debug        ;loglevel 指定了日志的级别，用 Python 的 print 语句输出的日志是不会被记录到日志文件中的，需要搭配 Python 的 logging 模块来输出有指定级别的日志。

stopasgroup=true    ;默认为false,进程被杀死时，是否向这个进程组发送stop信号，包括子进程

killasgroup=true    ;默认为false，向进程组发送kill信号，包括子进程

另一个文件，这次开两个一模一样的进程。

[program:daili]

command=/root/miniconda3/envs/py27/bin/python dailiip.py ; 程序启动命令

directory=/root/xxx/代理ip获取

numprocs=2                  ;默认为1，; 若 numprocs 不为1，process_name 的表达式中一定要包含 process_num 来区分不同的进程

process_name=%(program_name)s_%(process_num)02d

autostart=false      ; 在supervisord启动的时候也自动启动

startsecs=10        ; 启动10秒后没有异常退出，就表示进程正常启动了，默认为1秒

autorestart=true    ; 程序退出后自动重启,可选值：[unexpected,true,false]，默认为unexpected，表示进程意外杀死后才重启

startretries=3      ; 启动失败自动重试次数，默认是3

user=root          ; 用哪个用户启动进程，默认是root

priority=999        ; 进程启动优先级，默认999，值小的优先启动

redirect_stderr=true ; 把stderr重定向到stdout，默认false

stdout_logfile_maxbytes=20MB  ; stdout 日志文件大小，默认50MB

stdout_logfile_backups = 20  ; stdout 日志文件备份数，默认是10

; stdout 日志文件，需要注意当指定目录不存在时无法正常启动，所以需要手动创建目录（supervisord 会自动创建日志文件）

stdout_logfile=/root/yangdefeng/touna/代理ip获取/logs/daili.out

loglevel=debug        ;loglevel 指定了日志的级别，用 Python 的 print 语句输出的日志是不会被记录到日志文件中的，需要搭配 Python 的 logging 模块来输出有指定级别的日志。

stopasgroup=false    ;默认为false,进程被杀死时，是否向这个进程组发送stop信号，包括子进程

killasgroup=false    ;默认为false，向进程组发送kill信号，包括子进程

比如我分布式爬虫，先开两个一模一样的进程，当然可以在py中用multiprocessing弄出两个进程来，也可以把脚本运行两次不就是两个进程吗。

那么可以指定numprocs=2，nmprocess大于1的时候，一定要设置process_name=%(program_name)s_%(process_num)02d，后面的格式名字随便，总之要能分辨出来是两个嘛，不然supervisorctl start programe时候怎么知道启动什么进程。如果不设置程序名启动supervisord服务时候会报错的。

```