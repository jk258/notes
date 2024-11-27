# uniapp接入微信阅读器
官方文档：[https://doc.weixin.qq.com/doc/w3_AAcAYAbdAFwpM63n1R5SIat3aa4cX?scode=AJEAIQdfAAoVIQaI1HzxCMFC6-AJg](https://doc.weixin.qq.com/doc/w3_AAcAYAbdAFwpM63n1R5SIat3aa4cX?scode=AJEAIQdfAAoVIQaI1HzxCMFC6-AJg)

## 准备

在小程序后台[设置=>第三方设置]里添加**阅读器**插件

在小说管理平台里上传小说

## uniapp 引入

在`manifest.json`里引入小程序插件

```json
{
  ...
  "mp-weixin" : {
      "appid": "",
      "setting" : {
          "urlCheck" : false
      },
      "usingComponents" : true,
      "plugins" : {
          "novel-plugin" : {
            "version" : "latest",
            "provider" : "wx293c4b6097a8a4d0",
      			"genericsImplementation":{
      				"novel":{
      					"charge-dialog" : "/components/charge-dialog/charge-dialog"//支付组件
      				}
      			}
          }
      }
  },
  ...
}
```

ps：这里的`charge-dialog`组件必须在页面里引入注册，否则不会生效

在`app.vue`中引入插件，并初始化

```vue
<script>
// #ifdef MP-WEIXIN
const novelPlugin = requirePlugin('novel-plugin')
const novelPluginLoadInit = require('@/utils/novelPluginLoad.js') //插件初始化及相关逻辑
// #endif

export default {
	onLaunch: function () {
		// #ifdef MP-WEIXIN
		novelPlugin.onPageLoad(novelPluginLoadInit)
		// #endif
	},
}
</script>
```

## 处理相关逻辑

从页面跳转插件

```js
wx.redirectTo({
	url: 'plugin-private://wx293c4b6097a8a4d0/pages/novel/index?bookId=bookid&chapterIndex=0',
})
```

进入插件后需要处理逻辑

```js
module.exports = async function onNovelPluginLoad(data) {
	const novelManager = novelPlugin.getNovelManager(data.id)

	// 书架按钮点击事件,这里上传接口
	novelManager.onClickBookshelf((params) => {
		novelManager.setBookshelfStatus({
			bookshelfStatus: params.bookshelfStatus == 0 ? 1 : 0, //0为未加入书架，1为加入书架
		})
	})
	// 用户点击事件
	novelManager.onUserTriggerEvent((params) => {
		if (params.event_id == 'open_menu') {
			//在唤起一级菜单时设置目录信息，其他值可查看文档
			novelManager.setContents({
				//设置目录信息，只设置ui显示
				contents: [
					{
						index: 0,
						status: 0,
					},
					{
						index: 1,
						status: 1,
					},
					{
						index: 2,
						status: 2,
					},
				],
			})
		}
	})
}
```

在`charge-dialog`组件，`props`里会传递以下值，根据这些值处理支付逻辑

```vue
<template>
	<view>...</view>
</template>

<script>
const novelPlugin = requirePlugin('novel-plugin')
export default {
	name: 'charge-dialog',
	props: {
		novelManagerId: {
			//novelManager柄用来get实例使用type: Number
			type: Number,
			default: -1,
		},
		bookId: {
			//书籍id
			type: String,
			value: '',
		},
		chapterIndex: {
			//章节下标(从0开始)type: Numbervalue:-1
			type: Number,
			value: -1,
		},
		chapterId: {
			//章节idtype: String,
			type: String,
			value: '',
		},
	},
	data() {
		return {}
	},
	mounted() {},
	methods: {
		onChargeLoad() {
			//支付成功后调用
			const novelManager = novelPlugin.getNovelManager(this.novelManagerId)
			novelManager.paymentCompleted()
			novelManager.closeChargeDialog()
		},
	},
}
</script>
```
