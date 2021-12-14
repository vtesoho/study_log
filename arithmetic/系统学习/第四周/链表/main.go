package main

import (
	"container/list"
)

func main() {
	// LinkedList.Lib2Test()

	// linked := LinkedList.List{}

	// linked.AddFirst("cc")
	// linked.AddFirst("bb")
	// linked.AddFirst("aa")
	// // linked.Addtail("dd")

	// // linked.GetSize()
	// // linked.ToString()

	// // linked.Add(2, "ee")

	// // linked.GetSize()
	// // linked.ToString()

	// // linked.Remove("bb")

	// // linked.GetSize()
	// // linked.ToString()

	// // linked.ReverseList()

	// // linked.GetSize()
	// // linked.ToString()

	// linka := LinkedList.Node{}

	// linkd := LinkedList.ListAdd(&linka, "aa")
	// linke := LinkedList.ListAdd(&linka, "dd")
	// linkc := LinkedList.ListAdd(&linka, "bb")

	// fmt.Println("linkc", linkc)
	// fmt.Println("linke", linke)
	// fmt.Println("linkd", linkd)
	// LinkedList.ListPrint(linkc)

	// fmt.Println("linked", )

	// linka := LinkedLista.Node{}

	// linka.ListAdd("bb")

	// linka.GetSize()
	// linka.ToString()

	mylist := list.New()
	mylist.PushBack("aa")
	mylist.PushBack("bb")
	mylist.PushBack("cc")
	// fmt.Println("mylist", mylist)
	// toString(mylist)

}
