# wkhtmltox安装

第一步

官网下载rpm包

```
wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox-0.12.6-1.centos7.x86_64.rpm
```

第二步
安装依赖
```
yum install xorg-x11-fonts-Type1 
yum install xorg-x11-fonts-75dpi

```

第三步
安装wkhtmltox
```
rpm -ivh wkhtmltox-0.12.6-1.centos7.x86_64.rpm
```

第四步
检测是否安装成功
```
wkhtmltopdf -V
wkhtmltopdf 0.12.6 (with patched qt)
```



