package main

import (
	"linklist/LinkedList"
)

func main() {
	// LinkedList.Lib2Test()

	linked := LinkedList.List{}

	linked.AddFirst("aa")
	linked.AddFirst("bb")
	linked.AddFirst("cc")
	linked.Addtail("dd")

	linked.GetSize()
	linked.ToString()

	linked.Add(2, "ee")

	linked.GetSize()
	linked.ToString()

	// fmt.Println("linked", )

}
