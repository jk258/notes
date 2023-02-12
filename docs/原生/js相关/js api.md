# js api

## js 点击其他元素关闭选中元素

[Event.composedPath()](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath)：获取元素路径判断

## app和h5交互
### ios
```javascript
window.webkit.messageHandlers.[事件名].postMessage(参数)
```

## 取色，滴管工具（EyeDropper）

文档：[https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper)

```html
<button id="start-button">Open the eyedropper</button>
<span id="result"></span>

<script>
	document.getElementById('start-button').addEventListener('click', () => {
		const resultElement = document.getElementById('result')

		if (!window.EyeDropper) {
			resultElement.textContent = 'Your browser does not support the EyeDropper API'
			return
		}

		const eyeDropper = new EyeDropper()

		eyeDropper
			.open()
			.then((result) => {
				resultElement.textContent = result.sRGBHex
				resultElement.style.backgroundColor = result.sRGBHex
			})
			.catch((e) => {
				resultElement.textContent = e
			})
	})
</script>
```

## 富文本

- contenteditable：枚举属性，表明元素是否可被用户编辑
- Selection：
  - 用户选择的文本范围或插入符号的当前位置
  - 文本选区由用户拖拽鼠标经过文字而产生，可能横跨多个元素
  - 光标有用户点击产生，表示当前插入的位置`window.getSelection()`获取
- execCommand：
  - 编辑模式下，document 暴露的方法
  - 运行命令来操作可编辑内容区域的元素
  - 大多数命令影响 selection 区域内的元素
