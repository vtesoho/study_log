package main

import (
	_ "008/lib1" //使用匿名方式调用，在不使用的情况下，可以通过编译
	. "008/lib2" //相当于是把lib2里面所有的包都导入进来了，可以直接使用,最好不使用这种方式
)

func main() {
	// lib1.Lib1Test()
	// lib2.Lib2Test()
	Lib2Test()
}
