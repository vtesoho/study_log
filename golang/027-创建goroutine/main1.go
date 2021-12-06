package main

import (
	"fmt"
	"time"
)

func main() {

	//用go创建承载一个形参为空，返回值为空的一个函数
	// go func() {
	// 	defer fmt.Println("a.defer")

	// 	func() {
	// 		defer fmt.Println("b.defer")

	// 		runtime.Goexit()
	// 		fmt.Println("B")
	// 	}()

	// 	fmt.Println("A")
	// }()

	go func(a int, b int) bool {
		fmt.Println("a", a, "b", b)
		return true
	}(10, 20)

	for {
		time.Sleep(1 * time.Second)
	}
}
