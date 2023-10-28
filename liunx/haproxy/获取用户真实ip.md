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



一个根据host分流的配置

global
    #日志
    log 127.0.0.1 local0 info
    # log /var/log/haproxy.log local7 info
    #最大连接数
    maxconn 40960
    daemon
 
defaults
    #应用全局的日志配置
    log global
    mode http
    #超时配置
    timeout connect 5000
    timeout client 5000
    timeout server 5000
    timeout check 2000
 
listen http_front
    bind 172.16.18.132:64728
    mode http
    option httplog
    stats uri /haproxy
    stats auth kfUSvYcDSUTRMlCeAhxLnFFBEydNpU:FvmeEHYDQhSbOPwodzmfMPWRTLOIdm          #控制面板账号密码 账号：admin 
    stats refresh 5s
    stats enable


frontend https_proxy
    bind *:6819

    default_backend backendnotfound

    # ------------
    acl is_api.test.ceosaas.cn hdr_beg(host) -i test.ceosaas.cn
    use_backend backend1 if is_api.test.ceosaas.cn
    # ------------

backend backendnotfound
    mode http
    http-request deny deny_status 404

backend backend1
    server server1 172.16.18.133:80

backend backend2
    server server2 172.16.18.134:80
