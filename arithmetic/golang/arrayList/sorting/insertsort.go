package main

import "fmt"

//从右往左插入
func Insertsort(arr []int) []int {
	length := len(arr)
	if length <= 1 {
		return arr
	}
	for i := 1; i < length; i++ {
		cur := arr[i]
		index := i - 1
		for index >= 0 && arr[index] > cur {
			arr[index+1] = arr[index]
			index--
		}
		arr[index+1] = cur
		// if index != i {
		// 	arr[i], arr[index] = arr[index], arr[i]
		// }
		fmt.Println("i", i, "j", index, "arr", arr)
	}
	return arr
}

func main5() {
	arr := []int{9, 10, 7, 4, 2, 6, 4, 8, 3, 5}
	fmt.Println("insertsort", Insertsort(arr))
}
