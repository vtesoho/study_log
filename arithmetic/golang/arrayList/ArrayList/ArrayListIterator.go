package ArrayList

import "errors"

type Iterator interface {
	HasNext() bool              //是否有下一个
	Next() (interface{}, error) //下一个
	Remove()                    //
	GetIndex() int              //得到索引
}

type Iterable interface {
	Iterator() Iterator //构造初始化接口
}

//构造指针访问数组
type ArrayListIterator struct {
	list         *ArrayList //数组指针
	currentindex int        //当前索引
}

func (list *ArrayList) Iterator() Iterator {
	it := new(ArrayListIterator)
	it.currentindex = 0
	it.list = list
	return it
}

func (it *ArrayListIterator) HasNext() bool {
	return it.currentindex < it.list.TheSize
}
func (it *ArrayListIterator) Next() (interface{}, error) {
	if !it.HasNext() {
		return nil, errors.New("没有下一个")
	}
	value, err := it.list.Get(it.currentindex)
	it.currentindex++
	return value, err
}
func (it *ArrayListIterator) Remove() {
	it.currentindex--
	it.list.Delete(it.currentindex)
}
func (it *ArrayListIterator) GetIndex() int {
	return it.currentindex
}
