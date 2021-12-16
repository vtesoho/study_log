package main

import (
	"arrayList/Queue"
	"fmt"
)

func main11() {
	myq := Queue.NewQueue()
	myq.EnQueue(1)
	myq.EnQueue(2)
	myq.EnQueue(3)
	myq.EnQueue(4)
	fmt.Println(myq.DeQueue())
	fmt.Println(myq.DeQueue())
	fmt.Println(myq.DeQueue())
	fmt.Println(myq.DeQueue())
	myq.EnQueue(5)
	fmt.Println(myq.DeQueue())
}
