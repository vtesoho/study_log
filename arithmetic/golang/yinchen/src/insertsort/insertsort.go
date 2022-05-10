package insertsort

func Insertsort(arr []int) []int {
	num := len(arr)

	if num < 2 {
		return arr
	}
	for i := 1; i < num; i++ {
		backup := arr[i]
		j := i - 1
		for j >= 0 && backup < arr[j] {
			arr[j+1] = arr[j]
			j--
		}
		arr[j+1] = backup
		// for a := 0; a < num; a++ {
		// 	if arr[i] < arr[a] {
		// 		arr[i], arr[a] = arr[a], arr[i]
		// 	}
		// }
	}

	return arr
}

func insertItem(i int, arr []int) []int {
	backup := arr[i]
	j := i - 1
	for j >= 0 && backup < arr[j] {
		arr[j+1] = arr[j]
		j--
	}
	arr[i] = backup
	return arr
}
