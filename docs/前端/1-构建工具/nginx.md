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
## linux安装nginx
### 依赖下载

```
yum install -y gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel
```

### 下载nginx

1. 访问[官网](http://nginx.org/en/download.html),鼠标放在需要下载的版本上，右击鼠标“复制链接” 
2. 在Linux系统上进行下载（示例：下载1.25.1版本）
   ```
   wget http://nginx.org/download/nginx-1.25.1.tar.gz
   ```
3. 便于管理，可以创建一个文件夹来保存
   ```
   # 创建文件夹
    mkdir /usr/java
   #将包移入文件夹中
    mv nginx-1.25.1.tar.gz /usr/java
   #转换到该文件夹下
    cd /usr/java
   #查看文件夹的内容
    ls
   ```
4. 解压包，并转换到nginx文件夹下,出现“nginx-1.25.1”表示解压成功 
   ```
   #解压包
     tar -zxf nginx-1.25.1.tar.gz
   #转换到nginx文件夹下
    cd nginx-1.25.1
   ```
5. 配置nginx
   ```
   ./configure
   ```
6. 编译安装nginx
   ```
   #这是编译和安装一块进行（&&），也可以分开
   make&&make install
   ```
7. 配置环境变量,把nginx的sbin路径放进去就行了
   
   在`/etc/profile`,增加nginx的环境变量
   ```
   #Nginx enviroment
   export NGINX_PATH=/usr/local/nginx
   
   export PATH=$PATH:${JAVA_HOME}/bin:$PATH:${NGINX_PATH}/sbin
   ```
   
   可以通过`whereis nginx`来获得nginx的安装目录
   
   刷新配置文件，让配置生效
   ```
   source /etc/profile
   ```
   
   测试是否成功
   ```
   nginx -v
   ```
