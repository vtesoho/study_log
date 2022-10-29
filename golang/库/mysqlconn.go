package conn

import (
	"fmt"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var ExpenseLog *gorm.DB

func ExpenseLogMysqlInit() {

	dsn := "root:HrnG8We2FApr8yAs@tcp(172.24.119.132:3306)/expense?charset=utf8mb4&parseTime=True&loc=Local"
	// dsn := "root:1rRLm5IO_a8F@tcp(127.0.0.1:3306)/washLog?charset=utf8mb4&parseTime=True&loc=Local"
	// dsn := "log:NNSKSFmwhRR4GZwi@tcp(172.24.119.131:3306)/log?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("数据库连接失败err", err)
	}

	// if dbnum == "" {
	// 	fmt.Println("sss")
	// 	dsn = "root:b1ed9a86bd62051c@tcp(172.24.119.134:3306)/oa?charset=utf8mb4&parseTime=True&loc=Local"
	// } else {
	// }
	// return gorm.Open(mysql.Open(dsn), &gorm.Config{})
	// if err != nil {
	// 	fmt.Println("数据库连接失败err", err)
	// }
	sqlDB, _ := db.DB()

	// SetMaxIdleConns 设置空闲连接池中连接的最大数量
	sqlDB.SetMaxIdleConns(10)

	// // SetMaxOpenConns 设置打开数据库连接的最大数量。
	sqlDB.SetMaxOpenConns(100)

	// // SetConnMaxLifetime 设置了连接可复用的最大时间。
	sqlDB.SetConnMaxLifetime(time.Hour)

	// DB = db

	ExpenseLog = db

}

func GetExpenseLogDB() *gorm.DB {
	return ExpenseLog
}

// func GetMysqlDB() *gorm.DB {
// 	return DB
// }

// func Test() {
// DB.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(&User{})
// 增
// DB.Create(&User{
// 	Name: "张三",
// 	Age:  18,
// 	Addr: "北京市",
// 	Pic:  "/static/img.png",
// })

// 查
// var sdfsdfds User
// DB.First(&user)
// DB.NamingStrategy.TableName("sssss")

// DB.Scopes(ReTableName("ssssssss")).AutoMigrate(&Log{})

// DB.Scopes(ReTableName("ssssssss")).Create(&Log{
// 	Cid: "aaaaaa",
// 	Mid: "bbbbbb",
// })

// DB.Find(&sdfsdfds)

// fmt.Println(sdfsdfds) // {1 张三 18 北京市 /static/img.png}

// sdfsdfds.Name = "lisi"
// DB.Save(&sdfsdfds)
// fmt.Println(sdfsdfds)

// // 删
// DB.Delete(&sdfsdfds)

// rows, _ := DB.Query("SELECT * FROM `toker`.`test` LIMIT 0,1000")

// type info struct {
// 	id        int    `db:"id"`
// 	phone     string `db:"phone"`
// 	client_id string `db:"client_id"`
// }
// for rows.Next() {
// 	var s info
// 	rows.Scan(&s.id, &s.phone, &s.client_id)
// 	// check(err)
// 	fmt.Println(s)
// }

// fmt.Println("row", rows)
// }

// func ReTableName(tabname string) func(tx *gorm.DB) *gorm.DB {
// 	return func(tx *gorm.DB) *gorm.DB {
// 		return tx.Table(tabname)
// 	}
// }

func ReTableName(tabname string) func(tx *gorm.DB) *gorm.DB {
	return func(tx *gorm.DB) *gorm.DB {
		return tx.Table(tabname)
	}
}
