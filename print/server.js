
const request = require("request");
const searchPrint = require('./search')
//搜索局域网段所有打印机。并上传打印机信息到服务器
exports.updataServer = async () => {
    let printList = await searchPrint.Start();
    console.log('printList',printList)
    var url="http://siyu.shuachi.com/v1/printer/report";
    var requestData={
        shop_id:1,
        shop_password:'123456',
        printer:printList
    };
    let updata = new Promise(async (resolve, reject) => {
        let updata = await request({
            url: url,
            method: "POST",
            json: true,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: requestData
        }, function(error, response, body) {
            // console.log(response.request)
            if(error){
                reject('request error')
            }
            // console.log(error)
            // console.log(body)
            if (!error && response.statusCode == 200) {
                console.log(body) // 请求成功的处理逻辑
                if(body.code === 1){
                    console.log(true)
                    resolve(true)
                }else{
                    console.log(false)
                    reject('request error')
                }
                
            }else{
                reject('server error')
            }
        });
    })

    let updataRe = await updata
    if(updataRe === true){
        return true
    }else{
        return false
    }
    // updata.then((res)=>{
    //     if(res.code === 1){
    //         console.log(true)
    //         return true
    //     }else{
    //         console.log(false)
    //         return false
    //     }
    // }).catch((res) => {
    //     console.log(res)
    //     return false
    // })
    
}

exports.updataLocalPrintServer = async () => {
    let printList = await searchPrint.pingLocatPrinter();
    console.log('updataLocalPrintServer printList',printList)
    var url="http://siyu.shuachi.com/v1/printer/report";
    var requestData={
        shop_id:1,
        shop_password:'123456',
        printer:printList
    };
    let updata = new Promise(async (resolve, reject) => {
        let updata = await request({
            url: url,
            method: "POST",
            json: true,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: requestData
        }, function(error, response, body) {
            console.log('updataLocalPrintServer')
            if(error){
                reject('request error')
            }
            // console.log('updataLocalPrintServer error',error)
            // console.log('updataLocalPrintServer body',body)
            if (!error && response.statusCode == 200) {
                console.log(body) // 请求成功的处理逻辑
                if(body.code === 1){
                    console.log(true)
                    resolve(true)
                }else{
                    console.log(false)
                    reject('request error')
                }
                
            }else{
                reject('server error')
            }
        });
    })

    try {
        let updataRe = await updata
        console.log('updataRe',updataRe)
        if(updataRe === true){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
    
    
    
}


exports.printStatus = async (id,status) => {
    var url="http://siyu.shuachi.com/v1/msg/status";
    var requestData={
        shop_id:'1',
        shop_password:'123456',
        msg_id: id,
        status:status ? 1 : 0,
    };
    console.log(requestData)
    let updata = new Promise(async (resolve, reject) => {
        let updata = await request({
            url: url,
            method: "POST",
            json: true,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: requestData
        }, function(error, response, body) {
            console.log('printStatus ok')
            if(error){
                reject('request error')
            }
            // console.log(error)
            // console.log(body)
            if (!error && response.statusCode == 200) {
                console.log(body) // 请求成功的处理逻辑
                if(body.code === 1){
                    console.log(true)
                    resolve(true)
                }else{
                    console.log(false)
                    reject('request error')
                }
                
            }else{
                reject('server error')
            }
        });
    })

    try {
        let updataRe = await updata
        console.log('printStatus',updataRe)
        if(updataRe === true){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}
