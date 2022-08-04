package main

import "fmt"

func main() {
	n := handle(2)
	fmt.Println("n", n)
}

//实现方式一 递归

func handle(i int) int {
	if i <= 2 {
		return i
	}
	return handle(i-1) + handle(i-2)
}

//实现方式二 递归+缓存
func handle_two(i int) int {
	if i <= 2 {
		return i
	}

}
