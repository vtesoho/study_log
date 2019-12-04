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

到此算是解决了些主要问题，剩下的就是些常规操作，不过也遇到不少坑。

1由于是用的flutter，是ios通知flutter这种方式，但全局只有能设置一个地方监听，在设置监听就会把前面的设置的覆盖。

这里的思路是ios 通知flutter,flutter在入口这里监听，如果接收到ios过来的通知，就执行一个开始设置好的全局stream，这里采用的是一个单例的类实现的。

下面说说遇到的坑

最开始只传入一个controller，没有传入context，结果就是很多设置了监听但没有销毁的页面全部返回了顶部，后面加入了context，会判断当前路由是不是在最顶层，是在最顶层才会返回顶部。

在需要用到点击状态栏返回顶部的页面initstate里面设置一个监听，然后dispose的时候销毁掉，但如果是pageview，或是tab切换就不会执行dispose,好像是因为设置了keepalive的原因，但这里又不能不用keepalive，但是在新打开路由之后，在进行切换又会重新加载，结果就是页面初始化的时候多次监听，导致在后面的页面也会返回顶部。

解决方案：在这种pageview tab这种切换的，没有新打开路由的页面。设置一个映射，切换到那个page都需要在page的initstate里设置这个页面的controller和context，然后在点击的那里获取到当前index，这样只要是在这个主页面，我就获取到这个当前的index所对应的controller跳转到顶部。这样就解决问题了。


