'use strict';
// nmap -sn 192.168.1.1-255 //扫描网段
// nmap -p 9100 192.168.1.1 //扫描当前ip的端口
//sudo nmap -sP -PT 192.168.1.243 |grep "MAC Address: .* (Unknown)" | awk '{print $3}' //根据ip获取当前mac地址



const util = require('util');
const exec = util.promisify(require('child_process').exec);
const jsonWrite = require('./printUtil')
const net = require('net');
let process = require('child_process');
// process.exec('nmap -sn 192.168.1.1-254',function(err,str1,str2) {
  
//   console.log(err)
//   if(err){
//     // ((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}
//     console.log(err)
//     return;
//   }
//   // let patt = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/
//   patt.test(srt1, () => {
    
//   })
//   srt1.match(/((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/)
  
//   console.log(str1)
//   console.log(str2)
// })
//搜索本地并上报给服务器
exports.Start = async() =>{
  let iptext = await getIp();
  console.log('iptext',iptext)
  const { stdout, stderr } = await exec(iptext)
  // console.log(stdout)
  if(stderr){
    // console.log('stderr:', stderr);
    return false
  }else{
    let printL =  await searchIP(stdout)

    return printL
  }
}

//获取当前ip
async function getIp(){
  const { stdout, stderr } = await exec(`ifconfig eth0|grep "inet "|awk '{print $2}'`)
  console.log('ip',ip)
  if(stderr){
    // console.log('stderr:', stderr);
    return
  }else{
    if(stdout){
      let arr = stdout.trim().split('.')
      arr.pop()
      // console.log(arr.join('.'))
      let lsText = arr.join('.')
      return `nmap -sn ${lsText}.1-255`
    }
  }
}

function unique (arr) {
  return Array.from(new Set(arr))
}

async function searchIP (text){
  // let str1 = `Starting Nmap 7.40 ( https://nmap.org ) at 2020-02-21 02:41 UTC
  // Nmap scan report for 192.168.1.1
  // Host is up (0.00092s latency).
  // Nmap scan report for 192.168.1.100
  // Host is up (0.0050s latency).
  // Nmap scan report for 192.168.1.101
  // Host is up (0.00020s latency).
  // Nmap scan report for 192.168.1.243
  // Host is up (0.0016s latency).
  // Nmap done: 254 IP addresses (4 hosts up) scanned in 10.30 seconds
  // `
  
  let textMatch = text.match(/((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g)
  textMatch = unique(textMatch)
  let printList = []
  let printListSavePi = []
  console.log(textMatch)
  //map里面有异步就要用async.map
  await Promise.all(textMatch.map(async (item)=>{
    let a = await exports.pingPort(item)
    console.log(item,a)
    if(a){
      let ipMac = await IPSearchMac(item)
      printList.push({key:ipMac,online:true})
      printListSavePi.push({key:ipMac,ip:item})
    }
  }))
  await jsonWrite.jsonWrite(printListSavePi)
  console.log('textMatch map')
  return printList
}

exports.pingLocatPrinter = async () => {
  let printList = await jsonWrite.jsonRead()
  console.log('pingLocatPrinter printList',printList)
  let ipList = []
  await Promise.all(printList.map(async (item)=>{
    let a = await exports.pingPort(item.ip)
    console.log(item,a)
    if(a){
      ipList.push({key:item.key,online:true})
    }
  }))
  console.log('pingLocatPrinter')
  return ipList

}




//根据ip获取mac地址 
async function IPSearchMac(ip){
  const { stdout, stderr } = await exec(`sudo nmap -sP -PT ${ip} |grep "MAC Address: .*(Unknown)" |awk '{print $3}'`)
  if(stderr){
    console.log('stderr:', stderr)
    return false
  }else{
    if(stdout){
      return stdout.trim()
    }else{
      return false
    }
  }
}


//检查打印机状态
async function checkPrintStatus (ip) {
  return new Promise(
      (resolve,reject) => {
          let client = net.createConnection({port:4000,host:ip},()=>{
              client.write('\x1b\x76');
          })
          client.on('data', (data) => {
              console.log(data)
              let re = JSON.stringify(data);
              let obj = JSON.parse(re)
              console.log('obj',obj)
              if(obj.data[0] === 20 && obj.data[1] === 0 && obj.data[2] === 0 && obj.data[3] === 15){
                  resolve(true)
                  // console.log('打印机正常');
              }else{
                  resolve(false)
                  // console.log('打印机异常');
              }
              console.log(obj);
              client.end();
          });
          client.on('end', () => {
              // console.log('已从服务器断开');
          });
      }
  )
}

// console.log(checkPrintStatus('192.168.137.243'))

exports.pingPort = async(ip)=>{
  console.log('pingPort','ip',ip)
  return new Promise(
    (resolve,reject) => {
        try {
          let client = net.createConnection({port:4000,host:ip},()=>{
              client.write('\x1b\x76');
          })
          client.on('data', (data) => {
              let re = JSON.stringify(data);
              let obj = JSON.parse(re)
              console.log('obj',obj)
              if(obj.data[0] === 20 && obj.data[1] === 0 && obj.data[2] === 0 && obj.data[3] === 15){
                  resolve(true)
                  // console.log('打印机正常');
              }else{
                  resolve(false)
                  // console.log('打印机异常');
              }
              console.log(obj);
              client.end();
          });
          client.on('end', () => {
              // console.log('已从服务器断开');
          });
        } catch (error) {
          resolve(false)
        }
    }
  )
  // try {
      
      
      
  // } catch (error) {
  //     console.log('checkPrintStatus catch')
  //     return false
  // }
 
}


function isPortHandle(str){
  // let str1 = `Starting Nmap 7.40 ( https://nmap.org ) at 2020-02-21 03:01 UTC
  // Nmap scan report for 192.168.1.243
  // Host is up (0.00061s latency).
  // PORT     STATE SERVICE
  // 9100/tcp open  jetdirect
  
  // Nmap done: 1 IP address (1 host up) scanned in 2.27 seconds`
  let textMatch = (/(9100\/tcp.*open.*jetdirect)/g).test(str)
  return textMatch
}

// searchIP()


