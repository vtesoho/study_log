const net = require('net');

function test () {
    let client = net.createConnection({host:'192.168.137.243',port:4000},()=>{
        client.write('\x1b\x76')
    })
    client.on('data', (data) => {
        let re = JSON.stringify(data);
        let obj = JSON.parse(re)
        console.log(obj)
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

test()