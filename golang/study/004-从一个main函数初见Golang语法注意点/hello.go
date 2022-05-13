package main //程序的包名

/*   //引入包的二种形式
import "fmt"
import "time"
*/
import (
	"fmt"
	"time"
)

//main函数
func main() { //函数的花括号一定是和函数名在同一行的，否则编译错误
	//golang中的表达式，加 分号和不加都可以，建议是不加
	fmt.Println("hello go")

	time.Sleep(1 * time.Second)
}
