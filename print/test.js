const print = require("./print")
const updataServer = require("./server")
const escpos = require('escpos');
const net = require('net');
const path = require('path');

let text = `
Starting Nmap 7.40 ( https://nmap.org ) at 2020-03-06 09:54 UTC
Nmap scan report for 192.168.1.1 (192.168.1.1)
Host is up (0.0011s latency).
Nmap scan report for 192.168.1.101 (192.168.1.101)
Host is up (0.00028s latency).
Nmap scan report for 192.168.1.243 (192.168.1.243)
Host is up (0.00066s latency).
Nmap done: 255 IP addresses (3 hosts up) scanned in 11.02 seconds
`

let textMatch = text.match(/((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g)
let a = unique(textMatch)
// console.log(a)

function unique (arr) {
    return Array.from(new Set(arr))
}


let testAllPrint = {
    type: "print",
    printer_type: "all",
    printer_key: "00:47:50:58:4A:1B",
    content: {
        shop_name: "深圳拈江湖",
        table: "B1",
        user_amount: 1,
        user_name: "熊猫会长",
        dishes: [{
            name: "番茄红油鸳鸯锅sad21342",
            amount: 1,
            price: "58.00"
        }, {
            name: "生扣鲜鹅肠",
            amount: 5,
            price: "49.50"
        }, {
            name: "大刀腰片",
            amount: 1,
            price: "29.00"
        }, {
            name: "现炸酥肉",
            amount: 1,
            price: "22.00"
        }, {
            name: "椰汁",
            amount: 1,
            price: "6.00"
        }, {
            name: "加多宝",
            amount: 1,
            price: "6.00"
        }, {
            name: "红糖糍粑",
            amount: 1,
            price: "16.00"
        }, {
            name: "冰汤圆",
            amount: 1,
            price: "10.00"
        }, {
            name: "素菜拼盘",
            amount: 1,
            price: "16.00"
        }],
        day: "2020-03-15",
        time: "14:48:07",
        total: "775.50"
    }
}


// console.log(complementString(testAllPrint.content.dishes[0].name,50,"RT"))

pointLocationNum = (str,num) => {
    let re = /[\u4E00-\u9FA5]/g;
    let chineseNum = 0
    if(str.match(re)){
        chineseNum = str.match(re).length
    }
    let letterNum = str.length - chineseNum
    if((chineseNum * 2) - letterNum > num){
        return false
    }else{
        return true
    }
}

// console.log(pointLocationNum('番茄红油鸳鸯锅',20))


testPrintCache = async () => {
    let ip = '192.168.1.243'
    for (let i = 0; i < 10; i++) {
        await print.testPrint(ip,i)
    }
    
}

// testPrintCache()

testP = async () => {
    await updataServer.printStatus(20,false)
    console.log('test end')
}

// testP()

// const cluster = require('cluster'); q

testCpuNum = async () => {
    const numCPUs = require('os').cpus().length;
    console.log(numCPUs) 

}

// testCpuNum()


// let aaa = {"type": "print", "msg_id": 107, "content": {"day": "2020-03-25", "time": "18:09:40", "table": "B1", "dishes": [{"name": "生扣鲜鹅肠", "amount": 3}], "shop_name": "深圳拈江湖", "user_name": "Caizhiwei", "user_amount": 1}, "printer_key": "00:47:50:4E:B1:3E", "printer_type": "kitchen"}

// console.log(aaa.content)

//根据传入字符串和要补全的数字，返回补全的字符串
const complementString = (str,num,type) => {

    let newStr = ''
    let re = /[\u4E00-\u9FA5]/g;
    // console.log()
    let chineseNum = 0
    if(str.match(re)){
        chineseNum = str.match(re).length
    }
    let letterNum = str.length - chineseNum
    let complementNum = num - (chineseNum * 2) - letterNum
    
    // console.log('complementNum',complementNum)
    // console.log('strmatch',str.match(re).length)
    
    
    for (let i = 0; i < complementNum; i++) {
        newStr = `${newStr} `
    }
    if(type === "RT"){
      return `${newStr}${str}`
    }
    if(type === "LT"){
      return `${str}${newStr}`
    }
    return `${str}${newStr}`
    // console.log(`${str}${newStr}|`)
    
  }

let prepayData = {
    "msg_id":1,//消息ID，也就是印号，预支付订单不用打印印号
    "type":"print",
    "printer_type":"prepay", //预支付订单
    "printer_key":"ddd",
    "content":{
        "title": "预结单",
        "shop_name":"拈江湖鸭肠火锅", //店铺名称
        "code_nice":"202003180002", //单号
        "time_type":"全天", //餐段
        "table":"A2",
        "user_amount":3,
        "user_name":"云收银",
        dishes:[
            {
                "name":"测试菜品3",
                "amount":9,
                "price":"1.00",
            },
            {
                "name":"测试商品22",
                "amount":2,
                "price":"1.00", 
            }
        ],
        "day":"2020-01-17",
        "time":"15:28:04",
        "origin_fee":"11", //小计
        "discount":"1.00", //折扣
        "actual_fee":"10",//应付金额
      "remark":"", //备注
      "order_url":"http://www.baidu.com/",
       "print_num":"2", //打印次数
    }
}

function printprepayData (ip,data) {
    const device = new escpos.Network(ip, 9100);
    const printer = new escpos.Printer(device);
    let content = data.content
    console.log('printprepayData start')
    device.open((error) => {
        if (error) {
            printer.close();
            console.log('return new Promise - error:', error);
        }
        printer.font('A')
        printer.align('CT')
        printer.style('BU')
        printer.size(2, 2)
        printer.text(`${content.shop_name}`)
        printer.text(`${content.title}`)
        printer.align('LT')
        printer.size(1, 1)
        printer.text(`${complementString(`日期：${content.day}`,30,'LT')}${complementString(`餐段：${content.time_type}`,15,'LT')}`)
        printer.text(`${complementString(`单号：${content.code_nice}`,30,'LT')}${complementString(`台号：${content.table}`,15,'LT')}`)
        printer.text(`${complementString(`开单：${content.user_name}`,30,'LT')}${complementString(`人数：${content.user_amount}`,15,'LT')}`)
        // printer.text(`${complementString(`时间：${content.day}`,47,'LT')} `)
        printer.text(`时间：${content.day}`)
        printer.text('-----------------------------------------------')
        printer.text(`${complementString('商品名称',24,'LT')} ${complementString('单价',8,'RT')} ${complementString('数量',4,'RT')} ${complementString('小计',8,'RT')}`)
        content.dishes.map((item,index) => {
            printer.text(`${complementString(`${item.name}`,24,'LT')} ${complementString(`${item.price}`,8,'RT')} ${complementString(`${item.amount}`,4,'RT')} ${complementString(`${(item.amount * parseFloat(item.price)).toFixed(1)}`,8,'RT')}`)
        })
        printer.text('-----------------------------------------------')
        printer.text(`${complementString('小计：',20,'LT')}${complementString(`${content.origin_fee}`,27,'RT')}`)
        printer.text(`${complementString('折扣：',20,'LT')}${complementString(`${content.discount}`,27,'RT')}`)
        printer.text(`${complementString('应收金额：',20,'LT')}${complementString(`${content.actual_fee}`,27,'RT')}`)
        printer.text('-----------------------------------------------')
        printer.text(`备注：${content.remark}`)
        printer.text(`${complementString(`打印时间：${dateFormat("YYYY-mm-dd HH:MM",new Date())}`,30,'LT')}${complementString(`打印次数：${content.print_num}`,15,'RT')}`)
        printer.text(' ')
        printer.align('CT')
        printer.qrimage(`${content.order_url}`, function(err){
            console.log('image err ',err)
            printer.text(' ')
            printer.text(' ')
            printer.cut()
            printer.close();
        });
        printer.text(' ')
        console.log('end')
    })
}
// printprepayData('192.168.1.244',prepayData.content)

let hasPayData = {
    "msg_id":1,//消息ID，也就是印号，结账单不用打印印号
    "type":"print",
    "printer_type":"has_pay", //结账单
    "printer_key":"ddd",
    "content":{
        "title": '结账单',
        "shop_name":"拈江湖鸭肠火锅", //店铺名称
        "code_nice":"202003180002", //单号
        "order_id":"1", //结账号
        "time_type":"全天", //餐段
        "table":"A2",
        "user_amount":3,
        "user_name":"云收银",
        "dishes":[
            {
                "name":"测试菜品3",
                "amount":9,
                "price":"1.00",
            },
            {
                "name":"测试商品22",
                "amount":2,
                "price":"1.00", 
            }
        ],
        "day":"2020-01-17",
        "time":"15:28:04", //结账时间
        "origin_fee":"11", //小计
        "discount":"1.00", //折扣
        "actual_fee":"10",//应付金额
        "can_discount_money":"100", //可优惠金额
        "can_not_discount_money":"10", //不可优惠金额
          "vip_discount":"10", //会员优惠金额
        "pay_detail":[
            {
              'name':'美团68抵100',
              'value':'100',
            },
            {
              'name':'支付宝条码支付',
              'value':'200',
            },
        ],  
        "remark":"", //备注
        "print_num":"2", //打印次数
    }
}


async function printhasPayData (ip,data) {
    // let a = await testBit(ip,4000)
    // if(!a){return false}
    const device = new escpos.Network(ip, 9101);
    const printer = new escpos.Printer(device);
    let content = data.content
    console.log('printhasPayData start')
    let amount = 0

    device.open((error) => {
        if (error) {
            printer.close();
            console.log('return new Promise - error:', error);
        }
        printer.font('A')
        printer.align('CT')
        printer.style('BU')
        printer.size(2, 2)
        printer.text(`${content.shop_name}`)
        printer.text(`${content.title}`)
        printer.align('LT')
        printer.size(1, 1)
        printer.text(`${complementString(`日期：${content.day}`,30,'LT')}${complementString(`班别：${content.time_type}`,15,'LT')}`)
        printer.text(`${complementString(`单号：${content.code_nice}`,30,'LT')}${complementString(`台号：${content.table}`,15,'LT')}`)
        printer.text(`${complementString(`开单：${content.user_name}`,30,'LT')}${complementString(`人数：${content.user_amount}`,15,'LT')}`)
        printer.text(`${complementString(`收银：${content.user_name}`,20,'LT')}${complementString(`结账时间：${content.time}`,25,'RT')}`)
        
        // printer.text(`${complementString(`时间：${content.day}`,47,'LT')} `)
        printer.text(`结账号：${content.order_id}`)
        printer.text('-----------------------------------------------')
        printer.text(`${complementString('商品名称',25,'LT')}${complementString('单价',7,'RT')}${complementString('数量',5,'RT')}${complementString('小计',7,'RT')}`)
        content.dishes.map((item,index) => {
            printer.text(`${complementString(`${item.name}`,25,'LT')}${complementString(`${item.price}`,7,'RT')}${complementString(`${item.amount}`,5,'RT')}${complementString(`${(item.amount * parseFloat(item.price)).toFixed(1)}`,7,'RT')}`)
            amount = amount+item.amount
        })
        printer.text('-----------------------------------------------')
        printer.text(`${complementString('小计：',32,'LT')}${complementString(`${amount}`,5,'RT')}${complementString(`${content.origin_fee}`,7,'RT')}`)
        printer.text(`${complementString('折扣：',20,'LT')}${complementString(`${content.discount}`,27,'RT')}`)
        printer.text(`${complementString('应收金额：',20,'LT')}${complementString(`${content.actual_fee}`,27,'RT')}`)
        printer.align('CT')
        printer.text(`可优惠金额：${content.can_discount_money}  不可优惠金额：${content.can_not_discount_money}`)
        printer.align('LT')
        printer.text(' ')
        content.pay_detail.map((item) => {
            printer.text(`${complementString(`${item.name}`,30,'LT')}${complementString(`${item.value}`,15,'RT')}`)
        })
        printer.text('-----------------------------------------------')
        printer.text(`会员优惠金额：${content.vip_discount}`)
        printer.text('-----------------------------------------------')
        printer.text(`备注：${content.remark}`)
        printer.text(`${complementString(`打印时间：${dateFormat("YYYY-mm-dd HH:MM",new Date())}`,30,'LT')}${complementString(`打印次数：${content.print_num}`,15,'RT')}`)
        printer.text(' ')
        printer.text(' ')
        printer.cut()
        printer.close();
        console.log('end')
    })
}

// printhasPayData('192.168.137.100',hasPayData)
// console.log(`${dateFormat("YYYY-mm-dd HH:MM",new Date())}`)

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

const allData = {
    "msg_id":1,//消息ID，也就是印号
    "type":"print",
    "printer_type":"all",
    "printer_key":"ddd",
    "content":{
        "title":"点菜单",
        "shop_name":"拈江湖鸭肠火锅", //店铺名称
        "code_nice":"202003180002", //单号
        "time_type":"全天", //餐段
        "table":"A2",
        "user_amount":3,
        "user_name":"云收银",
        "dishes":[
            {
                "name":"测试菜品3",
                "amount":9,
                "remark":"", //备注
            },
            {
                "name":"测试商品22",
                "amount":2,
                "remark":"", //备注
            }
        ],
        "day":"2020-01-17",
        "time":"15:28:04",
        "total_amount":"11", //合计数量
        "print_num":"2", //打印次数
    }
}

function printallData(ip,data) {
    const device = new escpos.Network(ip, 9100);
    const printer = new escpos.Printer(device);
    let content = data.content
    console.log('printallData start')
    device.open((error) => {
        console.log('return new Promise - error:', error);
        printer.font('A')
        printer.align('CT')
        printer.style('BU')
        printer.size(2, 2)
        printer.text(' ')
        printer.text(`${content.shop_name}`)
        printer.text(`${content.title}`)
        printer.align('LT')
        printer.size(1, 1)
        printer.text(`${complementString(`日期：${content.day}`,30,'LT')}${complementString(`餐段：${content.time_type}`,15,'LT')}`)
        printer.text(`${complementString(`单号：${content.code_nice}`,30,'LT')}${complementString(`台号：${content.table}`,15,'LT')}`)
        printer.text(`${complementString(`点餐：${content.user_name}`,30,'LT')}${complementString(`人数：${content.user_amount}`,15,'LT')}`)
        printer.text('-----------------------------------------------')
        printer.text(`${complementString('菜品',32,'LT')} ${complementString('数量',6,'LT')}${complementString('备注',8,'RT')}`)
        content.dishes.map((item,index) => {
            printer.text(`${complementString(`${item.name}`,32,'LT')}${complementString(`${item.amount}`,6,'LT')}${complementString(`${item.remark ? item.remark : ''}`,8,'RT')}`)
        })
        printer.text(`${complementString('合计：',32,'LT')}${complementString(`${content.total_amount}`,6,'LT')}${complementString('',8,'RT')}`)
        printer.text('-----------------------------------------------')
        printer.text(' ')
        printer.text(`${complementString(`点餐时间：${content.day} ${content.time}`,30,'LT')}${complementString(`印号：${data.msg_id}`,15,'RT')}`)
        printer.text(`打印次数：${content.print_num}`)
        printer.text(' ')
        printer.cut()
        printer.close();
    });
}

// printallData('192.168.1.243',hasPayData)


const kitchenData = {
    "msg_id":1,//消息ID
    "type":"print",
    "print_type":"kitchen",
    "printer_key":"qq",
    "content":{
        "title":"（总单）荤菜制作单",
        "shop_name":"拈江湖鸭肠火锅",
        "code_nice":"202003180002", //单号
        "table":"A2",
        "user_amount":3,
        "user_name":"云收银",
        "day":"2020-01-17",
        "time":"15:28:04",
        "dishes":[
            {
                "name":"测试菜品3",
                "amount":9
            }
        ]
    }
}


// printkitchenData('192.168.1.244',kitchenData)

function printkitchenData(ip,data) {
    const device = new escpos.Network(ip, 9100);
    const printer = new escpos.Printer(device);
    let content = data.content
    console.log('printkitchenData start')
    device.open((error) => {
        console.log('return new Promise - error:', error);
        printer.font('A')
        printer.align('CT')
        printer.style('B')
        printer.size(2, 2)
        printer.text(`${content.shop_name}`)
        printer.text(`${content.title}`)
        printer.align('LT')
        printer.style('NORMAL')
        printer.size(1, 1)
        printer.text(`${complementString(`单号：${content.code_nice}`,30,'LT')}${complementString(`台号：${content.table}`,15,'LT')}`)
        printer.text(' ')
        printer.text('-----------------------------------------------')
        // printer.text(`${complementString('菜品',32,'LT')} ${complementString('数量',6,'LT')}${complementString('备注',8,'RT')}`)
        content.dishes.map((item,index) => {
            printer.text(`${complementString(`${item.name}`,34,'LT')}${complementString(`${item.amount}`,12,'RT')}`)
        })
        printer.text('-----------------------------------------------')
        printer.text(`${complementString(`下单 ：${content.user_name}`,45,'LT')}`)
        printer.text(`${complementString(`打印时间：${dateFormat("YYYY-mm-dd HH:MM",new Date())}`,30,'LT')}${complementString(`印号：${data.msg_id}`,15,'RT')}`)
        printer.text(' ')
        printer.cut()
        printer.close();
    });
}

function qrImageText() {
    const device = new escpos.Network(ip, 9100);
    const printer = new escpos.Printer(device);
    let content = data.content
    console.log('qrImageText start')
    device.open((error) => {
        console.log('return new Promise - error:', error);
        printer.text('image')
        printer.text('-----------------------------------------------')
        // printer.text(`${complementString('菜品',32,'LT')} ${complementString('数量',6,'LT')}${complementString('备注',8,'RT')}`)
        content.dishes.map((item,index) => {
            printer.text(`${complementString(`${item.name}`,34,'LT')} ${complementString(`${item.amount}`,12,'RT')}`)
        })
        printer.text('-----------------------------------------------')
        printer.text(`${complementString(`下单 ：${content.user_name}`,45,'LT')}`)
        printer.text(`${complementString(`打印时间：${dateFormat("YYYY-mm-dd HH:MM",new Date())}`,30,'LT')}${complementString(`印号：${data.msg_id}`,15,'RT')}`)
        printer.text(' ')
        printer.cut()
        printer.close();
    });
}

function tcpClose(ip){
    const device = new escpos.Network(ip, 9100).close;
    // const printer = new escpos.Printer(device);
    // // device.write('',(error)=>{

    // // })
    // device.open((error) => {
    //             console.log('return new Promise - error:', error);
    //             printer.text('test')
    //             printer.text('-----------------------------------------------')
    //             printer.text(' ')
    //             printer.cut()
    //             printer.close();
    //         });
    // device.close()
    // printer.close()
    // try {
    //     device.open((error) => {
    //         console.log('return new Promise - error:', error);
    //         printer.text('test')
    //         printer.text('-----------------------------------------------')
    //         printer.text(' ')
    //         printer.cut()
    //         printer.close();
    //     });
    // } catch (error) {
    //     printer.close()
    // }
    
}

// tcpClose('191.168.1.244')

// setTimeout(()=>{printprepayData('192.168.1.244',prepayData)},1000);

// setTimeout(() => {printhasPayData('192.168.1.244',hasPayData)},2000);

// setTimeout(()=>{printallData('192.168.1.244',allData)},3000);

// setTimeout(()=>{printkitchenData('192.168.137.243',kitchenData)},1000);


function testPing(ip) {
    const device = new escpos.Network(ip, 4000);
    const printer = new escpos.Printer(device);
    
    device.open((err) => {
        let a = device.write('\x1b\x76',(erra) => {
            console.log(erra)
            console.log(a)
            device.close()
        })
        
    })
    
}

// testPing('192.168.137.243')


async function testBit (ip) {
    return new Promise(
        (resolve,reject) => {
            console.log('ip',ip)
            let client = net.createConnection({port:4000,host:ip},()=>{
                client.write('\x1b\x76');
            })
            client.on('data', (data) => {
                let re = JSON.stringify(data);
                let obj = JSON.parse(re)
                if(obj.data[0] === 20 && obj.data[1] === 0 && obj.data[2] === 0 && obj.data[3] === 15){
                    resolve(true)
                    // console.log('打印机正常');
                }else{
                    resolve(false)
                    // console.log('打印机异常');
                }
                client.end();
            });
            client.on('end', () => {
                // console.log('已从服务器断开');
            });
        }
    )
}

async function test(){
    try {
        let ass = await testBit('192.168.137.243',9101);    
        console.log('ass',ass)
    } catch (error) {
        console.log('test catch')
    }
}
function aaa () {
    let client = net.createConnection({host:'192.168.137.243',port:4000},()=>{
        client.write('\x1b\x76')
    })
    client.on('data', (data) => {
        let re = JSON.stringify(data);
        let obj = JSON.parse(re)
        if(obj.data[0] === 20 && obj.data[1] === 0 && obj.data[2] === 0 && obj.data[3] === 15){
            // resolve(true)
            console.log('打印机正常');
        }else{
            // resolve(false)
            console.log('打印机异常');
        }
        client.end();
    });
    client.on('end', () => {
        console.log('已从服务器断开');
    });
}
// aaa();
// test()

// let testNewPrintData =
// [{"type":"text","text":"\u6df1\u5733\u62c8\u6c5f\u6e56(\u5742\u7530\u5e97)","align":"CT","size":"[2,2]","style":"NORMAL"},{"type":"text","text":"\u83dc\u54c1\u9500\u552e\u660e\u7ec6\u8868","align":"CT","size":"[2,2]","style":"NORMAL"},{"type":"text","text":"\u8425\u4e1a\u65e5\u671f\uff1a2020-04-30","align":"CT","size":"[2,2]","style":"NORMAL"},{"type":"text","text":"------------------------------------------------","align":"CT","size":"[2,2]","style":"NORMAL"},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u9879\u76ee","align":"LT","space":18},{"text":"\u6570\u91cf","align":"LT","space":10},{"text":"\u91d1\u989d","align":"LT","space":14},{"text":"\u91d1\u989d%","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"[\u4e09\u5927\u62db\u724c]","align":"LT","space":18}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5927\u5200\u8170\u7247(\u9650\u91cf)","align":"LT","space":18},{"text":"37","align":"LT","space":10},{"text":"812.00","align":"LT","space":14},{"text":"31.32","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u751f\u6263\u9c9c\u9e2d\u80a0(\u7279\u4ef7)","align":"LT","space":18},{"text":"103","align":"LT","space":10},{"text":"940.50","align":"LT","space":14},{"text":"36.28","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5df4\u638c\u5927\u6bdb\u809a","align":"LT","space":18},{"text":"30","align":"LT","space":10},{"text":"840.00","align":"LT","space":14},{"text":"32.40","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5408\u8ba1","align":"LT","space":18},{"text":"170","align":"LT","space":10},{"text":"2592.50","align":"LT","space":14}]},{"type":"text","text":"------------------------------------------------","align":"CT","size":"[2,2]","style":"NORMAL"},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"[\u7cbe\u9009\u8364\u83dc]","align":"LT","space":18}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u706b\u817f\u80a0","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"32.00","align":"LT","space":14},{"text":"9.38","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u80a5\u7f8a\u5377","align":"LT","space":18},{"text":"4","align":"LT","space":10},{"text":"58.00","align":"LT","space":14},{"text":"17.01","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u6781\u54c1\u8017\u513f\u9c7c","align":"LT","space":18},{"text":"1","align":"LT","space":10},{"text":"29.00","align":"LT","space":14},{"text":"8.50","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u9c9c\u6253\u725b\u8089\u4e38","align":"LT","space":18},{"text":"4","align":"LT","space":10},{"text":"78.00","align":"LT","space":14},{"text":"22.87","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u80a5\u725b\u5377","align":"LT","space":18},{"text":"3","align":"LT","space":10},{"text":"84.00","align":"LT","space":14},{"text":"24.63","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5929\u5473\u5c0f\u9999\u80a0","align":"LT","space":18},{"text":"1","align":"LT","space":10},{"text":"18.00","align":"LT","space":14},{"text":"5.28","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u9c9c\u6253\u624b\u5de5\u9c7c\u4e38","align":"LT","space":18},{"text":"1","align":"LT","space":10},{"text":"20.00","align":"LT","space":14},{"text":"5.87","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u8106\u5ae9\u9c7c\u76ae","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"22.00","align":"LT","space":14},{"text":"6.45","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5408\u8ba1","align":"LT","space":18},{"text":"18","align":"LT","space":10},{"text":"341.00","align":"LT","space":14}]},{"type":"text","text":"------------------------------------------------","align":"CT","size":"[2,2]","style":"NORMAL"},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"[\u7cbe\u9009\u7d20\u83dc]","align":"LT","space":18}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u91d1\u9488\u83c7","align":"LT","space":18},{"text":"3","align":"LT","space":10},{"text":"12.00","align":"LT","space":14},{"text":"6.98","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u83cc\u83c7\u62fc\u76d8","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"40.00","align":"LT","space":14},{"text":"23.26","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u70b8\u8150\u7af9","align":"LT","space":18},{"text":"4","align":"LT","space":10},{"text":"12.00","align":"LT","space":14},{"text":"6.98","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u7d20\u83dc\u62fc\u76d8","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"16.00","align":"LT","space":14},{"text":"9.30","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u624b\u5de5\u82d5\u7c89","align":"LT","space":18},{"text":"4","align":"LT","space":10},{"text":"10.00","align":"LT","space":14},{"text":"5.81","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u6d77\u5e26\u82bd","align":"LT","space":18},{"text":"1","align":"LT","space":10},{"text":"12.00","align":"LT","space":14},{"text":"6.98","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u9c9c\u85d5\u7247","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"16.00","align":"LT","space":14},{"text":"9.30","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5c71\u836f","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"14.00","align":"LT","space":14},{"text":"8.14","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u8702\u7a9d\u8c46\u8150","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"12.00","align":"LT","space":14},{"text":"6.98","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u767d\u7389\u841d\u535c","align":"LT","space":18},{"text":"1","align":"LT","space":10},{"text":"6.00","align":"LT","space":14},{"text":"3.49","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5c0f\u6728\u8033","align":"LT","space":18},{"text":"1","align":"LT","space":10},{"text":"12.00","align":"LT","space":14},{"text":"6.98","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5a03\u5a03\u83dc","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"10.00","align":"LT","space":14},{"text":"5.81","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5408\u8ba1","align":"LT","space":18},{"text":"26","align":"LT","space":10},{"text":"172.00","align":"LT","space":14}]},{"type":"text","text":"------------------------------------------------","align":"CT","size":"[2,2]","style":"NORMAL"},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"[\u5176\u5b83]","align":"LT","space":18}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u81ea\u52a9\u8c03\u5473\u789f","align":"LT","space":18},{"text":"115","align":"LT","space":10},{"text":"530.00","align":"LT","space":14},{"text":"62.72","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u8336\u4f4d\u8d39","align":"LT","space":18},{"text":"116","align":"LT","space":10},{"text":"315.00","align":"LT","space":14},{"text":"37.28","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5408\u8ba1","align":"LT","space":18},{"text":"231","align":"LT","space":10},{"text":"845.00","align":"LT","space":14}]},{"type":"text","text":"------------------------------------------------","align":"CT","size":"[2,2]","style":"NORMAL"},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"[\u9152\u6c34\u996e\u6599]","align":"LT","space":18}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u96ea\u82b1","align":"LT","space":18},{"text":"3","align":"LT","space":10},{"text":"30.00","align":"LT","space":14},{"text":"8.50","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u6b6a\u5634\u90ce","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"40.00","align":"LT","space":14},{"text":"11.33","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5927\u552f\u6021","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"40.00","align":"LT","space":14},{"text":"11.33","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u767e\u5a01","align":"LT","space":18},{"text":"3","align":"LT","space":10},{"text":"36.00","align":"LT","space":14},{"text":"10.20","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u52a0\u591a\u5b9d","align":"LT","space":18},{"text":"5","align":"LT","space":10},{"text":"30.00","align":"LT","space":14},{"text":"8.50","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u6930\u6c41","align":"LT","space":18},{"text":"11","align":"LT","space":10},{"text":"40.00","align":"LT","space":14},{"text":"11.33","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u77ff\u6cc9\u6c34","align":"LT","space":18},{"text":"3","align":"LT","space":10},{"text":"9.00","align":"LT","space":14},{"text":"2.55","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u96ea\u78a7","align":"LT","space":18},{"text":"7","align":"LT","space":10},{"text":"30.00","align":"LT","space":14},{"text":"8.50","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5c0f\u552f\u6021","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"14.00","align":"LT","space":14},{"text":"3.97","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u53ef\u4e50","align":"LT","space":18},{"text":"6","align":"LT","space":10},{"text":"20.00","align":"LT","space":14},{"text":"5.67","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u96ea\u78a7\uff08\u5927\uff09","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"24.00","align":"LT","space":14},{"text":"6.80","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u6c5f\u5c0f\u767d","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"40.00","align":"LT","space":14},{"text":"11.33","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5408\u8ba1","align":"LT","space":18},{"text":"48","align":"LT","space":10},{"text":"353.00","align":"LT","space":14}]},{"type":"text","text":"------------------------------------------------","align":"CT","size":"[2,2]","style":"NORMAL"},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"[\u5341\u4e8c\u5fc5\u70b9]","align":"LT","space":18}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u73b0\u6740\u7f8e\u86d9","align":"LT","space":18},{"text":"8","align":"LT","space":10},{"text":"208.00","align":"LT","space":14},{"text":"6.69","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u6c5f\u6e56\u751f\u9c7c\u7247","align":"LT","space":18},{"text":"1","align":"LT","space":10},{"text":"22.00","align":"LT","space":14},{"text":"0.71","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u723d\u8106\u820c\u5c16","align":"LT","space":18},{"text":"8","align":"LT","space":10},{"text":"140.00","align":"LT","space":14},{"text":"4.50","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u591a\u8089\u5348\u9910\u8089","align":"LT","space":18},{"text":"4","align":"LT","space":10},{"text":"80.00","align":"LT","space":14},{"text":"2.57","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5343\u5c42\u809a","align":"LT","space":18},{"text":"25","align":"LT","space":10},{"text":"598.00","align":"LT","space":14},{"text":"19.23","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u9c9c\u5207\u725b\u8089","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"56.00","align":"LT","space":14},{"text":"1.80","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u9ebb\u8fa3\u725b\u8089","align":"LT","space":18},{"text":"7","align":"LT","space":10},{"text":"104.00","align":"LT","space":14},{"text":"3.35","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u7f51\u7ea2\u87f9\u8089\u68d2","align":"LT","space":18},{"text":"4","align":"LT","space":10},{"text":"72.00","align":"LT","space":14},{"text":"2.32","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u624b\u6253\u9999\u83dc\u8089\u4e38","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"38.00","align":"LT","space":14},{"text":"1.22","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u79d8\u5236\u867e\u6ed1","align":"LT","space":18},{"text":"20","align":"LT","space":10},{"text":"560.00","align":"LT","space":14},{"text":"18.01","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u849c\u9999\u677e\u677f\u8089","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"26.00","align":"LT","space":14},{"text":"0.84","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u6781\u54c1\u9e2d\u8840","align":"LT","space":18},{"text":"17","align":"LT","space":10},{"text":"192.00","align":"LT","space":14},{"text":"6.18","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5ae9\u725b\u8089","align":"LT","space":18},{"text":"36","align":"LT","space":10},{"text":"868.00","align":"LT","space":14},{"text":"27.92","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u9ec4\u5589","align":"LT","space":18},{"text":"5","align":"LT","space":10},{"text":"145.00","align":"LT","space":14},{"text":"4.66","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5408\u8ba1","align":"LT","space":18},{"text":"141","align":"LT","space":10},{"text":"3109.00","align":"LT","space":14}]},{"type":"text","text":"------------------------------------------------","align":"CT","size":"[2,2]","style":"NORMAL"},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"[\u7279\u8272\u7d20\u83dc]","align":"LT","space":18}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5e72\u9ec4\u74dc","align":"LT","space":18},{"text":"4","align":"LT","space":10},{"text":"14.00","align":"LT","space":14},{"text":"18.92","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u97ad\u70ae\u7b0b","align":"LT","space":18},{"text":"1","align":"LT","space":10},{"text":"12.00","align":"LT","space":14},{"text":"16.22","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5e72\u8d21\u83dc","align":"LT","space":18},{"text":"4","align":"LT","space":10},{"text":"48.00","align":"LT","space":14},{"text":"64.86","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5408\u8ba1","align":"LT","space":18},{"text":"9","align":"LT","space":10},{"text":"74.00","align":"LT","space":14}]},{"type":"text","text":"------------------------------------------------","align":"CT","size":"[2,2]","style":"NORMAL"},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"[\u73b0\u635e\u70ed\u5364]","align":"LT","space":18}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5364\u65e0\u9aa8\u9e2d\u638c","align":"LT","space":18},{"text":"5","align":"LT","space":10},{"text":"100.00","align":"LT","space":14},{"text":"38.17","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5364\u732a\u8e44","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"28.00","align":"LT","space":14},{"text":"10.69","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5364\u51e4\u722a","align":"LT","space":18},{"text":"7","align":"LT","space":10},{"text":"108.00","align":"LT","space":14},{"text":"41.22","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5364\u80a5\u80a0","align":"LT","space":18},{"text":"1","align":"LT","space":10},{"text":"26.00","align":"LT","space":14},{"text":"9.92","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5408\u8ba1","align":"LT","space":18},{"text":"15","align":"LT","space":10},{"text":"262.00","align":"LT","space":14}]},{"type":"text","text":"------------------------------------------------","align":"CT","size":"[2,2]","style":"NORMAL"},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"[\u5c0f\u5403\u4e3b\u98df]","align":"LT","space":18}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u7ea2\u7cd6\u7ccd\u7c91","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"16.00","align":"LT","space":14},{"text":"15.38","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u7c73\u996d","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"4.00","align":"LT","space":14},{"text":"3.85","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u7ea2\u7cd6\u51b0\u7c89","align":"LT","space":18},{"text":"3","align":"LT","space":10},{"text":"12.00","align":"LT","space":14},{"text":"11.54","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u51b0\u6c64\u5706","align":"LT","space":18},{"text":"1","align":"LT","space":10},{"text":"10.00","align":"LT","space":14},{"text":"9.62","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u73b0\u70b8\u9165\u8089","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"22.00","align":"LT","space":14},{"text":"21.15","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u4e09\u8272\u9762","align":"LT","space":18},{"text":"2","align":"LT","space":10},{"text":"20.00","align":"LT","space":14},{"text":"19.23","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u8334\u9999\u5c0f\u6cb9\u6761","align":"LT","space":18},{"text":"3","align":"LT","space":10},{"text":"20.00","align":"LT","space":14},{"text":"19.23","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5408\u8ba1","align":"LT","space":18},{"text":"15","align":"LT","space":10},{"text":"104.00","align":"LT","space":14}]},{"type":"text","text":"------------------------------------------------","align":"CT","size":"[2,2]","style":"NORMAL"},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"[\u9505\u5e95\u5473\u789f]","align":"LT","space":18}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u725b\u6cb9\u7ea2\u6c64\u9505","align":"LT","space":18},{"text":"7","align":"LT","space":10},{"text":"476.00","align":"LT","space":14},{"text":"9.22","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5168\u756a\u8304\u9505","align":"LT","space":18},{"text":"25","align":"LT","space":10},{"text":"1125.00","align":"LT","space":14},{"text":"21.79","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u53cd\u9e33\u9e2f\u9505(\u83cc\u6c64\u756a\u8304)","align":"LT","space":18},{"text":"25","align":"LT","space":10},{"text":"1125.00","align":"LT","space":14},{"text":"21.79","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u83cc\u6c64\u7ea2\u6cb9\u9e33\u9e2f\u9505","align":"LT","space":18},{"text":"9","align":"LT","space":10},{"text":"406.00","align":"LT","space":14},{"text":"7.87","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u756a\u8304\u7ea2\u6cb9\u9e33\u9e2f\u9505","align":"LT","space":18},{"text":"18","align":"LT","space":10},{"text":"1044.00","align":"LT","space":14},{"text":"20.22","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5168\u83cc\u6c64\u9505","align":"LT","space":18},{"text":"19","align":"LT","space":10},{"text":"986.00","align":"LT","space":14},{"text":"19.10","align":"RT","space":0}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u5408\u8ba1","align":"LT","space":18},{"text":"103","align":"LT","space":10},{"text":"5162.00","align":"LT","space":14}]},{"type":"text","text":"------------------------------------------------","align":"CT","size":"[2,2]","style":"NORMAL"},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"[\u9500\u552e\u5408\u8ba1]","align":"LT","space":18},{"text":"776","align":"LT","space":10},{"text":"13014.50","align":"LT","space":10}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"\u2014\u6298\u6263","align":"LT","space":28},{"text":"6663.90","align":"LT","space":10}]},{"type":"table","size":"[1,1]","style":"B","align":"LT","data":[{"text":"=\u5b9e\u6536\u91d1\u989d","align":"LT","space":28},{"text":"6350.60","align":"LT","space":10}]}]
// let testNewPrintData = [
//     {
//         type:'qrcode',
//         text:'http://www.test.com',
//         align:'CT',
//     }
// ]

let testNewPrintData = [{"type":"text","text":"\u6df1\u5733\u62c8\u6c5f\u6e56","align":"CT","size":[2,2],"style":"B"},{"number":1,"type":"feed"},{"type":"text","text":"\u6362\u684c\u5355","align":"CT","size":[2,2],"style":"B"},{"number":1,"type":"feed"},{"type":"text","text":"\u5355\u53f7\uff1a MFO20200423361733","align":"LT","size":[1,2],"style":"B"},{"type":"text","text":"\u53f0\u4f4d19\u6362\u5230\uff1a20","align":"LT","size":[1,2],"style":"B"},{"type":"text","text":"====================================================","align":"LT","size":[1,2],"style":"B"},{"type":"text","text":"\u64cd\u4f5c\uff1a\u6536\u94f6","align":"RT","size":[1,2],"style":"B"},{"number":1,"type":"feed"},{"number":1,"type":"feed"},{"type":"table","size":[1,2],"style":"B","align":"LT","data":[{"text":"\u6253\u5370\u65f6\u95f42020-04-23 11:15:07","align":"LT","space":30},{"text":"\u5370\u53f7:S202004230003","align":"RT","space":17}]}];
function printNewData (ip,data) {
    const device = new escpos.Network(ip, 9100);
    const printer = new escpos.Printer(device);

    device.open((error) => {
        data.map((itemA) => {
            printDataHandle(printer,itemA)
        })
        printer.feed(2)
        setTimeout(()=> {
            printer.cut()
            printer.close();
        },300)
        
    });
}


function printDataHandle (printer,data){
    return printDataHandleData[data.type](printer,data)
}

var printDataHandleData = {
    'text': function(printer,data){
        
        printer.align(`${data.align}`)
        printer.style(`${data.style}`)
        printer.size(data.size[0],data.size[1])
        printer.text(`${data.text}`)
        
    },
    'table': function(printer,data){
        let text = ''
        data.data.map((item) => {
            text += `${complementString(`${item.text}`,item.space,`${item.align}`)}`
        })
        printer.size(data.size[0],data.size[1])
        printer.align(`${data.align}`)
        printer.style(`${data.style}`)
        printer.text(`${text}`)
    },
    'feed':  function(printer,data){
        printer.feed(`${data.number}`)
    },
    'qrcode':  function(printer,data){
        console.log('qrcode')
        printer.align(`${data.align}`)
        printer.qrimage(`${data.text}`)
        printer.text('')
        printer.text('')
    },
}

// let testaaa = [{title:'sss'}]
// console.log(testaaa.__proto__ )

// printNewData('192.168.137.243',testNewPrintData)

function testFontSize (ip) {
    const device = new escpos.Network(ip, 9100);
    const printer = new escpos.Printer(device);
    // let content = data.content
    console.log('printallData start')
    device.open((error) => {
        console.log('return new Promise - error:', error);
        printer.text(' ')
        // device.write('\x1b\x21\x10')
        // device.write('\x1b\x21\x20')
        // device.write('\x1c\x21\x04')
        // device.write('\x1c\x21\x08')
        device.write('\x1c\x26')
        device.write('\x1b\x4d\x00')
        device.write('\x1b\x52\x15')
        // device.write('\x1b\x4d\x48')
        setTimeout(()=> {
            
            printer.text('测试行数量aaabbbccc')
            printer.pureText('测试行数量aaabbbccc')
            printer.feed(2)
            printer.cut()
            printer.close();
        },200)
        // printer.font('C')
        
        // device.write('\x1b\x21\x08')
        
        // printer.font('A')
        // printer.text('测试行数量测试行数量测试行数量测试行数量测试行数量测试行数量')
        // printer.font('B')
        // printer.text('测试行数量测试行数量测试行数量测试行数量测试行数量测试行数量')
        // printer.font('B')
        // printer.align('CT')
        // printer.style('NORMAL')
        // printer.size(1, 1)
        // printer.text('这是1*1 style NORMAL')
        // printer.text('测试行数量测试行数量测试行数量测试行数量测试行数量测试行数量')
        // printer.font('B')
        // printer.size(1, 1)
        // printer.text('这是1*1 style NORMAL')
        // printer.text('测试行数量测试行数量测试行数量测试行数量测试行数量测试行数量')
        // printer.font('C')
        // printer.size(1, 1)
        // printer.text('这是1*1 style NORMAL')
        // printer.text('测试行数量测试行数量测试行数量测试行数量测试行数量测试行数量')
        
        // printer.size(2, 2)
        // printer.text('这是2*2 style NORMAL')
        // printer.text('测试行数量测试行数量测试行数量测试行数量测试行数量测试行数量')
        // printer.size(1, 1)
        // printer.style('B')
        // printer.text('这是1*1 style B')
        // printer.text('测试行数量测试行数量测试行数量测试行数量测试行数量测试行数量')
        // printer.size(2, 2)
        // printer.style('NORMAL')
        // printer.text('这是2*2 style NORMAL')
        // printer.text('测试行数量测试行数量测试行数量测试行数量测试行数量测试行数量')
        // printer.style('B')
        // printer.text('这是2*2 style B')
        // printer.text('测试行数量测试行数量测试行数量测试行数量测试行数量测试行数量'通
        // printer.font('B')
        // printer.style('NORMAL')
        // printer.size(1, 1)
        // printer.text('这是1*1 style NORMAL')
        // printer.text('测试行数量测试行数量测试行数量测试行数量测试行数量测试行数量')
        // printer.size(1, 1)
        // printer.style('B')
        // printer.text('这是1*1 style B')
        // printer.text('测试行数量测试行数量测试行数量测试行数量测试行数量测试行数量')
        // printer.size(2, 2)
        // printer.style('NORMAL')
        // printer.text('这是2*2 style NORMAL')
        // printer.text('测试行数量测试行数量测试行数量测试行数量测试行数量测试行数量')
        // printer.style('B')
        // printer.text('这是2*2 style B')
        // printer.text('测试行数量测试行数量测试行数量测试行数量测试行数量测试行数量')
        // printer.size(3, 3)
        // printer.text('这是3*3')
        // printer.text('测试行数量测试行数量测试行数量测试行数量')
        // printer.size(4, 4)
        // printer.text('这是4*4')
        // printer.text('测试行数量测试行数量')
        // printer.text('---- feed 3')
        // printer.feed(3)
        // printer.text('---- feed 2')
        // printer.feed(2)
        // printer.text('---- feed 1')
        // printer.feed(1)
        // printer.size(2,2)
        // printer.text('---- feed 3')
        // printer.feed(3)
        // printer.text('---- feed 2')
        
        // printer.text('---- feed 1')
        // printer.feed(1)
        
    });
}
// testFontSize('192.168.137.243')


function printImages (ip) {
    
    const device = new escpos.Network(ip, 9100);
    const printer = new escpos.Printer(device);
    const tux = path.join(__dirname, '666.png');
    console.log('tux',tux)
    
    escpos.Image.load(tux, function(image){
        // console.log('image',image)
        device.open(function(){
      
          printer.align('lt')
                 .image(image, 'D24')
                 .then(() => { 
                    printer.cut().close(); 
                 });
      
          // OR non-async .raster(image, "mode") : printer.text("text").raster(image).cut().close();
      
        });
      
      });
}

printImages('192.168.137.243')