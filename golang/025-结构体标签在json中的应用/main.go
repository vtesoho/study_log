package main

import (
	"encoding/json"
	"fmt"
)

type Movie struct {
	Title  string   `json:"title"`
	Year   int      `json:"year"`
	Price  int      `json:"price"`
	Actors []string `json:"actors"`
}

func main() {
	movie := Movie{"喜剧之王", 2000, 10, []string{"xingye", "wei"}}

	//编码的过程
	jsonStr, err := json.Marshal(movie)

	if err != nil {
		fmt.Println("json error", err)
		return
	}

	fmt.Printf("jsonstr %s \n", jsonStr)

	//解码的过程

	my_movie := Movie{}

	err = json.Unmarshal(jsonStr, &my_movie)

	fmt.Printf("v% \n", my_movie)

}
