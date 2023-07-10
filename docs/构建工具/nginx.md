# nginx 配置

## 命令行

```
nginx //启动
nginx -s reload //重启
nginx -s stop //停止
```

## 启动 web 服务（以 vue 为例）

```nginx
server {
  listen 3000;
  server_name _;
  # 禁止 iframe 嵌套
  # add_header        X-Frame-Options SAMEORIGIN;

  location /{
    # 项目目录
    root html/dist;
    # 默认读取文件
    index index.html;
    # 配置 history 模式的刷新空白
    try_files       $uri $uri/ /index.html;
  }
  # 后缀匹配，解决静态资源找不到问题
  # location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
  #   root           html/dist/assets/;
  # }
  # 图片防盗链
  location ~/assets/.*\.(jpg|jpeg|png|gif|webp)$ {
    root              html/dist;
    valid_referers none blocked 127.0.0.1;
    if ($invalid_referer) {
      # return          403; # 返回状态码
      rewrite ^/ /assets/logo-277e0e97.svg  break;# 重写路径返回其他图片
    }
  }

  # 访问限制
  # location /assets {
  #   root               html/dist;
  #   # allow 允许
  #   allow              127.0.0.1;
  #   # deny  拒绝
  #   deny               all;
  # }
}

```

## PC 端和移动端使用不同的项目文件映射

```nginx
server {
  listen 3001;
  server_name _;
  location /{
    root html/pc;
    if ($http_user_agent ~* '(mobile|android|iphone|ipad|phone)') {
      root html/mobile;
    }
    index index.html;
  }
}
```

## 配置代理
```nginx
server {
  listen 9000;
  server_name _;
  location /api/{# 代理接口
    add_header Access-Control-Allow-Origin * always;
    add_header Access-Control-Allow-Headers *;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, OPTIONS";
    
    proxy_pass http://127.0.0.1:3001/api/;
    proxy_http_version 1.1;
  }
  location /h5{# 代理页面
    proxy_pass http://127.0.0.1:8080/;
    proxy_http_version 1.1;
  }
}
```
