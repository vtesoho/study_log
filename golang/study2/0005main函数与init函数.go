package main

import "fmt"

func init() {
	fmt.Println("init执行")
}
func init() {
	fmt.Println("init1执行")
}
func main() {
	fmt.Println("main执行")
}

/**
一个包只能有一个main函数

可以有多个init函数

多个init函数是从上往下顺序执行
*/
