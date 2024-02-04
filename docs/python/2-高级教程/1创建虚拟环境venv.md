# 创建虚拟环境

## virtual environment

python 的一个内置特性，它可以让你在一个目录中保持独立的软件包环境而不影响其他的项目  
将虚拟环境都放在一个位置是明智的做法，例如将它们放置在你主目录下的 `.virtualenvs/ ` 中

## 创建虚拟环境
```bash
python -m venv .virtualenvs
```

## 激活虚拟环境
```bash
source .virtualenvs/bin/activate
```
如果 source 命令不可用，可以试试
```bash
. .virtualenvs/bin/activate
```
每当打开一个新的终端窗口，都必须先激活虚拟环境  
在 Windows 下采用如下命令进行激活虚拟环境：
```bash
.virtualenvs/Scripts/activate
```
## 退出虚拟环境
```bash
deactivate
```
## pip配置国内镜像
```
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```
- 清华源：https://pypi.tuna.tsinghua.edu.cn/simple/
- 豆瓣源：https://pypi.doubanio.com/simple/

## pip命令
- 升级pip install --upgrade 库名 或 pip install -U 库名
- 指定版本pip install scipy==0.15.1
- 查看某个库版本pip list | grep numpy
- 查看某个库可安装版本pip install numpy==
