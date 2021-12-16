package LinkedList

import "fmt"

type LinkedList interface {
	Add(index int, data interface{})
	IsEmpty() bool
	GetSize() int
	AddFirst()
	Addtail()
	Remove()
	RemoveIndex(index int)
	CheckIndex(data interface{}) bool
}

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
