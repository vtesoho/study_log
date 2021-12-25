package main

import "fmt"

func ShellsortStep(arr []int, start int, gep int) {
	length := len(arr)
	for i := start + gep; i < length; i += gep {
		cur := arr[i]
		index := i - gep
		for index >= 0 && arr[index] > cur {
			arr[index+gep] = arr[index]
			index -= gep
		}
		arr[index+gep] = cur
	}

}

func Shellsort(arr []int) []int {
	length := len(arr)
	if length <= 1 {
		return arr
	} else {
		gap := length / 2
		for gap > 0 {
			for i := 0; i < gap; i++ {
				ShellsortStep(arr, i, gap)
			}
			gap /= 2 //gap--
		}
	}
	return arr
}

func main() {
	arr := []int{1, 9, 7, 4, 2, 6, 4, 8, 3, 5}

	fmt.Println("SelectSort", Shellsort(arr))
}
