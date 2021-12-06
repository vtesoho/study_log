package main

/*
当channel已满，再向里面写数据，就会阻塞
当channel为空，从里面取数据也会阻塞
*/

import (
	"fmt"
	"time"
)

func main() {
	c := make(chan int, 3) //带有缓冲的channel

	fmt.Println("len(c) = ", len(c), ",cap(c)=", cap(c))

	go func() {
		defer fmt.Println("子go结束")

		for i := 0; i < 4; i++ {
			c <- i
			fmt.Println("子go ,i", i, "len(c) = ", len(c), ",cap(c)=", cap(c))
		}
	}()
	time.Sleep(2 * time.Second)

	for i := 0; i < 4; i++ {
		num := <-c
		fmt.Println("主go num", num)
	}

	time.Sleep(1 * time.Second)

	fmt.Println("main结束")
}
