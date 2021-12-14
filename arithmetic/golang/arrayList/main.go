package main

import (
	"arrayList/ArrayList"
	"fmt"
)

func main1() {
	list := ArrayList.NewArrayList()

	list.Append(1)
	list.Append(2)
	list.Append(3)

	fmt.Println(list)
}
func main2() {
	list := ArrayList.NewArrayList()

	list.Append("a1")
	list.Append("b2")
	list.Append("c3")

	fmt.Println(list.TheSize)
}
func main() {
	list := ArrayList.NewArrayList()

	list.Append("a1")
	list.Append("b2")
	list.Append("c3")

	fmt.Println(list.TheSize)
}
