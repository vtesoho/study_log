package main

import "fmt"

/**
## 多态的基本一素
1. 有一个父类
2. 有子类实现了父类的全部接口方法
3. 父类类型的变量指向任性哦的人具体数据变量

*/

//本质是一个指针
type Animal interface {
	Sleep()
	GetColor() string
	GetType() string
}

//具体的类
type Cat struct {
	color string
}

func (this *Cat) Sleep() {
	fmt.Println("cat is sleep")
}
func (this *Cat) GetColor() string {
	return this.color
}
func (this *Cat) GetType() string {
	return "Cat"
}

//具体的类

type Dog struct {
	color string
}

func (this *Dog) Sleep() {
	fmt.Println("Dog is sleep")
}
func (this *Dog) GetColor() string {
	return this.color
}
func (this *Dog) GetType() string {
	return "Dog"
}

func showAnimal(animal Animal) {
	animal.Sleep() //多态
	fmt.Println("color", animal.GetColor())
	fmt.Println("color", animal.GetType())
}

func main() {
	// var animal Animal
	// animal = &Cat{"cat"}
	// animal.Sleep()

	// animal = &Dog{"yellow"}

	// animal.Sleep()

	cat := Cat{"green"}
	dog := Dog{"black"}
	showAnimal(&cat)
	showAnimal(&dog)

}
