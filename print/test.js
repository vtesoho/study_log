const print = require("./print")
const updataServer = require("./server")
const escpos = require('escpos');
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

// const cluster = require('cluster');

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

function printprepayData (ip,content) {
    const device = new escpos.Network(ip, 9100);
    const printer = new escpos.Printer(device);
    
    console.log('start')
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
        // printer.tableCustom([
        //   {text:`序号`,align:"LEFT",width:0.10},
        //   {text:`菜名`,align:"LEFT",width:0.30},
        //   {text:`数量`,align:"LEFT",width:0.10},
        //   {text:`价格`,align:"RIGHT",width:0.15},
        // ])
        content.dishes.map((item,index) => {
        // printer.tableCustom([
        //   {text:`${index}`,align:"LEFT",width:0.10},
        //   {text:`${item.name}`,align:"LEFT",width:0.30},
        //   {text:`${item.amount}`,align:"LEFT",width:0.10},
        //   {text:`${item.price}`,align:"RIGHT",width:0.15},
        // ])
            printer.text(`${complementString(`${item.name}`,24,'LT')} ${complementString(`${item.price}`,8,'RT')} ${complementString(`${item.amount}`,4,'RT')} ${complementString(`${(item.amount * parseFloat(item.price)).toFixed(1)}`,8,'RT')}`)
        })
        printer.text('-----------------------------------------------')
        printer.text(`${complementString('小计：',20,'LT')}${complementString(`${content.origin_fee}`,27,'RT')}`)
        printer.text(`${complementString('折扣：',20,'LT')}${complementString(`${content.discount}`,27,'RT')}`)
        printer.text(`${complementString('应收金额：',20,'LT')}${complementString(`${content.actual_fee}`,27,'RT')}`)
        printer.text('-----------------------------------------------')
        printer.text(`备注：${content.remark}`)
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


function printhasPayData (ip,content) {
    const device = new escpos.Network(ip, 9100);
    const printer = new escpos.Printer(device);
    
    console.log('printhasPayData start')
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
        printer.text(`${complementString('商品名称',24,'LT')} ${complementString('单价',8,'RT')} ${complementString('数量',4,'RT')} ${complementString('小计',8,'RT')}`)
        // printer.tableCustom([
        //   {text:`序号`,align:"LEFT",width:0.10},
        //   {text:`菜名`,align:"LEFT",width:0.30},
        //   {text:`数量`,align:"LEFT",width:0.10},
        //   {text:`价格`,align:"RIGHT",width:0.15},
        // ])
        content.dishes.map((item,index) => {
        // printer.tableCustom([
        //   {text:`${index}`,align:"LEFT",width:0.10},
        //   {text:`${item.name}`,align:"LEFT",width:0.30},
        //   {text:`${item.amount}`,align:"LEFT",width:0.10},
        //   {text:`${item.price}`,align:"RIGHT",width:0.15},
        // ])
            printer.text(`${complementString(`${item.name}`,24,'LT')} ${complementString(`${item.price}`,8,'RT')} ${complementString(`${item.amount}`,4,'RT')} ${complementString(`${(item.amount * parseFloat(item.price)).toFixed(1)}`,8,'RT')}`)
        })
        printer.text('-----------------------------------------------')
        printer.text(`${complementString('小计：',20,'LT')}${complementString(`${content.origin_fee}`,27,'RT')}${complementString(`${content.actual_fee}`,27,'RT')}`)
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
        printer.text(`${content.vip_discount}`)
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

// printhasPayData('192.168.1.244',hasPayData.content)
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
        // printer.tableCustom([
        //   {text:`${index}`,align:"LEFT",width:0.10},
        //   {text:`${item.name}`,align:"LEFT",width:0.30},
        //   {text:`${item.amount}`,align:"LEFT",width:0.10},
        //   {text:`${item.price}`,align:"RIGHT",width:0.15},
        // ])
            printer.text(`${complementString(`${item.name}`,32,'LT')}${complementString(`${item.amount}`,6,'LT')}${complementString(`${item.remark}`,8,'RT')}`)
        })
        printer.text(`${complementString('合计： ',32,'LT')}${complementString(`${content.total_amount}`,6,'LT')}${complementString(` `,8,'RT')}`)
        printer.text('-----------------------------------------------')
        printer.text(' ')
        printer.text(`${complementString(`点餐时间：${content.day} ${content.time}`,25,'LT')}${complementString(`印号：${data.msg_id}`,20,'RT')}`)
        printer.text(`打印次数：${content.print_num}`)
        printer.text(' ')
        printer.cut()
        printer.close();
    });
}

// printallData('192.168.1.244',hasPayData)


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
        printer.style('BU')
        printer.size(2, 2)
        printer.text(`${content.shop_name}`)
        printer.text(`${content.title}`)
        printer.align('LT')
        printer.size(1, 1)
        printer.text(`${complementString(`单号：${content.code_nice}`,30,'LT')}${complementString(`台号：${content.table}`,15,'LT')}`)
        printer.text(' ')
        printer.text('-----------------------------------------------')
        // printer.text(`${complementString('菜品',32,'LT')} ${complementString('数量',6,'LT')}${complementString('备注',8,'RT')}`)
        content.dishes.map((item,index) => {
        // printer.tableCustom([
        //   {text:`${index}`,align:"LEFT",width:0.10},
        //   {text:`${item.name}`,align:"LEFT",width:0.30},
        //   {text:`${item.amount}`,align:"LEFT",width:0.10},
        //   {text:`${item.price}`,align:"RIGHT",width:0.15},
        // ])
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