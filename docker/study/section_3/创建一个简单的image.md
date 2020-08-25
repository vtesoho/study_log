## 创建一个简单的image

先创建一个简单的hello.c文件，内容如下
```
#include<stdio.h>

int main()
{
        printf("hello docker\n");
}
```

编译hello.c文件
```
如果没有安装gcc、glibc-static先安装gcc、glibc-static
yum install gcc
yum install glibc-static

gcc -static hello.c -o hello
```

创建一个DockerFile 文件，内容如下
```
FROM scratch
ADD hello /
CMD ["/hello"]
```

运行DockerFile
```
docker build -t vteso/hello-world .
```


在docker运行image
```
docker run vteso/hello-world
```

