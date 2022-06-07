# intset

intset是redis中set集合的一种实现方式，基于整数数组来实现，并且具备长主可变、有序等特征



```c
typedef struct intset {
    uint32_t encoding;  编码方式，支持存放16，32，64位整数
    uint32_t length; 元素个数
    int8_t contents[]; 整型数组，保存集合数据
} intset;
```

其实的encoding包含三种模式，表示存储的整数大小不同

```c
#define INTSET_ENC_INT16 (sizeof(int16_t))
#define INTSET_ENC_INT32 (sizeof(int32_t))
#define INTSET_ENC_INT64 (sizeof(int64_t))
```


intset可以看做是特殊的整数数组，具备一些特点
1. redis会确保intset中的元素唯一、有序
2. 具备类型升级机制，可以节省内存空间
3. 底层采用二分查找方式来查询