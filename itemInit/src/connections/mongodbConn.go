package connections

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

func InitMongoDB() {
	// 设置客户端连接配置
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	clientOptions := options.Client().ApplyURI("mongodb://toker:YodcHL3NeqdqfNvoRGrxPJ64Phqv61vM@47.106.10.111:47831/toker")
	// admin XK1tFfUTgCburlcx6pUQvsi8rxYQ7CXh
	//

	// toker YodcHL3NeqdqfNvoRGrxPJ64Phqv61vM
	clientOptions.SetMaxPoolSize(2000)
	clientOptions.SetMinPoolSize(20)
	// clientOptions := options.Client().ApplyURI("mongodb://47.106.10.111:27017")
	// 连接到MongoDB
	// var err error
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	// 检查连接
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB!")

	Client = client

}

type Student struct {
	Id          string `bson:"id"`
	CompanyName string `bson:"companyName"`
}

func MongodbTest() {
	collection := Client.Database("test").Collection("web_test")
	// collection.Find(ctx,{{}})

	s1 := Student{"123123123123", "欧阳修"}

	collection.InsertOne(context.TODO(), s1)

}

func ConnDBTest() *mongo.Database {
	return Client.Database("test")
}

func ConnDBToker() *mongo.Database {
	return Client.Database("toker")
}
