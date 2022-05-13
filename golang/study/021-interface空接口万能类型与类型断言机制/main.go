package main

import "fmt"

/**
interface{}  万能类型
*/

func myFunc(arg interface{}) {
	fmt.Println("myFunc")
	fmt.Println(arg)

	//interface如何区分此时引用的底层数据类型到底是什么？

	//给 interface{}提供类型断言的机制

	value, ok := arg.(string)
	if !ok {
		fmt.Println("arg is not string type")
	} else {
		fmt.Println("arg is string type", value)

		fmt.Printf("arg is string type %T \n", value)

	}
}

type Book struct {
	auth string
}

func main() {
	book := Book{"go"}

	myFunc(book)
	myFunc(100)
	myFunc("aaaaaaa")
	myFunc(3.14)

}
