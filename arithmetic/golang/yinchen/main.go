package main

import (
	"fmt"
	"yinchen/src/mergesort"
)

func main() {
	// main1()
	arr := []int{4, 7, 8, 1, 9, 3, 7, 2, 5, 10}
	fmt.Println(mergesort.MergeSort(arr))
}
