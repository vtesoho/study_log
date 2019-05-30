方案(redux+flutter_redux)

## 目录结构
按需在module目录添加子目录，尽量归类
```
|-- store
  |-- app
    |-- AppState.dart
  |-- module
    |-- message
      |-- action.dart
      |-- reducer.dart
      |-- state.dart
  |-- index.dart  
```

## 定义redux模块

1. 第一步定义模块 state.dart
```dart
class MessageState {
  int tabbarFollow;
  //...可定义多个
  
  MessageState({
    this.tabbarFollow,
    //...可定义多个
  });

  //初始化的值，可更好的根据数值来构建build
  factory MessageState.init() {
    return new MessageState(
      tabbarFollow: 0,
      //...可定义多个
    );
  }
}
```

2. 第二步定义action.dart
```dart
//这个动作是修改tabbar上面关注红点状态
class SetTabbarFollow {
  final int tabbarFollow;
  SetTabbarFollow({@required this.tabbarFollow});
}
```

3. 第三步定义 reducer.dart
```dart
final messageStateReducer = combineReducers<MessageState>([
  TypedReducer<MessageState, SetTabbarFollow>(_setTabbarFollow),
  //...可定义多个
]);

MessageState _setTabbarFollow(MessageState state, SetTabbarFollow action) {
  state.tabbarFollow = action.tabbarFollow;
  return state;
}
```

4. 第四步 定义AppState.dart

这个文件一般是添加自己的状态模块，不要修改其它人的模块

```dart
//引用相应模块
import '../module/message/state.dart';
import '../module/message/reducer.dart';
class AppState {
  final MessageState messageState;
  //...可定义多个

  AppState({
    this.messageState,
    //...可定义多个
  });

  factory AppState.init() {
    return AppState(
      messageState: MessageState.init(),
      //...可定义多个
    );
  }
}

AppState appReducer(AppState state, dynamic action) => new AppState(
      messageState: messageStateReducer(state.messageState, action),
      //...可定义多个
    );

```


## 页面中使用redux的方法

#### 在widget里使用
根据状态值自动重建build,不在需要去setStete，这里return的是一个widget，widget里面根据交互动作可以执行action来修改值

引用文件
```dart
import 'package:shauchi_app/store/app/AppState.dart';
import 'package:flutter_redux/flutter_redux.dart';

//如果不需要修改状态，可以不引用此文件
import 'package:shauchi_app/store/module/message/action.dart';

```
widget中

```dart
StoreBuilder<AppState>(builder: (context, store) {
  print('红点状态  ${store.state.messageState.tabbarFollow}'); //获取值
  store.dispatch(SetTabbarFollow(tabbarFollow: 0)); //通过dispatch修改
  return redDot(store.state.messageState.tabbarFollow);
})
```

#### 在方法里使用
1. 第一步引入文件
```dart
import 'package:shauchi_app/store/index.dart';
//你想要修改状态模块的action文件
import 'package:shauchi_app/store/module/message/action.dart';
```
2. 第二步在要使用的页面里添加这个方法
```dart
CreateStore().getStore()?.dispatch(SetTabbarFollow(tabbarFollow: 0));
```



## 长连接下行数据处理

lib/components/websocket/analyzeData.dart

这个文件是处理服务器返回数据并写入状态的文件。已经实例化store，根据服务器下行的key值添加case就可以处理数据了。
```dart
  switchData(key,value){
    switch (key) {
      case 'test': //测试
        print('要执行的 test $value');
        break;
      case 'tabbarFollow': //tabbarFollow 红点
        store.dispatch(SetTabbarFollow(tabbarFollow: value));
        print('要执行的 $value');
        break;
    }
  }
```
