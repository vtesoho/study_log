在配置里面加入

```
http-request del-header x-forwarded-for
option forwardfor
```

frontend tcp_frontend
    bind *:80
    http-request del-header x-forwarded-for
    option forwardfor
    default_backend tcp_backend



