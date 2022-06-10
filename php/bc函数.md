# bc函数

所有函数得到的都是去尾法的结果

## bcscale

设置所有bc数学函数的默认小数点保留位数


## bcadd
2个任意精度数字的加法计算
```
bcadd (left_operand,right_operand, $scale = null)

echo bcadd (1.2,1.9); #结果3  相加结果3.1，去尾法得3
echo bcadd (1.2,1.7); #结果2   相加结果2.9，去尾法得3
echo bcadd (1.219,1.919,2); #结果3.13，3.138，去掉最后一个，再保留2位小数
echo bcadd (1.299,1.709,2); #结果3.00 ，3.008 去掉最后一个，再保留2位小数

```

## bcsub
 2个任意精度数字的减法
```
第一个参数减去第二个参数
echo bcsub (4,2,2); #2.00 4-2得出结果再保留2位小数
```

## bcmul
2个任意精度数字乘法计算
```
 echo bcmul     (1.219,1.210,3); #1.474
echo bcmul    (1.219,1.210,2); #1.47
echo bcmul    (1.219,1.210,1); #1.4
```

## bcdiv
2个任意精度的数字除法计算
```
bcdiv   (1.219,1.210,3); #1.007
```

## bcpow
任意精度数字的乘方
```
bcpow（） 第二个参数必须是整数，允许负整数，不能为小数
pow()第二个参数就允许小数
```

## bcpowmod
将任意精度数字提高到另一个精度，并将其降低到指定的模量
```
string bcpowmod ( string x, string y, string modulus [, int scale] )

bcpowmod($x, $y, $mod);
#等价于
bcmod(bcpow($x, $y), $mod);
```

## bcmod
对一个任意精度数字取模
```

bcmod    (1.219,1.210); #0，取模
bcmod    (1.219,1.210); #0，取模
bcmod    (1219,1210); #9，取模
```


## bcsqrt
任意精度数字的二次方根
```
只有两个参数，被开方数与保留小数点位数
echo bcsqrt       (4,2); #2
echo bcsqrt     (5,2);#2.23
```
## bccomp

比较两个任意精度的数字
```
bccomp (left_operand,right_operand, $scale = null)
如果两个数相等返回0, 左边的数left_operand比较右边的数right_operand大返回1, 否则返回-1.

echo bccomp  (1.219,1.210,3); #输出1 设置了3位小数，就全部对比，1.219>1.210
echo bccomp  (1.219,1.210,2); #输出0 设置了3位小数，去尾法以后再对比，1.21=1.21，所以返回0
```
