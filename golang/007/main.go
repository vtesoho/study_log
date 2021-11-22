package main

import "fmt"

func fun1(a string, b int) int {
	fmt.Println("a", a)
	fmt.Println("b", b)

	c := 100

	return c
}

//多返回值，匿名的
func fun2(a string, b int) (int, int) {
	fmt.Println("a", a)
	fmt.Println("b", b)

	return 555, 777

}

//返回多个返回值，有形参名称的

func fun3(a string, b int) (r1 int, r2 int) {
	fmt.Println("a", a)
	fmt.Println("b", b)

	//给有名称的返回值变量赋值
	r1 = 1000
	r2 = 2000

	return
}

func fun4(a string, b int) (r1, r2 int) {
	fmt.Println("a", a)
	fmt.Println("b", b)

	//r1 r2 属于方法的形参，初始化默认值是0
	fmt.Println("r1 =", r1)
	fmt.Println("r2 =", r2)

	//给有名称的返回值变量赋值

	r1 = 1000
	r2 = 2000

	return
}

func main() {
	c := fun1("aaa", 10)

	fmt.Println("c", c)

	ret1, ret2 := fun2("saaa", 111)
	fmt.Println("ret1", ret1, "ret2", ret2)

	ret1, ret2 = fun3("fun3", 333)
	fmt.Println("ret1", ret1, "ret2", ret2)

	ret1, ret2 = fun4("fun4", 444)
	fmt.Println("ret1", ret1, "ret2", ret2)

}
