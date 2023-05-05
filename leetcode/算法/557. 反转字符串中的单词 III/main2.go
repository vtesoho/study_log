package main

import "fmt"

func main() {
	s := "Let's take LeetCode contest"
	fmt.Println(reverseWords(s))
}

func reverseWords(s string) string {
	sByte := []byte(s)
	startIndex := 0
	endIndex := 0
	for endIndex < len(s) {
		for endIndex < len(s) && s[endIndex] != ' ' {
			endIndex++
		}

		for n := startIndex; n < (startIndex+endIndex)/2; n++ {
			sByte[n], sByte[startIndex+endIndex-n-1] = sByte[startIndex+endIndex-n-1], sByte[n]
		}

		endIndex++
		startIndex = endIndex
	}
	return string(sByte)
}


执行结果：
通过
显示详情
查看示例代码
添加备注

执行用时：
8 ms
, 在所有 Go 提交中击败了
56.97%
的用户
内存消耗：
6.2 MB
, 在所有 Go 提交中击败了
62.65%
的用户
通过测试用例：
29 / 29