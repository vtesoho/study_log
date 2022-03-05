package mergesort

import "fmt"

func merge(leftarr []int, rightarr []int) []int {
	leftindex := 0
	rightindex := 0
	lastarr := []int{}
	for leftindex < len(leftarr) && rightindex < len(rightarr) {
		if leftarr[leftindex] < rightarr[rightindex] {
			lastarr = append(lastarr, leftarr[leftindex])
			leftindex++
		} else if leftarr[leftindex] > rightarr[rightindex] {
			lastarr = append(lastarr, rightarr[rightindex])
			rightindex++
		} else {
			lastarr = append(lastarr, leftarr[leftindex])
			lastarr = append(lastarr, rightarr[rightindex])
			leftindex++
			rightindex++
		}
	}
	for leftindex < len(leftarr) {
		lastarr = append(lastarr, leftarr[leftindex])
		leftindex++
	}
	for rightindex < len(rightarr) {
		lastarr = append(lastarr, rightarr[rightindex])
		rightindex++
	}
	return lastarr
}

func MergeSort(arr []int) []int {
	length := len(arr)
	if length <= 1 {
		return arr
	} else {
		mid := length / 2
		leftarr := MergeSort(arr[:mid])
		rightarr := MergeSort(arr[mid:])
		fmt.Println("leftarr", leftarr, "rightarr", rightarr)
		return merge(leftarr, rightarr)
	}
}
