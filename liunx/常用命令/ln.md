## ln

一定要用绝对路径

```bash
###bash###
#为/root/linuxidc.jpg生成软链接
ln -s /root/linuxidc.jpg /tmp/linuxidc.jpg

#为/root/dir目录生成软链接
ln -s /root/dir /linuxidc/dir1

#为/root/linuxidc.jpg生成硬链接
ln /root/linuxidc.jpg /tmp/linuxidc.jpg
```