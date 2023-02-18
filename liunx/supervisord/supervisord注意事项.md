# supervisord注意事项

记一次supervisord正式环境运行故事

supervisord启动程序后，不会根据ulimit设置的打开文件数为限制，会默认以1024来限制

线上环境用supervisord保活后，遇到accept tcp [::]:42351: accept4: too many open files; retrying，问题，打开文件数过多，通过cat /proc/{pid}/limits命令发现进程始终是1024，不管系统如何设置ulimit -n 999999都对supervisord起不了任何作用，查看文档，需要修改supervisord.sevrice配置文件，在service增加LimitNOFILE=65535，重启supervisord。

重启后使用cat /proc/{pid}/limits查看，发现Max open files已经成设置的值，问题解决。


