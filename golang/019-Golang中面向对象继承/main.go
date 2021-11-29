package main

import "fmt"

type Human struct {
	name string
	sex  string
}

func (this *Human) Eat() {
	fmt.Println("human.eat")
}

func (this *Human) Walk() {
	fmt.Println("human.walk")
}

type SuperMan struct {
	Human //表示SuperMan类继承了Human类的方法
	level int
}

//重定义父类的方法eat()

func (this *SuperMan) Eat() {
	fmt.Println("super.Eat()")
}

//子类 的新方法

func (this *SuperMan) Fly() {
	fmt.Println("superman.fly()")
}

func main() {
	h := Human{"zhang3", "female"}

	h.Eat()

	h.Walk()

	//一种定义方式
	// s := SuperMan{Human{"li4", "female"}, 1}

	//第二种定义方式
	var s SuperMan
	s.name = "aaaa"
	s.sex = "male"
	s.level = 99

	s.Walk()
	s.Eat()
	s.Fly()
}
