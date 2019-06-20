在组件化的时候，把一个组件放进build里面，然后运行，发现组件多次build，组件里面没有setState，肯定是受上级页面的影响，在上级页面发现了这段代码。
```dart
scrollController.addListener(() {
    offset = scrollController.offset;
    ...
    if (offset < 0) {
        setState(() {
          navAlpha = 0;
        });
        } else if (offset < scrollH) {
        setState(() {
          navAlpha = 0;
        });
        } else if (offset > scrollH) {
        if (offset < maxScrollExtent) {
          setState(() {
            navAlpha = 1;
          });
        }
    }
}

```
一看这段代码没什么问题，可以运行，但这段代码影响有点严重，一直在做没必要的更新，虽然说多个setState是合并执行，但是在scroll里面会有自己的处理贞，只要滑动就会执行。

```dart
if (offset < 0 && navAlpha != 0) {
  setState(() {
    navAlpha = 0;
  });
} else if (offset < scrollH && navAlpha != 0) {
  setState(() {
    navAlpha = 0;
  });
} else if (offset > scrollH &&  navAlpha != 1) {
  if (offset < maxScrollExtent) {
    setState(() {
      navAlpha = 1;
    });
  }
}
```
对代码进行了一些改进，就算条件达到了，如果值是原来的值，是不会做更新处理的。

也算是一个小的优化吧。这样的地方在一个项目里面积少成多之后，对项目的影响还是挺大的。从细节做起。