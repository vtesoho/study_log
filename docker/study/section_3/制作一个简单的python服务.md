## 制作一个简单的python服务

创建一个app.py文件，内容如下
```py
from flask import Flask
app = Flask(__name__)
@app.route('/')
def hello():
    return "hello docker"
if __name__ == '__main__':
    app.run()
```


然后在创建一个Dockerfile文件
```
FROM python
LABEL maintainer="vte so<vtesoho@163.com>"
RUN pip install flask
COPY app.py /app/
WORKDIR /app
EXPOSE 5000
CMD ["python", "app.py"]
```

开始build Dockerfile文件
```
```



