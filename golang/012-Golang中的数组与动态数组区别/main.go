package main

import "fmt"

// import "fmt"

// func main() {
// 固定长的是数组都是值拷贝
// 	//一个固定长度的数组
// 	var myArray1 [10]int

// 	//创建一个长度为10的数组，前面四位的初始值为1,2,3,4
// 	myArray2 := [10]int{1, 2, 3, 4}

// 	for i := 0; i < len(myArray1); i++ {
// 		myArray1[i] = i
// 	}
// 	fmt.Println("myArray1", myArray1)

// 	for i, v := range myArray2 {
// 		fmt.Println("i", i, "v", v)
// 	}
// 	// fmt.Println("myArray2", myArray2)
// }

func main() {
	myArray := []int{1, 2, 3, 4} //动态数组，切片 slice
	printArray(myArray)
	fmt.Printf("myArray type is %T \n", myArray)
	fmt.Println("myArray change", myArray)
}

func printArray(myArray []int) {
	// _ 表示匿名变量
	for _, v := range myArray {
		fmt.Println("v", v)
	}
	myArray[2] = 300
}
