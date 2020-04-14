# 记录一些sqlite的sql使用

### 检查某表是否存在
```sql
select * from sqlite_master where type = 'table' and name = '***'
```

### 创建表
```sql
CREATE TABLE log (id INTEGER PRIMARY KEY AUTOINCREMENT,key TEXT, value TEXT,session Text)
```

