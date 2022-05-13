// package main

// import "fmt"
// //defer 是栈的形式
// func main() {
// 	defer fmt.Println(("main end1"))
// 	defer fmt.Println(("main end2"))
// 	fmt.Println("main:hello go 1")
// 	fmt.Println("main:hello go 2")

// 	/**
// 	main:hello go 1
// 	main:hello go 2
// 	main end2
// 	main end1
// 	*/
// }

//知识点1  压栈
// package main

// import "fmt"

// func fun1() {
// 	fmt.Println("A")
// }
// func fun2() {
// 	fmt.Println("B")
// }
// func fun3() {
// 	fmt.Println("C")
// }

// func main() {
// 	defer fun1()
// 	defer fun2()
// 	defer fun3()
// }

//知识点2  defer和return谁先谁后
/**
returnFunc
deferFunc
*/
package main

import "fmt"

func deferFunc() int {
	fmt.Println("deferFunc")
	return 0
}
func returnFunc() int {
	fmt.Println("returnFunc")
	return 0
}

func returnAndDefer() int {
	defer deferFunc()
	return returnFunc()

}

func main() {
	returnAndDefer()
}
