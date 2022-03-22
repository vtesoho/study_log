package main

import (
	"fmt"
)

type Node struct {
	Data interface{}
	Next *Node
}

func NewLinkedList(data interface{}) *Node {
	node := new(Node)
	node.Data = data
	node.Next = nil
	return node
}

func (node *Node) AddFirst(data interface{}) *Node {
	newNode := &Node{Data: data}
	newNode.Next = node
	return newNode

}

func (node *Node) ListPrint() {
	for {
		ls := node.Data
		fmt.Println(ls)
		if node.Next != nil {
			node = node.Next
		} else {
			break
		}
	}
}
func (node *Node) ListPrinta() {
	for {
		ls := node.Data
		fmt.Println(ls)
		if node.Next != nil {
			node = node.Next
		} else {
			break
		}
	}
}

func (node *Node) reverserList() {
	pReversedHead := node

	var pNode = node.Next

	var pPrev *Node

	for pNode != nil {

		pNext := pNode.Next

		if pNext == nil {

			pReversedHead.Next = pNode

		}

		pNode.Next = pPrev

		pPrev = pNode

		pNode = pNext

	}
}

func main() {
	test := NewLinkedList("aa")
	test = test.AddFirst("bb")
	test = test.AddFirst("cc")
	test.reverserList()
	test.ListPrint()

}
