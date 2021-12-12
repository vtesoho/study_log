package LinkedList

import "fmt"

type Object interface{}

type Node struct {
	Data Object
	Next *Node
}

type List struct {
	headNode *Node
}

func (current *List) ToString() {
	cur := current.headNode
	fmt.Print(cur.Data, "->")
	for cur.Next != nil {
		cur = cur.Next
		fmt.Print(cur.Data, "->")
	}
	fmt.Println("nil")
	// return ""
}

//判断是否为空
func (current *List) IsEmpty() bool {
	if current.headNode == nil {
		return true
	} else {
		return false
	}
}

//获取链表长度
func (current *List) GetSize() int {
	//获取链表头结点
	cur := current.headNode
	//定义一个计数器，初始值为0
	count := 0

	for cur != nil {
		//如果头节点不为空，则count++
		count++
		//对地址进行逐个位移
		cur = cur.Next
	}
	fmt.Println("count", count)
	return count
}

//从链表头部添加元素
func (current *List) AddFirst(data Object) *Node {
	node := &Node{Data: data}
	node.Next = current.headNode
	current.headNode = node
	return node
}

//从链表尾部添加元素
func (current *List) Addtail(data Object) {
	node := &Node{Data: data}
	if current.IsEmpty() {
		current.headNode = node
	} else {
		tailNode := current.headNode
		for tailNode.Next != nil {
			tailNode = tailNode.Next
		}
		tailNode.Next = node
	}
}

//在链表指定位置添加元素
func (current *List) Add(index int, data Object) {
	if index == 0 {
		current.AddFirst(data)
	} else if index > current.GetSize() {
		current.Addtail(data)
	} else {
		preNode := current.headNode
		count := 0
		for count < (index - 1) {
			preNode = preNode.Next
			count++
		}
		node := &Node{Data: data}
		node.Next = preNode.Next
		preNode.Next = node
	}
}

//删除指定元素
func (current *List) Remove(data Object) {
	preNode := current.headNode
	if preNode.Data == data {
		current.headNode = preNode.Next
	} else {
		for preNode.Next != nil {
			if preNode.Next.Data == data {
				preNode.Next = preNode.Next.Next
			} else {
				preNode = preNode.Next
			}
		}
	}
}

//删除指定位置元素

//查看是否包含某个元素

//遍历所有元素

//翻转链表
func (current *Node) reverseList() *Node {
	var pre *Node
	cur := current
	for cur != nil {
		next := cur.Next
		cur.Next = pre
		pre = cur
		cur = next

	}
	return pre

}
