# getpost以及动态路由传值

## get

### 获取get的值
c.Query("name")

### 获取get的值，并设置默认值
c.DefaultQuery("name","test")


## post

### 获取post表单的值
c.PostForm("name")

### 获取post的值，并设置默认值
c.DefaultPostForm("name","test")



## get 传值绑定到结构体
```go
type Test struct{
    Name string `form:"name" json:"name"`
    Age string `form:"age" json:"age"`
}

test := &Test{}

if err := c.ShouldBind(&test),err == nil{
    //绑定成功
}else{
    //绑定失败
}


```


## post xml绑定到结构体

```go
type Test struct{
    Name string `form:"name" json:"name"`
    Age string `form:"age" json:"age"`
}

test := *Test{}

xmlSliceData, _ := c.GetRawData()

if err := xml.Unmarsha1(xmlSliceData, &test); err == nil{
    //解析成功
}else{
    //解析失败
}


```


## 动态路由
```go
r.Get("/user/:uid",func(c *gin.Context){
    uid := c.Param("uid")  //通过Param获取
})
```