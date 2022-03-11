package main

import (
	"fmt"
	"yinchen/src/oddevensort"
)

func main() {
	// main1()
	arr := []int{4, 8, 1, 9, 3, 7, 2, 5, 10}
	// fmt.Println(shellsort.ShellSort(arr))
	// fmt.Println(heapsort.HeapSort(arr))
	fmt.Println(oddevensort.Oddevensort(arr))
}
