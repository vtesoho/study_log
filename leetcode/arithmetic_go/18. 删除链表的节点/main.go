package main

import (
	"arithmeticGo18/linkedList"
	"fmt"
)

func main() {
	// list := linkedList.List{}
	// list.Add("1")
	// fmt.Println(list.IsEmpty())
	// for i := 10; i > 0; i-- {
	// 	fmt.Println(i)
	// }
	arr := []string{"a", "b", "C", "D"}
	list, _ := arrTolinkList(arr)

	fmt.Println("list", list)

}

func arrTolinkList(arr []string) (linkedList.List, error) {
	if (len(arr)) <= 0 {
		panic("is arr empuy !")
	}
	list := linkedList.List{}
	for i := (len(arr) - 1); i > 0; i-- {
		list.Add(arr[i])
	}
	return list, nil
}
