# import导包路径问题与init方法调用流程

go的执行机制

1. 初始文件的 main
2. 初始文件的 import
3. 初始文件import导入包的import
4. 初始文件import导入包的const
5. 初始文件import导入包的var
6. 初始文件import导入包的init
7. 初始文件const
8. 初始文件var
9. 初始文件init
10. 初始文件main
11. 初始文件退出
