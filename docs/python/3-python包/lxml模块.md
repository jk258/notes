# lxml

lxml 是一种使用 Python 编写的库，可以迅速、灵活地处理 XML 和 HTML

安装

```
pip install lxml ||

pip install lxml -i http://pypi.douban.com/simple/ --trusted-host http://pypi.douban.com  #代理
```

## etree

### Element

使用 Element 类来创建 xml 内容

```python
from lxml import etree


root = etree.Element("root")

print(root.tag)
child=etree.SubElement(root,"child")
child.set('id','test_id')
print(etree.tostring(root))#tostring序列化b'<root><child id="test_id"/></root>'
```

### tostring()

tostring()主要是对对象进行序列化，不能对集合进行序列化

```python
from lxml import etree

root = etree.XML("<root><div><p></p></div></root>")

print(etree.tostring(root))
print(etree.tostring(root, encoding="iso-8859-1"))
print(etree.tostring(root, pretty_print=True))
print(etree.tostring(root, method="text"))#method="text"|"html"|"xml"
```

### XML()/HTML()

```PYTHON
from lxml import etree

root = etree.XML("<root>data</root>")
print(etree.tostring(root))#b'<root>data</root>'
root = etree.HTML("<p>data</p>")
print(etree.tostring(root))#b'<html><body><p>data</p></body></html>'
```

## xpath

lxml 支持 XPath 语法

- xpath 的返回结果都是集合(list)
- xpath 只能作用于对象(object)上

### 基本语法

| 表达式              | 描述                                                     | 实例                                   |
| ------------------- | -------------------------------------------------------- | -------------------------------------- |
| nodename            | 选取此节点的所有子节点                                   | `html.xpath("body/div")`               |
| `/`                 | 从根节点选取                                             | `html.xpath("/html/body/div")`         |
| `//`                | 从匹配选择的当前节点选择文档中的节点，而不考虑它们的位置 | `html.xpath("//div")`                  |
| `.`                 | 选取当前节点                                             | `html.xpath("//div/.")`                |
| `..`                | 选择当前节点的父节点                                     | `html.xpath("//div/..")`               |
| `@`                 | 选择属性                                                 | `html.xpath("//a/@href")`              |
| `*`                 | 匹配任何元素节点                                         | `html.xpath("*")`                      |
| `@*`                | 匹配任何属性节点                                         | `html.xpath("@*")`                     |
| `@attribute`        | 选取具有给定属性的所有元素                               | `html.xpath("//a[@href]")`             |
| `@attribbute=value` | 选取给定属性具有给定值的所有元素                         | `html.xpath('//div[@class="item-1"]')` |
| `text()`            | 返回标签的内容                                           | `html.xpath("//a/text()")`             |

### 实例

```python
from lxml import etree


text = """
    <div class="item-1" style="color:red;"><a href="link1.html">Python知识学堂</a></div>
    <div class="item-2"><a href="link2.html"><div>学习Python</div></a></div>
    <div class="item-3 item-4"><a href="link5.html">很好玩</div>
"""
html = etree.HTML(text)
# print(html.xpath("body/div"))
# print(html.xpath("/html/body/div"))

# result=html.xpath("//div")
# for i in result:
#   print(etree.tostring(i,encoding="utf-8").decode("utf-8"))

# print(html.xpath("//div/."))
# print(html.xpath("//div/.."))

hrefList = html.xpath("//a[@href]")
for href in hrefList:
    print(href)

# result1 = html.xpath("//@href")
# for i in result1:
#     print(i)
# result2 = html.xpath('//div[@class="item-1"]')
# print(result2)

# result3 = html.xpath("//a/text()")
# print(result3)
# result4 = html.xpath("//a/string()")
# print(result4)
```

## lxml.cssselect

lxml.cssselect 模块中最重要的是 CSSSelector 即 CSS 选择器

### 安装

```
pip install cssselect
```

### 实例

```python
from lxml.cssselect import CSSSelector
from lxml import etree

text='''
     <div class="item-1 item-2" style="color:red;"><a href="link1.html">Python知识学堂</a></div>
     <div class="item-2"><a href="link2.html"><div>学习Python</div></a></div>
     <div class="item-3 item-4"><a href="link5.html">很好玩</div>
'''
html=etree.HTML(text)      #初始化生成一个XPath解析对象  并且会补全html
result=html.cssselect('div.item-1.item-2 a') #选择div标签并且含有class属性且值含有"item-1"与"item-2" 下的a 标签子节点
for item in result:
    print(item.text)       # 获取标签的内容
    print(item.get('href'))#获取a 标签的属性值
```
