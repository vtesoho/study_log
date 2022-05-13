package main

import "fmt"

type Reader interface {
	ReadBook()
}

type Writer interface {
	WriterBook()
}

type Book struct {
}

func (this *Book) ReadBook() {
	fmt.Print("ReadBook")
}
func (this *Book) WriterBook() {
	fmt.Print("WriterBook")
}

func main() {
	//pair<type:Book ,value:book{}地址>
	b := &Book{}

	//pair<type: ,value:>
	var r Reader
	//pair<type:Book ,value:book{}地址>
	r = b

	r.ReadBook()

	var w Writer

	//此处断言炒什么会成功？因为w r具体的type是一致的
	w = r.(Writer)

	w.WriterBook()

}
