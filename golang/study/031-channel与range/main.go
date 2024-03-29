package main

import "fmt"

func main() {
	c := make(chan int)

	go func() {
		for i := 0; i < 5; i++ {
			c <- i
		}

		//close可以关闭一个channel
		close(c)
	}()

	// for {
	// 	//ok如果为true表示channel没有关闭，如果为false表示channcel已经关闭
	// 	if data, ok := <-c; ok {
	// 		fmt.Println("data", data)
	// 	} else {
	// 		break
	// 	}
	// }

	//可以使用range 来迭代不断操作channel
	for data := range c {
		fmt.Println("data", data)
	}

	fmt.Println("main 结束")

}
