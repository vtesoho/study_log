package main

import "fmt"

func SelectSortMax(arr []int) int {
	length := len(arr)
	if length <= 1 {
		return arr[0]
	} else {
		max := arr[0]
		for i := 1; i < length; i++ {
			if arr[i] > max {
				max = arr[i]
			}
		}
		return max
	}
}

func RadixSort(arr []int) []int {
	max := SelectSortMax(arr)
	for bit := 1; max/bit > 0; bit *= 10 {
		arr = BitSort(arr, bit) //每次处理一个级别的排序
		fmt.Println(arr)
	}
	return arr
}

func BitSort(arr []int, bit int) []int {
	length := len(arr)
	bitcounts := make([]int, 10) //统计长度
	for i := 0; i < length; i++ {
		num := (arr[i] / bit) % 10
		bitcounts[num]++ //统计余数相等的个数
	}
	fmt.Println(bitcounts)

	for i := 1; i < 10; i++ {
		bitcounts[i] += bitcounts[i-1]
	}
	fmt.Println(bitcounts)
	tmp := make([]int, 10)
	for i := length - 1; i >= 0; i-- {
		num := (arr[i] / bit) % 10
		tmp[bitcounts[num]-1] = arr[i]
		bitcounts[num]--
	}
	for i := 0; i < length; i++ {
		arr[i] = tmp[i]
	}
	return arr

}

func main() {
	// arr := []int{1, 9, 7, 4, 2, 6, 4, 8, 3, 5}
	arr := []int{11, 91, 222, 878, 348, 7123, 4213, 6232, 5123, 1011}

	fmt.Println("SelectSort", RadixSort(arr))
}
