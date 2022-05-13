## 009-import匿名及别名导包方式

import _ "fmt"
给fmt包起一个别名，匿名，无法使用当前包的方法，但是会执行当前包的init()

import aa "fmt"
给fmt起一个叫aa的别名，可以直接调用aa.Println("aa")

import . "fmt"
将当前fmt包中的全部方导入到本包的作用中来，fmt包中的方法可以直接使用，但尽量不要使用这种方式，如果二个包有二样的方法名会出错.