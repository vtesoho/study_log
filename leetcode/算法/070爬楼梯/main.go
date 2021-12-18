package main

import "fmt"

//时间复杂度为o(2n)，在平台上提交不会通过
func climbStairsa(n int) int {
	if n <= 2 {
		return n
	} else {
		return climbStairs(n-1) + climbStairs(n-2)
	}
}

//内存占用少点，时间复杂度为o(n)，相当于在递归的基础上，把上一次爬楼的值储起来，不需要每次在去计算。与斐波那契数列是一样的
func climbStairs(n int) int {
	if n <= 2 {
		return n
	}
	a := 1
	b := 2
	for i := 2; i < n-1; i++ {
		a, b = b, a+b
	}
	return a + b
}

//内存占用会多点，是用空间换时间的解法，时间复杂度为o(1)
func climbStairsb(n int) int {
	result := make(map[int]int, 50)
	result[1] = 1
	result[2] = 2
	result[3] = 3
	result[4] = 5
	result[5] = 8
	result[6] = 13
	result[7] = 21
	result[8] = 34
	result[9] = 55
	result[10] = 89
	result[11] = 144
	result[12] = 233
	result[13] = 377
	result[14] = 610
	result[15] = 987
	result[16] = 1597
	result[17] = 2584
	result[18] = 4181
	result[19] = 6765
	result[20] = 10946
	result[21] = 17711
	result[22] = 28657
	result[23] = 46368
	result[24] = 75025
	result[25] = 121393
	result[26] = 196418
	result[27] = 317811
	result[28] = 514229
	result[29] = 832040
	result[30] = 1346269
	result[31] = 2178309
	result[32] = 3524578
	result[33] = 5702887
	result[34] = 9227465
	result[35] = 14930352
	result[36] = 24157817
	result[37] = 39088169
	result[38] = 63245986
	result[39] = 102334155
	result[40] = 165580141
	result[41] = 267914296
	result[42] = 433494437
	result[43] = 701408733
	result[44] = 1134903170
	result[45] = 1836311903
	return result[n]
}
func main() {
	fmt.Println(climbStairs(2))
}
