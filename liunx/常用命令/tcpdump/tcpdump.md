# tcpdump

```
netstat -n | grep tcp | grep TIME_WAIT |wc -l

```


```
tcpdump -i eth0 -nnvvS host 218.200.46.134 -w /root/dump218.200.46.134.txt
tcpdump -i eth0 -nnvvS host 218.18.7.40 -w /root/dump218.18.7.40.txt
```