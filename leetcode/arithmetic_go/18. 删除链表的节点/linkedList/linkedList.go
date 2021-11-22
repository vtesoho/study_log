package linkedList

type Object interface{}

type Node struct {
	Data Object
	Next *Node
}

type List struct {
	headNode *Node
}

func (this *List) IsEmpty() bool {
	if this.headNode == nil {
		return true
	} else {
		return false
	}
}

func (this *List) length() int {
	cur := this.headNode
	count := 0
	for cur != nil {
		count++
		cur = cur.Next
	}
	return count
}

func (this *List) Add(data Object) *Node {
	node := &Node{Data: data}
	node.Next = this.headNode
	this.headNode = node
	return node
}

// func (this *List) arrToListnode(arr []int) {
// 	if len(arr) < 0 {
// 		panic("arr is empty!")
// 	}

// 	for i := len(arr); i > len(arr); i-- {
// 		List.Add(arr[i])
// 	}

// }
