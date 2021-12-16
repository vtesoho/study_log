package main

import (
	"arrayList/ArrayList"
	"arrayList/StackArray"
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

func main6() {
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

func main7() {
	//定义接口对象，赋值的对象必须实现接口的所有方法
	list := ArrayList.NewArrayList()

	list.Append("a1")
	list.Append("b2")
	list.Append("c3")
	list.Append("d3")
	list.Append("e3")

	for it := list.Iterator(); it.HasNext(); {
		item, _ := it.Next()
		if item == "d3" {
			it.Remove()
		}
		fmt.Println(item)
	}
	fmt.Println(list)

	// fmt.Println(list)
}

func main8() {
	myStack := StackArray.NewStack()
	myStack.Push(1)
	myStack.Push(2)
	myStack.Push(3)
	myStack.Push(4)
	fmt.Println(myStack.Pop())
	fmt.Println(myStack.Pop())
	fmt.Println(myStack.Pop())
	fmt.Println(myStack.Pop())
	fmt.Println(myStack.Pop())
}
