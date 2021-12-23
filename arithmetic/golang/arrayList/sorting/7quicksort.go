package main

import "fmt"

func QuickSort(arr []int) []int {
	length := len(arr)
	if length <= 1 {
		return arr
	} else {
		splitdata := arr[0]
		low := make([]int, 0, 0)
		high := make([]int, 0, 0)
		mid := make([]int, 0, 0)
		mid = append(mid, splitdata)
		for i := 1; i < length; i++ {
			if arr[i] < splitdata {
				low = append(low, arr[i])
			} else if arr[i] > splitdata {
				high = append(high, arr[i])
			} else {
				mid = append(mid, arr[i])
			}
		}
		low, high = QuickSort(low), QuickSort(high) //切割递归处理
		myarr := append(append(low, mid...), high...)
		return myarr
	}

}

func main() {
	arr := []int{3, 10, 7, 4, 2, 6, 9, 8, 1, 5}
	// fmt.Println("HeapSortMax", HeapSortMax(arr))
	fmt.Println("HeapSort", QuickSort(arr))
}
