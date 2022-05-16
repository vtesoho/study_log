package main

import (
	"os/exec"
)

func main() {
	// fmt.Println("ss")
	cmd := exec.Command("ls") //创建一个命令
	cmd.Run()                 //执行命令
}
