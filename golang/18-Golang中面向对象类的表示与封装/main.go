package main

import "fmt"

//如果类名首字母大写。表示其它包也能够访问
//如果说类的属性首字母大写，表示该属性外部能访问。否则的话只能够类的内部访问。
type Hero struct {
	Name  string
	Ad    int
	Lever int
}

// func (this Hero) Show() {
// 	fmt.Println("hero", this)
// }

// func (this Hero) GetName() {
// 	fmt.Println("name", this.Name)
// }

// func (this Hero) SetName(newNmae string) {
// 	//this 是调用该方法的对象一个副本
// 	this.Name = newNmae
// }

func (this *Hero) Show() {
	fmt.Println("hero", this)
}

func (this *Hero) GetName() {
	fmt.Println("name", this.Name)
}

func (this *Hero) SetName(newNmae string) {
	//this 是调用该方法的对象一个副本
	this.Name = newNmae
}

func main() {
	hero := Hero{Name: "aa", Ad: 100, Lever: 1}

	hero.GetName()

	hero.Show()

	hero.SetName("bbb")

	hero.Show()

}
