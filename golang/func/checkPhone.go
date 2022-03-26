package main

import (
	"regexp"
)

func main() {
	isMobile(`13200000000`)
}

// 识别手机号码
func isMobile(mobile string) {
	result, _ := regexp.MatchString(`^(1[3|4|5|8][0-9]\d{4,8})$`, mobile)
	if result {
		println(`正确的手机号`)
	} else {
		println(`错误的手机号`)
	}
}
