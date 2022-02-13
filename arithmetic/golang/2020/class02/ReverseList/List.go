package List

import "fmt"

type Node struct {
	Data interface{}
	Next *Node
}

func NewLinkedList() *Node {
	node := new(Node)
	node.Data = nil
	node.Next = nil
	return node
}

func (node *Node) AddFirst(data interface{}) {
	fmt.Println("node", node)
	newNode := &Node{Data: data}
	newNode.Next = node
}
