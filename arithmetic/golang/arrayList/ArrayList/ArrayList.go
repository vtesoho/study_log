package ArrayList

import (
	"errors"
	"fmt"
)

//接口
//定义一个类的接口
type List interface {
	Size() int
	Get(index int) (interface{}, error)
	Set(index int, newval interface{}) error
	Insert(index int, newval interface{}) error
	Append(newval interface{})
	Clear()                 //清空
	Delete(index int) error //删除
	String() string
	Iterator() Iterator
}

//数据结构
//小写是私有，大写是公有
type ArrayList struct {
	dataStore []interface{}
	TheSize   int //数组的大小
}

func NewArrayList() *ArrayList {
	list := new(ArrayList) //初始化结构体
	list.dataStore = make([]interface{}, 0, 10)
	list.TheSize = 0
	return list
}

func (list *ArrayList) Size() int {
	return list.TheSize
}

func (list *ArrayList) Get(index int) (interface{}, error) {
	if index < 0 || index > list.TheSize {
		return nil, errors.New("索引越界")
	}
	return list.dataStore[index], nil
}

func (list *ArrayList) Append(newval interface{}) {
	list.dataStore = append(list.dataStore, newval)
	list.TheSize++
}

func (list *ArrayList) String() string {
	return fmt.Sprint(list.dataStore)

}

func (list *ArrayList) Set(index int, newval interface{}) error {
	if index < 0 || index > list.TheSize {
		return errors.New("索引越界")
	}
	list.dataStore[index] = newval
	return nil
}

func (list *ArrayList) checkisFull() {
	if list.TheSize == cap(list.dataStore) { //判断内存使用情况
		fmt.Println("list.dataStore", list.dataStore)
		newDataStore := make([]interface{}, 2*list.TheSize, 2*list.TheSize) //开辟双倍内存
		copy(newDataStore, list.dataStore)                                  //拷贝，如果类型是interface，用copy是不复制不了的
		// for i := 0; i < list.TheSize; i++ {
		// 	newDataStore[i] = list.dataStore[i]
		// }

		list.dataStore = newDataStore
		fmt.Println("list.dataStore", list.dataStore)
		fmt.Println("newDataStore", newDataStore)
	}
}
func (list *ArrayList) Insert(index int, newval interface{}) error {
	if index < 0 || index > list.TheSize {
		return errors.New("索引越界")
	}
	list.checkisFull()                               //检测内存，如果满了，自动追加
	list.dataStore = list.dataStore[:list.TheSize+1] //插入数据，内存移动一位
	for i := list.TheSize; i > index; i-- {
		list.dataStore[i] = list.dataStore[i-1]
	}
	list.dataStore[index] = newval
	list.TheSize++
	return nil
}
func (list *ArrayList) Clear() {
	list.dataStore = make([]interface{}, 0, 10)
	list.TheSize = 0
}
func (list *ArrayList) Delete(index int) error {
	list.dataStore = append(list.dataStore[:index], list.dataStore[index+1:]...)
	list.TheSize--

	return nil
}
