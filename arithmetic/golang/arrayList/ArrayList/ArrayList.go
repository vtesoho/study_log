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
