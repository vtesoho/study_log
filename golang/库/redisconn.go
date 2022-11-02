package conn

import (
	"time"

	"github.com/gomodule/redigo/redis"
)

type RecordRedis struct {
	pool *redis.Pool
}

var recordRedis *RecordRedis

func RecordInitRedis() {
	recordRedis = new(RecordRedis)
	recordRedis.pool = &redis.Pool{
		MaxIdle:     50,
		MaxActive:   200,
		IdleTimeout: 240 * time.Second,
		Dial: func() (redis.Conn, error) {
			return redis.Dial(
				"tcp",
				"a.a.a.a:6789",
				redis.DialReadTimeout(time.Duration(3000)*time.Millisecond),
				redis.DialWriteTimeout(time.Duration(3000)*time.Millisecond),
				redis.DialConnectTimeout(time.Duration(2000)*time.Millisecond),
				redis.DialDatabase(0),
				redis.DialPassword("afafasdfasdf"),
			)
		},
	}
}

func RecordExec(cmd string, key interface{}, args ...interface{}) (interface{}, error) {
	// var con redis.Conn := redis.pool.Get()
	con := recordRedis.pool.Get()

	// defer func() {
	// 	if err := recover(); err != nil { // 捕捉错误
	// 		fmt.Println("err---------------")
	// 	}
	// }()

	if err := con.Err(); err != nil {
		return "", err
	}
	defer con.Close()
	parmas := make([]interface{}, 0)
	parmas = append(parmas, key)
	if len(args) > 0 {
		for _, v := range args {
			parmas = append(parmas, v)
		}
	}

	// fmt.Println("cmd", cmd, "parmas", parmas)
	return con.Do(cmd, parmas...)
}
