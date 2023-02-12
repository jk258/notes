# css 属性

## inset 定位

demo：[https://vb84t.csb.app/hiddenPosition.html](https://vb84t.csb.app/hiddenPosition.html)
文档：[https://developer.mozilla.org/en-US/docs/Web/CSS/Inset](https://developer.mozilla.org/en-US/docs/Web/CSS/Inset)

```html
<style>
	.box {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
<div class="box">inset定位</div>
```

## overscroll-behavior 控制浏览器过度滚动时的表现——滚动到边界

文档：[https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior-y](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior-y)
`body { overscroll-behavior-y: contain;}`
**进度条**

```html
<style>
	.progress-outer {
		width: 60%;
		height: 12px;
		border-radius: 8px;
		overflow: hidden;
		position: relative;
	}
	.progress-enter {
		height: inherit;
		background: rgba(180, 160, 120, 0.2);
	}
	.progress-bg {
		width: 60%;
		height: inherit;
		border-radius: 6px;
		background: repeating-linear-gradient(-45deg, #d9cfbb 25%, #c3b393 0, #c3b393 50%, #d9cfbb 0, #d9cfbb 75%, #c3b393 0);
		background-size: 16px 16px;
		animation: panoramic 20s linear infinite;
	}
	@keyframes panoramic {
		to {
			background-position: 200% 0;
		}
	}
</style>
<div class="progress-outer">
	<div class="progress-enter">
		<div class="progress-bg"></div>
	</div>
</div>
```

## 齿轮背景

```html
<style>
	.coupon-card {
		width: 200px;
		height: 120px;
		background-image: radial-gradient(circle at 100px -8px, transparent 20px, #b4a078 21px);
		position: relative;
	}
	.coupon-card::after {
		content: '';
		width: 100%;
		height: 15px;
		background: linear-gradient(115deg, transparent 75%, rgba(255, 255, 255, 1) 75%) 0 0, linear-gradient(
					245deg,
					transparent 75%,
					rgba(255, 255, 255, 1) 75%
				) 0 0, linear-gradient(115deg, transparent 75%, rgba(255, 255, 255, 1) 75%) 7px -15px, linear-gradient(
					245deg,
					transparent 75%,
					rgba(255, 255, 255, 1) 75%
				) 7px -15px, transparent;
		background-size: 15px 30px;
		position: absolute;
		left: 0;
		bottom: 0;
	}
</style>
<div class="coupon-card"></div>
```

## 换行

```html
.br::before { content: '\A'; white-space: pre; }
<span class="br">sdddddddfgg</span>
<span class="br">sdddddddfgg</span>
```

## css 计数器

counters 嵌套计数器
文档：[https://developer.mozilla.org/zh-CN/docs/Web/CSS/counters()](<https://developer.mozilla.org/zh-CN/docs/Web/CSS/counters()>)

```html
<style>
	.counter {
		counter-increment: my;
	}
	.counter::after {
		content: counters(my, '-');
	}
</style>
<p class="counter">counter:test</p>
<p class="counter">test</p>
<p class="counter">test</p>
<p class="counter">test</p>
```

## animate

| 属性                 | 描述                 | 值                  | 文档                                                                                                                             |
| -------------------- | -------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| animation-play-state | 动画正在运行还是暂停 | paused&#124;running | [https://www.w3school.com.cn/cssref/pr_animation-play-state.asp](https://www.w3school.com.cn/cssref/pr_animation-play-state.asp) |

## clip-path

```css
clip-path: polygon(41% 0%, 100% 0%, 75% 100%, 0% 100%); //多边形
```

## 滚动阴影（background-attachment）

```html
<style>
	.scroll-shadows {
		max-height: 200px;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		overflow-scrolling: touch;
		background: linear-gradient(white 30%, rgba(255, 255, 255, 0)) center top, linear-gradient(rgba(255, 255, 255, 0), white 70%) center bottom,
			radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) center top, radial-gradient(
					farthest-side at 50% 100%,
					rgba(0, 0, 0, 0.2),
					rgba(0, 0, 0, 0)
				) center bottom;
		background-repeat: no-repeat;
		background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
		background-attachment: local, local, scroll, scroll;
	}
</style>
<ul class="scroll-shadows"></ul>
```

## css 变量

```css
:root {
	--color: red;
	--size: 14px;
}
.test {
	color: var(--color);
	font-size: var(--size);
}
```

## 修改 css 变量

```javascript
const test=document.querySelector('.test') window.getComputedStyle(test).getPropertyValue('color').trim() //获取属性
document.body.style.setProperty('--color','blue')//设置css变量
```

## css 新属性

| 属性                                                                                             | 描述                                           | 值                                                                                                                   |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [overflow-wrap](https://preset-env.cssdb.org/features/#overflow-wrap-property)                   | 用于定义是否在单词中插入换行符以防止溢出的属性 | `overflow-wrap: break-word;`                                                                                         |
| [:focus-within 焦点容器伪类](https://preset-env.cssdb.org/features/#focus-within-pseudo-class)   | 用于匹配具有焦点或具有焦点后代的元素的伪类     |                                                                                                                      |
| [:focus-visible 焦点指示伪类](https://preset-env.cssdb.org/features/#focus-visible-pseudo-class) | 用于匹配向用户指示焦点的焦点元素的伪类         | `:focus:not(:focus-visible) (tabindex)`                                                                              |
| conic-gradient                                                                                   | 在渐变中使用两个位置的语法                     | `background-image: conic-gradient(yellowgreen 0 90deg, gold 90deg 180deg, #f06 180deg 270deg,green 270deg 360deg );` |
