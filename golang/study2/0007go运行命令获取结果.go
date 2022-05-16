package main

import (
	"fmt"
	"os/exec"
)

func main1() {
	// fmt.Println("ss")
	cmd := exec.Command("ls") //创建一个命令
	cmd.Run()                 //执行命令
}

func main() {
	// fmt.Println("ss")
	cmd := exec.Command("ls")      //创建一个命令
	out, _ := cmd.CombinedOutput() //获取命令输出
	fmt.Printf("%s", out)

}
