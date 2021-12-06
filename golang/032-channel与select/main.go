package main

import "fmt"

func fib(c, quit chan int) {
	x, y := 1, 1

	for {
		select {

		case c <- x:
			//如果成功向c管道写入数据，则执行case里面的代码
			x = y
			y = x + y

		case <-quit:
			//如果quit管理成功读取到数据 ，则执行case里面的代码
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)

	go func() {
		for i := 0; i < 6; i++ {
			fmt.Println(<-c)
		}

		quit <- 0
	}()

	fib(c, quit)
}
