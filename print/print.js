'use strict';
// const escpos = require('escpos');
const escpos = require('escpos');
const searchPrint = require('./search')

// const device  = new escpos.USB(0x0416, 0x5011);
// const device  = new escpos.RawBT();
// const device  = new escpos.Network('192.168.1.243');

// const device  = new escpos.Serial('/dev/usb/lp0');


// const networkDevice = new escpos.Network('localhost');
// const networkScreen = new escpos.Screen(networkDevice);

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

//根据传入字符串和要补全的数字，返回补全的字符串
const pointLocationNum = (str,num) => {
  let re = /[\u4E00-\u9FA5]/g;
  let chineseNum = 0
  if(str.match(re)){
      chineseNum = str.match(re).length
  }
  let letterNum = str.length - chineseNum
  return (chineseNum * 2) - letterNum
}

exports.testPrint = async (ip,content)=>{
  let pingPortRe = await searchPrint.pingPort(ip)
  if(pingPortRe === false){
    return false
  }
  const device = new escpos.Network(ip, 9100);
  const printer = new escpos.Printer(device);

  return new Promise((resolve, reject) => {
    try {
      device.open((error) => {
        console.log('return new Promise - error:', error);
        if (error) {
          reject(false);
        }
        printer.font('A')
        printer.align('CT')
        printer.style('BU')
        printer.align('LT')
        printer.size(1, 1)
        printer.text(`这是测试`)
        printer.text(' ')
        printer.cut()
        printer.close();
        console.log('执行的第几次end',content)
        resolve(true);
      });
    } catch (error) {
      console.log('open print error',error)
      reject(false);
    }
    
  });
}




exports.allPrint = async (ip,content)=>{
  let pingPortRe = await searchPrint.pingPort(ip)
  if(pingPortRe === false){
    return false
  }
  const device = new escpos.Network(ip, 9100);
  const printer = new escpos.Printer(device);

  return new Promise((resolve, reject) => {
    try {
      device.open((error) => {
        console.log('return new Promise - error:', error);
        if (error) {
          reject(false);
        } else {
          resolve(true);
        }
        printer.font('A')
        printer.align('CT')
        printer.style('BU')
        printer.size(2, 2)
        printer.text(`${content.shop_name}`)
        printer.align('LT')
        printer.size(1, 1)
        printer.text(`桌号：${content.table}`)
        printer.text(`用桌人数：${content.user_amount}`)
        printer.text('-----------------------------------------------')
        printer.text(`${complementString('序号',4,'LT')} ${complementString('菜名',28,'LT')} ${complementString('数量',4,'LT')} ${complementString('价格',8,'RT')}`)
        // printer.tableCustom([
        //   {text:`序号`,align:"LEFT",width:0.10},
        //   {text:`菜名`,align:"LEFT",width:0.30},
        //   {text:`数量`,align:"LEFT",width:0.10},
        //   {text:`价格`,align:"RIGHT",width:0.15},
        // ])
        try {
          content.dishes.map((item,index) => {
            // printer.tableCustom([
            //   {text:`${index}`,align:"LEFT",width:0.10},
            //   {text:`${item.name}`,align:"LEFT",width:0.30},
            //   {text:`${item.amount}`,align:"LEFT",width:0.10},
            //   {text:`${item.price}`,align:"RIGHT",width:0.15},
            // ])
            printer.text(`${complementString(`${index}`,4,'LT')} ${complementString(`${item.name}`,28,'LT')} ${complementString(`${item.amount}`,4,'LT')} ${complementString(`${item.price}`,8,'RT')}`)
          })
        } catch (error) {
          
        }
        
        printer.align('RT')
        printer.text(`总价：${content.total}`)
        printer.align('LT')
        printer.text(' ')
        printer.text('-----------------------------------------------')
        printer.text(' ')
        printer.text(`点餐时间：${content.day} ${content.time}`)
        printer.text(' ')
        printer.text(' ')
        printer.cut()
        printer.close();
      });
    } catch (error) {
      reject(false);
    }
    
  });
}



exports.kitchenPrint = async (ip,content)=>{
  let pingPortRe = await searchPrint.pingPort(ip)
  if(pingPortRe === false){
    return false
  }
  const device = new escpos.Network(ip, 9100);
  const printer = new escpos.Printer(device);

  return new Promise((resolve, reject) => {
    try {
      device.open((error) => {
        console.log('return new Promise - error:', error);
        if (error) {
          reject(false);
        } else {
          resolve(true);
        }
        printer.font('A')
        printer.style('BU')
        printer.align('LT')
        printer.size(1, 1)
        printer.text(`桌号：${content.table}`)
        printer.text('-----------------------------------------------')
        printer.text(`${complementString('序号',4,'LT')} ${complementString('菜名',36,'LT')} ${complementString('数量',4,'LT')}`)
        // printer.tableCustom([
        //   {text:`序号`,align:"LEFT",width:0.10},
        //   {text:`菜名`,align:"LEFT",width:0.30},
        //   {text:`数量`,align:"LEFT",width:0.10},
        //   {text:`价格`,align:"RIGHT",width:0.15},
        // ])
        try {
          content.dishes.map((item,index) => {
            // printer.tableCustom([
            //   {text:`${index}`,align:"LEFT",width:0.10},
            //   {text:`${item.name}`,align:"LEFT",width:0.30},
            //   {text:`${item.amount}`,align:"LEFT",width:0.10},
            //   {text:`${item.price}`,align:"RIGHT",width:0.15},
            // ])
            printer.text(`${complementString(`${index}`,4,'LT')} ${complementString(`${item.name}`,36,'LT')} ${complementString(`${item.amount}`,4,'LT')}`)
            printer.text(' ')
          })
        } catch (error) {
          
        }
        
        
        printer.align('LT')
        printer.text('-----------------------------------------------')
        printer.text(' ')
        printer.text(`点餐时间：${content.day} ${content.time}`)
        printer.text(' ')
        printer.cut()
        printer.close();
      });
    } catch (error) {
      reject(false);
    }
    
  });
}


// export default openDraw