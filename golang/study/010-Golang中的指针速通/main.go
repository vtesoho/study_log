package main

import "fmt"

func fun1changeValue(p int) {
	p = 10
}

func fun1() {
	var a int = 1

	fun1changeValue(a)

	fmt.Println("fun1 a=", a)
}
func fun2changeValue(p *int) {
	*p = 10
}
func fun2() {
	var a int = 1

	fun2changeValue(&a)

	fmt.Println("fun2 a=", a)
}

func fun3swap(a int, b int) {
	var temp int
	temp = a
	a = b
	b = temp
}

func fun3() {
	var a int = 10
	var b int = 10
	fun3swap(a, b)
	fmt.Println("a = ", a, "b=", b)
}

func fun4swap(a *int, b *int) {
	var temp int
	temp = *a
	*a = *b
	*b = temp
}

func fun4() {
	var a int = 10
	var b int = 20
	fun4swap(&a, &b)
	fmt.Println("a = ", a, "b=", b)
}

//二级指针
func fun5() {
	var a int = 10
	var p *int
	p = &a

	var pp **int
	pp = &p

	fmt.Println(pp)

}

func main() {
	// fun2()
	// fun4()
	fun5()
}
