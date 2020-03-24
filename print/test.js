const print = require("./print")
const updataServer = require("./server")
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

complementString = (str,num,type) => {
    
    let newStr = ''
    let re = /[\u4E00-\u9FA5]/g;
    // console.log()
    let chineseNum = 0
    if(str.match(re)){
        chineseNum = str.match(re).length
    }
    let letterNum = str.length - chineseNum
    let complementNum = num - (chineseNum * 2) - letterNum
    
    console.log('complementNum',complementNum)
    // console.log('strmatch',str.match(re).length)
    
    
    for (let i = 0; i < complementNum; i++) {
        newStr = `${newStr}b`
    }
    if(type === "RT"){
        return `${newStr}${str}`
    }
    if(type === "LT"){
        return `${str}${newStr}`
    }
    return `${str}${newStr}`
    
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

const cluster = require('cluster');

testCpuNum = async () => {
    const numCPUs = require('os').cpus().length;
    console.log(numCPUs) 
    
}

testCpuNum()