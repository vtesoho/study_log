exports.jsonRead = async () =>{
    let printList = await require('./printList');
    return printList
    // console.log(printList)
}


exports.jsonWrite = async (printList)=>{
    let fs = require('fs');
    // let printList = require('./printList');
    //修改配置文件
    // printList["key"] = "test";
    // console.log(printList);
    //将修改后的配置写入文件前需要先转成json字符串格式
    var jsonstr = JSON.stringify(printList);

    //将修改后的内容写入文件
    // fs.writeFile('./printList.json', jsonstr, function(err) {
    //     if (err) {
    //         console.error(err);
    //     }else{
    //         console.log('----------修改成功-------------');
    //     }
    // });
    
    try {
        fs.writeFileSync('./printList.json', jsonstr)
        console.log('----------修改成功-------------');
        return true
    } catch (error) {
        console.log(error)
        return false

    }
}


exports.macToIp = async (mac) =>{
    console.log(mac)
    let macCase = mac.toUpperCase()
    let printList = await exports.jsonRead()
    let ip = false
    // console.log('printList',printList)
    printList.map((item)=>{
        if(item.key === macCase){
            ip = item.ip
        }
    })
    return ip
}

// jsonWrite({"key":"00:47:50:58:4a:1b","ip":"192.168.1.242"})