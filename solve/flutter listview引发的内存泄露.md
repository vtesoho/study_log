### flutter listview引发的内存泄露

最近工作上遇到一个非常坑的问题，ios在下拉加载的时候经常挂掉，随便上滑加载一下使用内存就超过1.5G了，cpu常在80%上下。把图片去掉好像就没什么问题，以为是图片上的问题，查看flutter关于image相关源码，也没发现什么原因，以为是flutter版本问题，升级到最新版还是在这个问题。

具体原因就是因为如果你的listview里面只有一个widget，这个widget会非常非常长，或者是上拉加载的这种，就会导致里面的widget滑动到不可见的地方无法销毁，特别是图片，图片一多内存就会暴涨，就会导致整个app崩溃。

只有一种解决方案，改写你的代码，让一个item不要很长，这会这个widget滑出listview之后，就会销毁。


下面这段代码是模拟的业务上代码所写的用例，用来测试listview用的不好是否会引起内存泄露。用来警戒自己。

```dart
// 因为listview 没用好所引发的崩溃

// 把listview.builder换成listview也是一样
//ListView(
//    children: <Widget>[
//        handelItem(context,0),
//    ],
//    controller: _controller,
//),


import 'dart:async';

import 'package:flutter/material.dart';

class ListviewCrasheDemo extends StatefulWidget {
  ListviewCrasheDemo({Key key}) : super(key: key);

  @override
  _ListviewCrasheDemoState createState() => _ListviewCrasheDemoState();
}

class _ListviewCrasheDemoState extends State<ListviewCrasheDemo> {
  ScrollController _controller = ScrollController();
  List longArr = [
    'http://iph.href.lu/200x200?bg=ff0000',
    'http://iph.href.lu/200x200?bg=00ff00',
    'http://iph.href.lu/200x200?bg=0000ff',
    'http://iph.href.lu/201x201?bg=ff0000',
    'http://iph.href.lu/201x201?bg=00ff00',
    'http://iph.href.lu/201x201?bg=0000ff',
    'http://iph.href.lu/202x202?bg=ff0000',
    'http://iph.href.lu/202x202?bg=00ff00',
    'http://iph.href.lu/202x202?bg=0000ff',
    'http://iph.href.lu/203x203?bg=ff0000',
    'http://iph.href.lu/203x203?bg=00ff00',
    'http://iph.href.lu/203x203?bg=0000ff',
    'http://iph.href.lu/204x204?bg=ff0000',
    'http://iph.href.lu/204x204?bg=00ff00',
    'http://iph.href.lu/204x204?bg=0000ff',
    'http://iph.href.lu/205x205?bg=ff0000',
    'http://iph.href.lu/205x205?bg=00ff00',
    'http://iph.href.lu/205x205?bg=0000ff',
    'http://iph.href.lu/206x206?bg=ff0000',
    'http://iph.href.lu/206x206?bg=00ff00',
    'http://iph.href.lu/206x206?bg=0000ff',
  ];
  bool one = true;
  int index = 207;

  @override
  void initState() {
    _controller.addListener((){
      if(_controller.position.pixels > _controller.position.maxScrollExtent) {
        if(one){
          print('模拟上拉加载更多');
          one = false;
          longArr.add('http://iph.href.lu/${index}x$index?bg=ff0000');
          longArr.add('http://iph.href.lu/${index}x$index?bg=00ff00');
          longArr.add('http://iph.href.lu/${index}x$index?bg=0000ff');
          longArr.add('http://iph.href.lu/${index}x$index?bg=000ff0');
          longArr.add('http://iph.href.lu/${index}x$index?bg=0ffff0');
          index++;
          setState(() {});
          Timer(Duration(seconds: 1),(){
            one = true;
          });
        }
      } 
    });
    super.initState();
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('ListviewCrasheDemo'),
      ),
      body: ListView.builder(
        itemCount: 10,
        controller: _controller,
        itemBuilder: (context,index){
          return handelItem(context,index);
        },
      ),
    );
  }

  Widget handelItem(context,index){
    if(index == 0){
      return longWidget();
    }
    return Text('$index');
  }



  Widget longWidget(){
    List<Widget> children = [];
    
    longArr.forEach((f){
      children.add(
        Container(
          width: MediaQuery.of(context).size.width,
          height: 200,
          alignment: Alignment.center,
          child: Image.network(
            '$f',
          ),
        )
      );
    });
    return Column(
      children: children,
    );
  }
}
```