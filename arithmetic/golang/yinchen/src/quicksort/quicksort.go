package quicksort

import "math/rand"

func Quicksort(arr []int) []int {
	length := len(arr)
	if length <= 1 {
		return arr
	} else {

		splitdata := arr[0]
		low := make([]int, 0)
		high := make([]int, 0)
		mid := make([]int, 0)
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
		low, high = Quicksort(low), Quicksort(high)
		myarr := append(append(low, mid...), high...)
		return myarr

	}
}

//取一个随机树
func Quicksort2(arr []int) []int {
	length := len(arr)
	if length <= 1 {
		return arr
	} else {
		n := rand.Int() % length
		splitdata := arr[n]
		low := make([]int, 0)
		high := make([]int, 0)
		mid := make([]int, 0)
		mid = append(mid, splitdata)
		for i := 0; i < length; i++ {
			if i == n {
				continue
			}
			if arr[i] < splitdata {
				low = append(low, arr[i])
			} else if arr[i] > splitdata {
				high = append(high, arr[i])
			} else {
				mid = append(mid, arr[i])
			}
		}
		low, high = Quicksort(low), Quicksort(high)
		myarr := append(append(low, mid...), high...)
		return myarr

	}
}
