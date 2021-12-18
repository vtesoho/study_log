# 初探go的变量交换

初学go，使用 Go 的“多重赋值”特性可以两个变量交换即可写为，a,b = b,a。便想查看go编译器是如何实现的。

使用go tool compile -N -l -S main.go得到汇编代码：


0x000e 00014 (main.go:5) MOVQ $300, "".a+8(SP)
0x0017 00023 (main.go:6) MOVQ $500, "".b(SP)
0x001f 00031 (main.go:7) MOVQ "".a+8(SP), AX
0x0024 00036 (main.go:7) MOVQ AX, ""..autotmp_2+16(SP)
0x0029 00041 (main.go:7) MOVQ "".b(SP), AX
0x002d 00045 (main.go:7) MOVQ AX, "".a+8(SP)
0x0032 00050 (main.go:7) MOVQ ""..autotmp_2+16(SP), AX
0x0037 00055 (main.go:7) MOVQ AX, "".b(SP)
红色字为交换部分，通过使用临时变量来存储实现。

使用

c=a
a=b
b=c
代码手动第三个变量来实现交换的汇编代码为：
0x000e 00014 (main.go:5) MOVQ $300, "".a+16(SP)
0x0017 00023 (main.go:6) MOVQ $500, "".b+8(SP)
0x0020 00032 (main.go:7) MOVQ $0, "".c(SP)
0x0028 00040 (main.go:8) MOVQ "".a+16(SP), AX
0x002d 00045 (main.go:8) MOVQ AX, "".c(SP)
0x0031 00049 (main.go:9) MOVQ "".b+8(SP), AX
0x0036 00054 (main.go:9) MOVQ AX, "".a+16(SP)
0x003b 00059 (main.go:10) MOVQ "".c(SP), AX
0x003f 00063 (main.go:10) MOVQ AX, "".b+8(SP)

可以看出，使用a,b=b,a与手写交换在效率上是一致的，仅仅是方便一些。