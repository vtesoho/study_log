根据进程名找到pid并动态更改最大连接数

prlimit --pid "$(ps aux | grep -v grep | grep blackSms'"${1}"' | awk '\''{print $2}'\'')" --nofile=65535:65535