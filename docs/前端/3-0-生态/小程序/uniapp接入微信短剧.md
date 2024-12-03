# uniapp接入微信短剧播放器
文档：[https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/videoplayer.html](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/videoplayer.html)

## 准备

在小程序后台[设置=>第三方设置]里添加**短剧播放器**插件

在媒资管理平台里上传短剧

## uniapp引入
在`manifest.json`里引入小程序插件
```json
{
  ...
  "mp-weixin" : {
        "appid": "wxc3cef909c7abc7fb",
        "setting" : {
            "urlCheck" : false
        },
        "usingComponents" : true,
        "plugins" : {
            "playlet-plugin" : {
                "version" : "latest",
                "provider" : "wx94a6522b1d640c3b",
                "genericsImplementation" : {
                    "playlet" : {
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

在`app.vue`中引入插件，并初始化(**初始化参数执行的时间在跳转插件以后**)  
```vue
<script>
	// #ifdef MP-WEIXIN
	const playletPlugin = requirePlugin('playlet-plugin')
	import playerManager from './utils/playerManager'
	// #endif

	export default {
		onLaunch: function() {
			// #ifdef MP-WEIXIN
			function _onPlayerLoad(info){
				playerManager._onPlayerLoad(info)
			}
			playletPlugin.onPageLoad(_onPlayerLoad.bind(this))
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
```
## 处理相关逻辑
新建`utils/playerManager.js`，内容如下
```javascript
const playletPlugin = requirePlugin('playlet-plugin')


export default {
	_onPlayerLoad(info) {
		const that=this
		const pm = playletPlugin.PlayletManager.getPageManager(info.playerId)
		this.pm = pm
		// encryptedData是经过开发者后台加密后(不要在前端加密)的数据，具体实现见下面的加密章节
		this.getEncryptData({ extParam: JSON.parse(info.extParam) }).then(res => {
			// encryptedData是后台加密后的数据，具体实现见下面的加密章节
			pm.setCanPlaySerialList({
				data: res.encryptedData,
				freeList: [{ start_serial_no: 1, end_serial_no: 10}], // 1~10集是免费剧集
			})
		})
		pm.onCheckIsCanPlay(this.onCheckIsCanPlay.bind(this))
		// 防截屏录屏
		pm.setVisualEffectOnCapture({
			visualEffect: 'hidden',
		})
		pm.onHideChargeDialog(function(){
			const obj = that.pm.getInfo()
			that.onCheckIsCanPlay({serialNo:obj.serialNo})
		})
		pm.onDataReport(function(e){
			const extParam = JSON.parse(info.extParam)
			switch (e.event){
				case 'LIKE'://点赞
					console.log(info,extParam);
					break;
				case 'UNLIKE'://取消点赞
					break;
				case 'FAV'://在追
					break;
				case 'UNFAV'://取消在追
					break;
				case "TAP_UNLOCK"://点击解锁
					break
				default:
					break;
			}
		})
		// 关于分享的处理
		pm.setDramaFlag({
			share: true,
			withShareTicket: true
		})
		// 获取分享参数,页面栈只有短剧播放器一个页面的时候可获取到此参数
		// 例如从分享卡片进入、从投流广告直接跳转到播放器页面，从二维码直接进入播放器页面等情况
		playletPlugin.getShareParams().then(async res => {
		  console.log('getLaunch options query res', res)
		  // 关于extParam的处理，需要先做decodeURIComponent之后才能得到原值
		  const extParam = decodeURIComponent(res.extParam)
		  const options=JSON.parse(extParam)
		  
		}).catch(err => {
		  console.log('getLaunch options query err', err)
		})
		
		// extParam除了可以通过在path传参，还可以通过下面的接口设置
		// pm.setExtParam('hellotest')
		// 分享部分end
	},
	onCheckIsCanPlay(param) {
		// TODO: 碰到不可以解锁的剧集，会触发此事件，这里可以进行扣币解锁逻辑，如果用户无足够的币，可调用下面的this.isCanPlay设置
		var serialNo = param.serialNo
		this.getEncryptData({serialNo:serialNo}).then(res => {
			// encryptedData是后台加密后的数据，具体实现见下面的加密章节
			this.pm.isCanPlay({
				data: res.encryptedData,
				serialNo: serialNo,
			})
		})
	},
	getEncryptData(param) {
		const that=this
		const obj = this.pm.getInfo()
		const extParam = JSON.parse(obj.extParam)
		return new Promise(async (resolve, reject) => {
			resolve({
        encryptedData: '' // TODO: 此参数需从后台接口获取到
      })
		})
	},
	/**点击跳转播放页面*/
	navigateToPlayer(obj) {
		// 下面的${dramaId}变量,需要替换成小程序管理后台的媒资管理上传的剧目的dramaId，变量${srcAppid}是提审方appid，变量${serialNo}是某一集，变量${extParam}是扩展字段，可通过
		const { extParam, dramaId, srcAppid } = obj
		uni.redirectTo({
			url: `plugin-private://wx94a6522b1d640c3b/pages/playlet/playlet?dramaId=${dramaId}&srcAppid=${srcAppid}&extParam=${extParam || ''}`
		})
	},
}
```
在`charge-dialog`组件处理支付逻辑  
ps: 这里的参数可能获取不到，可以使用订阅事件或其他方式获取相关参数
```vue
<template>
	<view>
	</view>
</template>

<script>
	import Charges from '@/components/charges.vue'
	// #ifdef MP-WEIXIN
	import playerManager from "../../utils/playerManager";
	// #endif
	export default {
		name: "charge-dialog",
		components: { Charges },
		props: {
			playerId: {
				type: String,
				default: ''
			},
			srcAppid: {
				type: String,
				default: ''
			},
			dramaId: {
				type: String,
				default: ''
			},
			serialNo: {
				type: Number,
				default: 0
			},
			extParam: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
        
			};
		},
    mounted() {
			uni.$on("wxPlayerPayData", this.playerPayHandler)
		},
		methods: {
			playerPayHandler(data) {
        
			},
			setTotalGold(){
				playerManager.pm.hideChargeDialog()//支付成功关闭支付弹窗
			}
		}
	}
</script>
```
