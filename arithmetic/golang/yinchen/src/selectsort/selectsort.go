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
