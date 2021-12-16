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
