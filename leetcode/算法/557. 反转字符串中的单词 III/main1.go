package main

import "fmt"

// 减少使用一个栈
func main() {
	s := "Let's take LeetCode contest"
	fmt.Println(reverseWords(s))
}

func reverseWords(s string) string {

	res := ""
	l := make([]string, 0)
	for i := 0; i < len(s); i++ {
		if s[i:i+1] != " " {
			l = append(l, s[i:i+1])
		} else {
			for j := len(l) - 1; j >= 0; j-- {
				res += l[j]
			}
			l = make([]string, 0)
			res += " "
		}
	}
	if len(l) > 0 {
		for j := len(l) - 1; j >= 0; j-- {
			res += l[j]
		}
	}
	return res
}
