package main

import "fmt"

func printMap(cityMap map[string]string) {
	//cityMap是一个引用传递
	for k, v := range cityMap {
		fmt.Println("k", k, "v", v)
	}
}

func ChangeValue(cityMap map[string]string) {
	cityMap["england"] = "London"
}

func main() {
	cityMap := make(map[string]string)

	//添加
	cityMap["China"] = "beijing"
	cityMap["Japan"] = "Tokyo"
	cityMap["USA"] = "NewYork"

	//遍历
	printMap(cityMap)

	fmt.Println("---------")

	//删除
	delete(cityMap, "Japan")

	//修改
	cityMap["USA"] = "DC"

	//传参后修改
	ChangeValue(cityMap)

	//遍历
	printMap(cityMap)

}
