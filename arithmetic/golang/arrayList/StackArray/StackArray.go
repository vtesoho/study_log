package StackArray

type StackArray interface {
	Clear()
	Size() int
	Pop() interface{}
	Push(data interface{})
	IsFull() bool
	IsEmpty() bool
}

type Stack struct {
	dataSource  []interface{}
	capsize     int //最大范围
	currentsize int //实际使用大小
}

func NewStack() *Stack {
	myStack := new(Stack)
	myStack.dataSource = make([]interface{}, 0, 10)
	myStack.capsize = 10
	myStack.currentsize = 0
	return myStack
}

func (myStack *Stack) Clear() {
	myStack.dataSource = make([]interface{}, 0, 10)
	myStack.capsize = 10
	myStack.currentsize = 0
}
func (myStack *Stack) Size() int {
	return myStack.currentsize
}
func (myStack *Stack) Pop() interface{} {
	if !myStack.IsEmpty() {
		last := myStack.dataSource[myStack.currentsize-1]
		myStack.dataSource = myStack.dataSource[:myStack.currentsize-1]
		myStack.currentsize--
		return last
	}
	return nil

}
func (myStack *Stack) Push(data interface{}) {
	if !myStack.IsFull() {
		myStack.dataSource = append(myStack.dataSource, data)
		myStack.currentsize++
	}
}
func (myStack *Stack) IsFull() bool {
	if myStack.currentsize >= myStack.capsize {
		return true
	} else {
		return false
	}
}
func (myStack *Stack) IsEmpty() bool {
	if myStack.currentsize == 0 {
		return true
	} else {
		return false
	}
}
