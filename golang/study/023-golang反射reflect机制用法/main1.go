package main

import (
	"fmt"
	"reflect"
)

type User struct {
	Id   int
	Name string
	Age  int
}

func (this User) Call() {
	fmt.Println("call", this)
}

func main() {
	user := User{1, "aaa", 18}

	DoFiledAndMethod(user)
}

func DoFiledAndMethod(input interface{}) {
	//获取input的type
	inputType := reflect.TypeOf(input)
	fmt.Println("inputType", inputType.Name())

	//获取input的value
	inputValue := reflect.ValueOf(input)
	fmt.Println("inputValue", inputValue)

	//通过type获取里面的字段
	/*
		1. 获取interfacer的reflect.Type,通过type得到NumField,进行遍历
		2. 得到每个field,数据 类型
		3. 通过filed有一个Interface()方法得到对应的value
	*/

	for i := 0; i < inputType.NumField(); i++ {
		field := inputType.Field(i)
		value := inputValue.Field(i).Interface()

		fmt.Println("field:", field, " value:", value)
	}

	//通过type获取里面的方法调用
	for i := 0; i < inputType.NumMethod(); i++ {
		m := inputType.Method(i)
		fmt.Printf("%s %v \n", m.Name, m.Type)
	}

}
