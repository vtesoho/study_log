const updataServer = require("./server")
const printUtil = require("./printUtil")
const print = require("./print")
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
            name: "番茄红油鸳鸯锅",
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


exports.handleAmqpPrint= async (data) => {
    let handleData = JSON.parse(data)
    let ipa =  await printUtil.macToIp(handleData.printer_key)
    console.log('handleAmqpPrint js',handleData.type,'ip:',ipa)
    
    if(ipa === false){
        return false
    }
    
    try {
        if(handleData.printer_type === 'test'){
            let testP = await print.testPrint(ipa,testAllPrint)
            console.log('print_test',testP)
            if(testP === false){
                return false
            }
            
        }
        if(handleData.printer_type === 'prepay'){
            let allP = await print.prepayPrint(ipa,handleData)
            console.log('print_prepay',allP)
            if(allP === false){
                return false
            }
        }
        if(handleData.printer_type === 'has_pay'){
            let allP = await print.hasPayPrint(ipa,handleData)
            console.log('print_has_pay',allP)
            if(allP === false){
                return false
            }
        }
        if(handleData.printer_type === 'all'){
            let allP = await print.allPrint(ipa,handleData)
            console.log('print_all',allP)
            if(allP === false){
                return false
            }
        }
        if(handleData.printer_type === 'kitchen'){
            let kitchenP = await print.kitchenPrint(ipa,handleData)
            console.log('print_kitchen',kitchenP)
            if(kitchenP === false){
                return false
            }
            
        }
        return true
    } catch (error) {
        console.log('handle error')
        return false
    }
}
exports.handleAmqpAssist = async (data) =>{
    let handleData = JSON.parse(data)
    console.log('handleAmqpAssist js',handleData.type)
    if(handleData.type === 'report_printer' && handleData.search_type === 'all'){
        // let re = await updataServer.updataServer()
        // let re = true
        console.log('report_printer all')
        let re = await updataServer.updataServer()
        console.log('report_printer all',re)
        if(re === true){
            return true
        }else{
            return false
        }
        
    }
    console.log(' --- === ',handleData.type === 'report_printer' && handleData.search_type === 'local')
    if(handleData.type === 'report_printer' && handleData.search_type === 'local'){
        console.log('report_printer local')
        let re = await updataServer.updataLocalPrintServer()
        console.log('report_printer local',re)
        if(re === true){
            return true
        }else{
            return false
        }
        
    }



}

//all
// {
// 	"type": "print",
// 	"printer_type": "all",
// 	"printer_key": "00:47:50:58:4A:1B",
// 	"content": {
// 		"shop_name": "深圳拈江湖",
// 		"table": "B1",
// 		"user_amount": 1,
// 		"user_name": "熊猫会长",
// 		"dishes": [{
// 			"name": "番茄红油鸳鸯锅",
// 			"amount": 1,
// 			"price": "58.00"
// 		}, {
// 			"name": "生扣鲜鹅肠",
// 			"amount": 5,
// 			"price": "49.50"
// 		}, {
// 			"name": "大刀腰片",
// 			"amount": 1,
// 			"price": "29.00"
// 		}, {
// 			"name": "现炸酥肉",
// 			"amount": 1,
// 			"price": "22.00"
// 		}, {
// 			"name": "椰汁",
// 			"amount": 1,
// 			"price": "6.00"
// 		}, {
// 			"name": "加多宝",
// 			"amount": 1,
// 			"price": "6.00"
// 		}, {
// 			"name": "红糖糍粑",
// 			"amount": 1,
// 			"price": "16.00"
// 		}, {
// 			"name": "冰汤圆",
// 			"amount": 1,
// 			"price": "10.00"
// 		}, {
// 			"name": "素菜拼盘",
// 			"amount": 1,
// 			"price": "16.00"
// 		}],
// 		"day": "2020-03-15",
// 		"time": "14:48:07",
// 		"total": "775.50"
// 	}
// }


//kitchen
// {
// 	"type": "print",
// 	"print_type": "kitchen",
// 	"content": {
// 		"shop_name": "深圳拈江湖",
// 		"table": "B1",
// 		"user_amount": 1,
// 		"user_name": "熊猫会长",
// 		"day": "2020-03-15",
// 		"time": "14:48:07",
// 		"dishes": [{
// 			"name": "加多宝",
// 			"amount": 1
// 		}]
// 	},
// 	"printer_key": "00:47:50:4E:B1:3E"
// }