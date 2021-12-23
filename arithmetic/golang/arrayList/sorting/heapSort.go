package main

import "fmt"

func HeapSort(arr []int) []int {
	length := len(arr)
	for i := 0; i < length; i++ {
		lastmesslen := length - i
		HeapSortMax(arr, lastmesslen)
		if i < length {
			arr[0], arr[lastmesslen-1] = arr[lastmesslen-1], arr[0]
		}
	}
	return arr
}

func HeapSortMax(arr []int, length int) []int {
	// length := len(arr)
	if length <= 1 {
		return arr
	} else {
		depth := length/2 - 1
		for i := depth; i >= 0; i-- {
			topmax := i
			leftchild := 2*i + 1
			rightchlid := 2*i + 2
			if leftchild <= length-1 && arr[leftchild] > arr[topmax] {
				topmax = leftchild //如果左边比我大，记录最大的
			}
			if rightchlid <= length-1 && arr[rightchlid] > arr[topmax] {
				topmax = rightchlid //如果右边比我大，记录最大的
			}
			if topmax != i { //确保i的值就是最大
				arr[i], arr[topmax] = arr[topmax], arr[i]
			}
		}
		return arr

	}
}

func mainb() {
	arr := []int{9, 10, 7, 4, 2, 6, 4, 8, 3, 5}
	// fmt.Println("HeapSortMax", HeapSortMax(arr))
	fmt.Println("HeapSort", HeapSort(arr))
}
