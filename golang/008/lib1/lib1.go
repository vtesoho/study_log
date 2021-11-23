package lib1

import "fmt"

//如果一个函数的首字母是大写，代码这个函数是对外访问的，如果是小写，代表这个方法仅供内部访问
func Lib1Test() {
	fmt.Println("lib1Test...")
}

func init() {
	fmt.Println("lib1 init() ....")
}
