package main

import (
	"LinkedList/LinkedList"
	"fmt"
)

func main() {
	link := LinkedList.NewLinkedList()
	link.AddFirst("aa")
	link.AddFirst("bb")
	fmt.Println(link)

}
