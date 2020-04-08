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
  console.log('testPrint pingPortRe- ',pingPortRe)
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
        // console.log('执行的第几次end',content)
        resolve(true);
      });
    } catch (error) {
      console.log('open print error',error)
      reject(false);
    }
    
  });
}


const dateFormat = (fmt, date)=> {
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


exports.allPrint = async (ip,data)=>{
  let pingPortRe = await searchPrint.pingPort(ip)
  console.log('allPrint pingPortRe- ',pingPortRe)
  if(pingPortRe === false){
    return false
  }
  const device = new escpos.Network(ip, 9100);
  const printer = new escpos.Printer(device);

  return new Promise((resolve, reject) => {
    try {
      let content = data.content
      device.open((error) => {
        console.log('return new Promise - error:', error);
        if (error) {
          reject(false);
        } else {
          resolve(true);
        }
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
        try {
          content.dishes.map((item,index) => {
            printer.text(`${complementString(`${item.name}`,32,'LT')}${complementString(`${item.amount}`,6,'LT')}${complementString(`${item.remark}`,8,'RT')}`)
          })
        } catch (error) {
          
        }
          
        printer.text(`${complementString('合计： ',32,'LT')}${complementString(`${content.total_amount}`,6,'LT')}${complementString(` `,8,'RT')}`)
        printer.text('-----------------------------------------------')
        printer.text(' ')
        printer.text(`${complementString(`点餐时间：${content.day} ${content.time}`,25,'LT')}${complementString(`印号：${data.msg_id}`,20,'RT')}`)
        printer.text(`打印次数：${content.print_num}`)
        printer.text(' ')
        printer.cut()
        printer.close();
      });
    } catch (error) {
      reject(false);
    }
    
  });
}




exports.kitchenPrint = async (ip,data)=>{
  
  let pingPortRe = await searchPrint.pingPort(ip)
  console.log('kitchenPrint pingPortRe- ',pingPortRe)
  if(pingPortRe === false){
    return false
  }
  const device = new escpos.Network(ip, 9100);
  const printer = new escpos.Printer(device);

  return new Promise((resolve, reject) => {
    try {
      let content = data.content
      device.open((error) => {
        console.log('return new Promise - error:', error);
        if (error) {
          reject(false);
        } else {
          resolve(true);
        }
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
    } catch (error) {
      reject(false);
    }
    
  });
}




exports.hasPayPrint = async (ip,data)=>{
  
  let pingPortRe = await searchPrint.pingPort(ip)
  console.log('hasPayPrint pingPortRe- ',pingPortRe)
  if(pingPortRe === false){
    return false
  }
  const device = new escpos.Network(ip, 9100);
  const printer = new escpos.Printer(device);

  return new Promise((resolve, reject) => {
    try {
      let content = data.content
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
      });
    } catch (error) {
      reject(false);
    }
    
  });
}

exports.prepayPrint = async (ip,data)=>{
  
  let pingPortRe = await searchPrint.pingPort(ip)
  console.log('prepayPrint pingPortRe- ',pingPortRe)
  if(pingPortRe === false){
    return false
  }
  const device = new escpos.Network(ip, 9100);
  const printer = new escpos.Printer(device);

  return new Promise((resolve, reject) => {
    try {
      let content = data.content
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
      });
    } catch (error) {
      reject(false);
    }
    
  });
}

// export default openDraw