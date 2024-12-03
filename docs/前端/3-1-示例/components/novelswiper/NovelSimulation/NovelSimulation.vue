<template>
	<div
		class="yingbing-flip"
		:class="{ 'left-to-right': isLeftToRight }"
		@touchstart="touchStart"
		@touchmove="touchMove"
		@touchend="touchEnd"
		:style="{ width: windowWidth + 'px', height: windowHeight + 'px' }">
		<div>
			<slot :item="curPage"></slot>
		</div>
		<div class="yingbing-flip-item" :style="{ transform: `translateX(${translateX}px)`, opacity: translateX != 0 ? 1 : 0 }">
			<div style="height: 100%" :style="{ transform: `translateX(${-translateX}px)` }">
				<slot :item="pages[pageIndex]"></slot>
			</div>
			<div
				class="yingbing-flip-item-bg"
				:style="{ transform: `translateX(${isLeftToRight ? -(windowWidth - Math.abs(translateX)) : windowWidth - Math.abs(translateX)}px)` }"
				style="background: #fff">
			</div>
			<div class="yingbing-flip-item-shadow"></div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
	windowWidth: {
		//宽度
		type: Number,
		default: 0,
	},
	windowHeight: {
		//高度
		type: Number,
		default: 0,
	},
	pages: {
		type: Array,
		default: () => [],
	},
	pageIndex: {
		//第几页
		type: Number,
		default: 0,
	},
})
const emit = defineEmits(['updatePageIndex'])

const swiperIndex = ref(0)
const startX = ref(0)
const moveX = ref(0)
const endX = ref(0)
const isTouchEndAnimate = ref(false)
const translateX = ref(0)

const isLeftToRight = computed(() => {
	return startX.value < moveX.value
})
const curPage = computed(() => {
	let pageObj = props.pages[props.pageIndex]
	if (translateX.value != 0) {
		pageObj = startX.value < moveX.value ? props.pages[props.pageIndex - 1] : props.pages[props.pageIndex + 1]
	}
	return pageObj
})

function step(finishX, pageIndex) {
	const distance = finishX - translateX.value
	if (Math.abs(distance) > 1) {
		translateX.value = translateX.value + distance * 0.2
		setTimeout(() => {
			step(finishX, pageIndex)
		}, 1000 / 60)
	} else {
		isTouchEndAnimate.value = false
		swiperIndex.value = 0
		endX.value = 0
		translateX.value = endX.value
		emit('updatePageIndex', pageIndex)
	}
}

const touchStart = (e) => {
	if (isTouchEndAnimate.value) {
		return
	}
	startX.value = e.changedTouches[0].pageX
	moveX.value = e.changedTouches[0].pageX
}
const touchMove = (e) => {
	if (isTouchEndAnimate.value) {
		return
	}
	moveX.value = e.changedTouches[0].pageX
	endX.value = moveX.value - startX.value
	translateX.value = endX.value
}
const touchEnd = (e) => {
	if (isTouchEndAnimate.value) {
		return
	}
	isTouchEndAnimate.value = true
	let pageIndex = props.pageIndex
	const touchX = moveX.value - startX.value
	if (touchX > 100 && pageIndex > 0) {
		pageIndex -= 1
		swiperIndex.value -= 1
	}
	if (touchX < -100 && pageIndex < props.pages.length - 1) {
		pageIndex += 1
		swiperIndex.value += 1
	}
	endX.value = -swiperIndex.value * props.windowWidth
	step(endX.value, pageIndex)
}
</script>

<style scoped>
.yingbing-flip {
	overflow: hidden;
	position: relative;
}

.yingbing-flip-item {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 30px 20px;
}

.yingbing-flip-item-bg {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	box-shadow: rgba(0, 0, 0, 0.2) -5px 0px 15px 3px;
}

.yingbing-flip-item-shadow {
	position: absolute;
	top: 0px;
	bottom: 0px;
	right: 0px;
	width: 0px;
	z-index: 10;
	height: 100%;
	box-shadow: rgba(0, 0, 0, 0.5) 0 0 60px 30px;
}
.bg-item {
	height: 100%;
}

/* .left-to-right .yingbing-flip-item {
		box-shadow: rgba(0, 0, 0, 0.4) 0rpx 0rpx 60rpx 40rpx;
	} */

.left-to-right .yingbing-flip-item-bg {
	box-shadow: rgba(0, 0, 0, 0.2) 5px 0px 15px 0;
}

.left-to-right .yingbing-flip-item-shadow {
	left: 0;
	/* box-shadow: rgba(0, 0, 0, 0.5) 0 0px 120rpx 60rpx; */
}
</style>
