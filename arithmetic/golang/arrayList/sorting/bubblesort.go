package main

import "fmt"

func bubblesortIndex(arr []int) {
	i := 0
	cur := arr[i]
	for j := 0; j < len(arr)-1; j++ {
		if arr[j] > arr[j+1] {
			fmt.Println("j", j, "arr[j]", arr[j], "cur", cur, "arr", arr)
			arr[j], arr[j+1] = arr[j+1], arr[j]
		}
	}
	fmt.Println(arr)
}

func bubblesort(arr []int) []int {
	length := len(arr)
	if length < 0 {
		return arr
	}
	for i := 0; i < length; i++ {
		for j := i + 1; j < length; j++ {
			if arr[i] < arr[j] {
				arr[i], arr[j] = arr[j], arr[i]
			}
		}
	}
	return arr

}

func maina() {
	arr := []int{9, 10, 7, 4, 2, 6, 4, 8, 3, 5}

	fmt.Println("bubblesort", bubblesort(arr))
}
