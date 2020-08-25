### docker 底层技术支持

```
主要是用了很多liunx底层技术
namespaces：做隔离pid,net,ipc,mnt,uts

control groups:做资源限制 

union file systems: container和image的分层
```

### 什么是image
```
文件和meta data的集合(root filesystem)
分层的，并且每一层都可以添加改变删除文件，成为一个新的image
不同的image可以共享相同的layer
image本身是read-only的
```