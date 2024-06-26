# whistle

[https://wproxy.org/whistle/install.html](https://wproxy.org/whistle/install.html)

## 安装

```shell
npm install -g whistle
```

## 启动

启动

```shell
w2 start
```

重启

```shell
w2 restart
```

停止

```shell
w2 stop
```

## 配置代理

### 浏览器配置代理

- 安装 Chrome 代理插件：推荐安装 SwitchyOmega
- Firefox: 地址栏输入访问 about:preferences，找到 Network Proxy，选择 手动代理配置(Manual proxy configuration)，输入代理服务器地址、端口，保存
- 移动端需要在设置中配置当前 Wi-Fi 的代理

### 安装根证书

安装证书请参考文档: [http://wproxy.org/whistle/webui/https.html](http://wproxy.org/whistle/webui/https.html)

## 配置请求头跨域
新建 values `res-cors`,

```json
{
    "access-control-allow-origin":"*",
    "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type,Authorization,Content-Length,X-Requested-With",
}
```
添加规则
```
https://www.****.com resHeaders://{res-cors}
```
在`header`传递参数时，会发送预检请求，此时可以用whistle自定义`options`请求
```
https://www.****.com includeFilter://m:options / (status 204)(header Access-Control-Allow-Origin "*")(header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS")
```
最终规则如下：
```
https://www.****.com includeFilter://m:options / (status 204)(header Access-Control-Allow-Origin "*")(header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS")
https://www.****.com resHeaders://{res-cors}
```

