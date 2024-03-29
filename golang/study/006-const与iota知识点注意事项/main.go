package main

import "fmt"

//iota只能出现在const中

const (
	//可以在const()添加一个关键字iota,每行的iota都会累加1，第一行的iota的默认值是0
	BEIJING = 10 * iota
	SHANGHAI
	SHENZHI
)

const (
	a, b = iota + 1, iota + 2 //iota = 0  a = 1 b = 2
	c, d                      //iota = 1  c = 2 d = 3
	e, f                      //iota = 2  e = 3 f = 4

	g, h = iota * 2, iota * 3 //iota = 3  g = iota * 2 h = iota * 3  g = 6  h = 9
	i, j                      //iota = 4  i = 4*2 = 8  j = 4*3 = 12
)

func main() {
	//常量 (只读属性)
	const length int = 10

	// length = 100   //常量是不允许修改的

	fmt.Println("BEJING=", BEIJING)
	fmt.Println("SHANGHAI=", SHANGHAI)
	fmt.Println("SHENZHI=", SHENZHI)
}
