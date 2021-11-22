package main

import "fmt"

//var 可以用于全局变量
var gA = 100

//:=只能用在函数体内来声明

func main() {
	//方法一：声明一个变量，默认值是0
	var a int
	fmt.Println("a=", a)
	fmt.Printf("type of a %T\n", a)

	//方法二：声明一个变量，初始经一个值
	var b int = 100
	fmt.Println("b=", b)
	fmt.Printf("type of b %T\n", b)

	//方法三：在初始化的时候，可以省去数据类型，通过值自动匹配当前变量的数据类型
	var c = 100
	fmt.Println("c=", c)
	fmt.Printf("type of c %T\n", c)

	//方法四，省去var关键字，直接自动匹配
	e := 100
	fmt.Printf("type of e %T\n", e)

	//声明多个变量

	var xx, yy int = 100, 200
	fmt.Println(xx, yy)

	var kk, ll = 100, "100"
	fmt.Println(kk, ll)

	// 多行的多变量声明
	var (
		vv int  = 100
		jj bool = true
	)
	fmt.Println(vv, jj)

}
