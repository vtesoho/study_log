#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const updataServer = require("./server")
let handelMsg = require('./handle')

const opt = {credentials: require('amqplib').credentials.plain('shop_1', '123456')};

const amqpConnect = async ()=>{
    amqp.connect('amqp://106.52.26.252/%2Fshop_1?heartbeat=3', opt, function (error0, connection) {
        if (error0) {
            throw new Error('lalal');
        }
        // console.log('connection', connection);
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw new Error('lalal');
                console.log(" error 2");
            }
            var exchange = 'siyu_order_exchange';
            channel.assertExchange(exchange, 'direct', {
                durable: true
            });
            var queue = 'siyu_order';
            channel.assertQueue(queue, {
                durable: true
            });
            channel.bindQueue(queue, exchange, queue);
            console.log(" [*] queue siyu_order succeed", queue);
            channel.prefetch(100);
            channel.consume(queue,async function (msg) {
                console.log(" [x] siyu_order %s", msg.content.toString());
                
                let handleData = JSON.parse(msg.content)
                let re = await handelMsg.handleAmqpPrint(msg.content)
                if(re) {
                    await updataServer.printStatus(handleData.msg_id,true)
                    //确认ACK
                    console.log(" siyu_order 确认ACK ");
                    
                }else{
                    
                    await updataServer.printStatus(handleData.msg_id,false)
                    console.log(" siyu_order 打印出错 ");
                }
                channel.ack(msg);
                // console.log("测试环境全部确认ack");
                // channel.ack(msg);
            }, {
                noAck: false
            });
        });
    });
}

try {
    amqpConnect()
} catch (error) {
    console.log(error)
}


console.log('end')
