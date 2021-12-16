package Queue

type MyQueue interface {
	Size() int
	Front() interface{}
	End() interface{}
	IsEmpty() bool
	EnQueue(data interface{})
	DeQueue() interface{}
	Clear()
}

type Queue struct {
	dataStore []interface{}
	theSize   int
}

func NewQueue() *Queue {
	queue := new(Queue)
	queue.dataStore = make([]interface{}, 0)
	queue.theSize = 0
	return queue

}

func (myq *Queue) Size() int {
	return myq.theSize

}
func (myq *Queue) Front() interface{} {
	if myq.Size() == 0 {
		return nil
	}
	return myq.dataStore[0]
}
func (myq *Queue) End() interface{} {

	if myq.Size() == 0 {
		return nil
	}
	return myq.dataStore[myq.Size()-1]
}
func (myq *Queue) IsEmpty() bool {
	return myq.theSize == 0
}
func (myq *Queue) EnQueue(data interface{}) {
	myq.dataStore = append(myq.dataStore, data)
	myq.theSize++
}
func (myq *Queue) DeQueue() interface{} {
	if myq.theSize == 0 {
		return nil
	}
	data := myq.dataStore[0]
	if myq.Size() > 1 {
		myq.dataStore = myq.dataStore[1:myq.Size()]
	} else {
		myq.dataStore = make([]interface{}, 0)
	}
	myq.theSize--
	return data
}
func (myq *Queue) Clear() {
	myq.dataStore = make([]interface{}, 0)
	myq.theSize = 0
}
