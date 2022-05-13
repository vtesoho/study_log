package main

import "fmt"

//cap 表示整个切片的容量
//len表示切片的长度

//切片的扩容机制，append的时候，如果长度增加后超过容量，则将容量增加2倍

func main() {
	// var numbers = make([]int, 3, 5)

	// //表示向numbers切片追加元素1，number len = 4, [0,0,0,1]
	// numbers = append(numbers, 1)
	// numbers = append(numbers, 2)
	// numbers = append(numbers, 3)

	// fmt.Printf("len %d, cap = %d, slice = %v \n", len(numbers), cap(numbers), numbers)

	s := []int{1, 2, 3}

	s1 := s[0:2]

	fmt.Println("s1=", s1)

	s1[0] = 100

	fmt.Println("s", s, "s1", s1)

	//copy 可以将底屋的数组slice一起进行拷贝
	s2 := make([]int, 3) //s2 = [0,0,0]

	//将s中的值，依次拷贝到s2 中
	copy(s2, s)

	s2[0] = 200
	fmt.Println("s2", s2)
	fmt.Println("s1", s1)

}
