package selectsort

import "fmt"

func Selectsort(arr []int) {
	len := len(arr)
	for i := 0; i < len; i++ {
		for a := i + 1; a < len; a++ {
			if arr[i] > arr[a] {
				arr[i], arr[a] = arr[a], arr[i]
			}
		}
	}
	fmt.Println("arr", arr)

}
func SelectsortA(arr []int) {
	len := len(arr)
	for i := 0; i < len; i++ {
		min := i
		for a := i + 1; a < len; a++ {
			if arr[min] > arr[a] {
				min = a
			}
		}
		if i != min {
			arr[i], arr[min] = arr[min], arr[i]
		}
	}
	fmt.Println("arr", arr)

}
