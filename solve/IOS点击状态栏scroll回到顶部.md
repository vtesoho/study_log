### IOS点击状态栏scroll回到顶部

应用里面现在需要增加一个点击状态栏listview返回顶部的需求，之前是直接在应用里面的appbar上面添加点击事件，这样存在的问题是点击状态栏是没有效果的，点击状态栏下面才会返回顶部，这样在android下是能理解的，但ios就不能理解了，原生的uiscrollview是直接有这个效果的。

在网找了各种方法，大体二种方式，一是说添加一个window屋，设置它的层级为4001，这样就会在最顶上，然后添加点击事件，这种方式我测试了下，点击状态栏没有什么效果，只击状态栏下面40象素才有效果，完全达不到要求，第二种就是说直接监听事件，重写touchesBegan方式，但是这种方式也不能达到效果。

最后还是用了在界面上添加了一个很小的scrollview，然后拦截到点scrollTop事件重写。
```objc
CGRect screenWH = [ UIScreen mainScreen ].applicationFrame;
UIApplication.sharedApplication.statusBarHidden = false;
FlutterViewController* controller = (FlutterViewController*)self.window.rootViewController;

UIScrollView *topscrollView = [[UIScrollView alloc] initWithFrame:CGRectMake(0, 0, screenWH.size.width , 0)];
topscrollView.contentSize = CGSizeMake(screenWH.size.width, 10);
topscrollView.contentOffset = CGPointMake(0, 10);
topscrollView.delegate = self;
[controller.view addSubview:topscrollView];
```

```objc
- (BOOL)scrollViewShouldScrollToTop:(UIScrollView *)scrollView{
    //实现业务逻辑
    return NO;
}
```




