## 自定义toast

### 需求
1. 可自定义样式
2. 不遮挡除toast区域的操作
3. toast要能正常点击

### 实现过程
1. 方案一，用oktoast插件方案
可以自定义样式，说明上是不用context，其实是在main.dart里面把实例化的时候把context保存了，后续都是基于这个context来实现。

这插件可自定义样式，一切看着都没有问题，唯一的一个问题是不能执行事件，点击事件这些都没有效果，执行的是后面的页面上的事件，因为时间问题，没有去深入研究这问题。

2. 方案二，用plugin形式
这个方案对于一个从没写过java和object-c的童鞋还是很有挑战性的，写了一个ios的helloword之后感觉离目标还挺远。

而且以后改样式这些会非常麻烦，后还有一个需求（不同的样式）也要用到这块，很难把flutter样式传到原生，在显示到flutter里面吧。放弃。

3. 方案三，用路由打开一个新页面
这个方案的问题是，用路由的方式打开之后，这个页面不关闭是不能操作下面一层路由上的事件的，放弃。

4. 方案四，用overlay方案
这个方案算是完美的解决了现在的需求，能自定义样式，可以直接操作页面没有被覆盖的区域。

我也是模仿了oktoast的形式，在初始化的时候传入了context，后续都调用这个context，用的单例模式，后面一个打开之前需要把前面的先dismiss掉，好在现在的需求也是这样。后续有时间在慢慢优化。

### 实现主体伪代码

```dart
class Notice {
  BuildContext context;
  OverlayState overlayState;
  OverlayEntry overlayEntry;
  factory Notice({contextData}) => _getInstance(contextData);

  static Notice _instance;
  Notice._internal(contextData) {
    context = contextData;
    overlayState = Overlay.of(context);
  }
  static Notice _getInstance(contextData) {
    if (_instance == null) {
      _instance = Notice._internal(contextData);
    }
    return _instance;
  }

  show({Widget child}) async {
    if (overlayEntry != null) {
      overlayEntry.remove();
    }
    overlayEntry = OverlayEntry(builder: (context) {
      return NotifiBaseWidget(homeContext: context, child: child);
    });
    overlayState.insert(overlayEntry);
    await Future.delayed(Duration(milliseconds: 5000));
    if(overlayEntry != null){
      dismiss();  
    }
  }

  dismiss() async {
    overlayEntry.remove();
    overlayEntry = null;
  }
}
```
在main.dart里面初始化
```dart
Notice(contextData:context);
```
然后就可以直接调用了，在全局都可以调用这个toast，具体样式写在NotifiBaseWidget里面，因为是单例模式，可以全局调用dismiss来关闭toast。

### 问题
暂时能满足业务需求，后续还待完善的功能。
1. 入场动画
2. 手势操作，例如上划或是右划消失这些体验。
3. 暂时是单例模式，只能显示一个，后续如果有要求可能会做成像系统通知一样的，从上往下叠加。

