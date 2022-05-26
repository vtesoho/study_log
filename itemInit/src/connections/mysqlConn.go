package connections

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitMysql() {
	// 'driver' => 'mysql',
	// 'host' => env('DB_HOST', '8.129.221.136'),
	// 'port' => env('DB_PORT', 3306),
	// 'database' => env('DB_DATABASE', 'admin'),
	// 'username' => env('DB_USERNAME', 'admin'),
	// 'password' => env('DB_PASSWORD', 'EDa8jzZ4w3LK8Wcf'),
	// 'unix_socket' => env('DB_SOCKET', ''),
	// 'charset' => env('DB_CHARSET', 'utf8mb4'),
	// 'collation' => env('DB_COLLATION', 'utf8mb4_unicode_ci'),
	// 'prefix' => env('DB_PREFIX', 'web_'),
	// 'strict' => env('DB_STRICT_MODE', true),
	// 'engine' => env('DB_ENGINE', null),
	// 'timezone' => env('DB_TIMEZONE', '+00:00'),
	// db, err := sql.Open("mysql", "toker:Bn2tKZzHRJmB8Asr@tcp(172.24.119.151:61229)/toker")
	db, err := sql.Open("mysql", "toker:Bn2tKZzHRJmB8Asr@tcp(47.106.10.111:61229)/toker")
	// db, err := sql.Open("mysql", "admin:EDa8jzZ4w3LK8Wcf@tcp(8.129.221.136:3306)/admin")

	if err != nil {
		log.Fatalln(err)
		defer db.Close()
	}

	// defer db.Close()

	db.SetMaxIdleConns(1000)
	db.SetMaxOpenConns(2000)
	db.SetConnMaxLifetime(time.Minute * 60)

	DB = db

	if err := db.Ping(); err != nil {
		log.Fatalln(err)
	}

}

func GetDB() *sql.DB {
	return DB
}

func Test() {
	rows, _ := DB.Query("SELECT * FROM `admin`.`web_test` LIMIT 0,1000")

	type info struct {
		id        int    `db:"id"`
		phone     string `db:"phone"`
		client_id string `db:"client_id"`
	}
	for rows.Next() {
		var s info
		rows.Scan(&s.id, &s.phone, &s.client_id)
		// check(err)
		fmt.Println(s)
	}

	fmt.Println("row", rows)
}
