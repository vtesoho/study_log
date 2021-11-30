package main

import "fmt"

//变量是包含  type  和value  称之为pair

//type 又是在staic type 和concrete type二个类型二选一
func main() {
	var a string

	//pair<static type:string, value:"aaa">
	a = "aaa"

	//pair<type:string,value:"aaa">
	var allType interface{}
	allType = a

	str, _ := allType.(string)
	fmt.Println(str)
}
