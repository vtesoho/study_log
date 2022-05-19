package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	fmt.Println(os.Args) //获取参数
	// 第一个参数是程序路径 后面是参数 以空格分隔
	cmd := exec.Command(os.Args[1], os.Args[2])
	out, _ := cmd.CombinedOutput()
	fmt.Printf("%s", out)
}
