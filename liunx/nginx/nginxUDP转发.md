```
stream {
    upstream udp_servers {
        server <IP_ADDRESS>:<PORT>;
        server <IP_ADDRESS>:<PORT>;
        # Add more servers as needed
    }
}
```

```
stream {
    server {
        listen <UDP_PORT> udp;
        proxy_pass udp_servers;
    }
}
```


```
systemctl restart nginx
```