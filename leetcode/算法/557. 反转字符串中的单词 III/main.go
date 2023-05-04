package main

import "fmt"

func main() {
	s := "Let's take LeetCode contest"
	fmt.Println(reverseWords(s))
}

func reverseWords(s string) string {
	re := make([]string, 0)
	l := make([]string, 0)
	for i := 0; i < len(s); i++ {
		if s[i:i+1] != " " {
			l = append(l, s[i:i+1])
		} else {
			for j := len(l) - 1; j >= 0; j-- {
				re = append(re, l[j])
			}
			l = make([]string, 0)
			re = append(re, " ")
		}
	}
	res := ""
	for _, v := range re {
		res += v
	}
	if len(l) > 0 {
		for j := len(l) - 1; j >= 0; j-- {
			res += l[j]
		}
	}
	return res
}
