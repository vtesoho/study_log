package oddevensort

//数据 方差不是太大的情况下用这个排序
func Oddevensort(arr []int) []int {
	length := len(arr)
	isSorted := false
	for isSorted == false {
		isSorted = true
		for i := 1; i < length-1; i = i + 2 {
			if arr[i] > arr[i+1] {
				arr[i], arr[i+1] = arr[i+1], arr[i]
				isSorted = false
			}
		}
		for i := 0; i < length-1; i = i + 2 {
			if arr[i] > arr[i+1] {
				arr[i], arr[i+1] = arr[i+1], arr[i]
				isSorted = false
			}
		}
	}
	return arr
}
