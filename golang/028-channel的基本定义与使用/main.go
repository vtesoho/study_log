package main

import "fmt"

func main() {
	//定义一个chanel
	c := make(chan int)

	go func() {
		defer fmt.Println("goroutine结束")

		fmt.Println("goruntint 正在运行。。")

		c <- 666
	}()

	num := <-c //从c中接受数据 ，并赋值给num

	fmt.Println("num = ", num)

	fmt.Println("main goroutine结束")

}
