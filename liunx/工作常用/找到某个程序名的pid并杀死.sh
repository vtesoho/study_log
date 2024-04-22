#!/bin/bash

go build 

# 获取程序名
program_name="maintest"

# 查找PID
pid=$(ps aux | grep -v grep | grep $program_name | awk '{print $2}')

# 判断PID是否存在，如果不存在则退出
if [ -z $pid ]
then
    echo "Process not found."
    exit 1
fi

# 杀死进程
kill ps aux | grep $program_name | awk '{print $2}
kill $(ps aux | grep maintest | awk '{print $2}')

# 输出操作结果
if [ $? -eq 0 ]
then
    echo "Process successfully killed."
else
    echo "Error killing process."
fi