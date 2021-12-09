package main

import "fmt"

func sum(arr []int) int {
	return suma(arr, 0)
}

func suma(arr []int, start int) int {
	if start == len(arr) {
		return 0
	}
	return arr[start] + suma(arr, start+1)
}

func main() {
	test := []int{2, 1, 4}
	fmt.Println("sum(test)", sum(test))
}
