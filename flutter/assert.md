## assert

直接上代码吧，直观。
···
static bool poll = false;
print('assert执行前？？');
assert(poll == true,'assert执行中？？');
print('assert执行后？？');
···
这种情况在debug情况下会报错，在release会正常执行。
