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
func main3() {
	//定义接口对象，赋值的对象必须实现接口的所有方法
	list := ArrayList.NewArrayList()

	list.Append("a1")
	list.Append("b2")
	list.Append("c3")

	fmt.Println(list.TheSize)
}

func main5() {
	//定义接口对象，赋值的对象必须实现接口的所有方法
	list := ArrayList.NewArrayList()

	list.Append("a1")
	list.Append("b2")
	list.Append("c3")
	for i := 0; i < 4; i++ {
		list.Insert(1, "d5")
	}
	list.Delete(5)

	fmt.Println(list)
}

func main() {
	//定义接口对象，赋值的对象必须实现接口的所有方法
	list := ArrayList.NewArrayList()

	list.Append("a1")
	list.Append("b2")
	list.Append("c3")
	for i := 0; i < 15; i++ {
		list.Insert(1, "d5")
	}
	fmt.Println(list)
}
