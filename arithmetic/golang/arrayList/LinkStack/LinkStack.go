package LinkStack

type Node struct {
	Data interface{}
	Next *Node
}

type LinkStack interface {
	IsEmpty() bool
	Push(data interface{})
	Pop() interface{}
	Length()
}

func (node *Node) Push(data interface{}) {
	newNode := Node{Data: data}
	newNode.Next = node
	node = &newNode
}
