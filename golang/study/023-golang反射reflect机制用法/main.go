package main

import (
	"fmt"
	"reflect"
)

func reflectNum(arg interface{}) {
	fmt.Println("reflect.TypeOf(arg)", reflect.TypeOf(arg))
	fmt.Println("reflect.ValueOf(arg)", reflect.ValueOf(arg))
}

func main() {
	var num float64 = 1.2345

	reflectNum(num)
}
