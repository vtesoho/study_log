package main

import "fmt"

func odd_evev(arr []int) []int {
	length := len(arr)
	if length <= 1 {
		return arr
	} else {
		// tmp := 0
		isSorted := false //

		for isSorted == false {
			isSorted = true
			for i := 1; i < length-1; i = i + 2 {
				if arr[i] < arr[i+1] {
					arr[i], arr[i+1] = arr[i+1], arr[i]
					isSorted = false
				}
			}
			for i := 0; i < length-1; i = i + 2 {
				if arr[i] < arr[i+1] {
					arr[i], arr[i+1] = arr[i+1], arr[i]
					isSorted = false
				}
			}
		}
		return arr

	}
}

func main() {
	arr := []int{3, 10, 7, 4, 2, 6, 9, 8, 1, 5}
	fmt.Println("HeapSort", odd_evev(arr))
}
