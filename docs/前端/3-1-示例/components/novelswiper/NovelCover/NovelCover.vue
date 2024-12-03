<template>
	<div class="list" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
		:style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<div v-if="pages[pageIndex-1]" class="page pre"
			:style="{zIndex:!isNext?2:1,transform:`translateX(${!isNext?0:'-100%'})`}">
			<slot :item="pages[pageIndex-1]"></slot>
		</div>
		<div class="page cur" :style="{transform:`translateX(${translateX}px)`}">
			<slot :item="pages[pageIndex]"></slot>
		</div>
		<div v-if="pages[pageIndex+1]" class="page next"
			:style="{zIndex:isNext?2:1,transform:`translateX(${isNext?0:'100%'})`}">
			<slot :item="pages[pageIndex+1]"></slot>
		</div>
	</div>
</template>

<script setup>
	import { computed,  ref, } from 'vue'
	const props = defineProps({
		windowWidth: { //宽度
			type: Number,
			default: 0
		},
		windowHeight: { //高度
			type: Number,
			default: 0
		},
		pages: {
			type: Array,
			default: () => []
		},
		pageIndex: { //第几页
			type: Number,
			default: 0
		}
	})
	const emit = defineEmits(["updatePageIndex"])

	const isTouchEndAnimate = ref(false)
	const swiperIndex = ref(0)
	const startX = ref(0)
	const moveX = ref(0)
	const endX = ref(0)
	const translateX = ref(0)

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
	const isNext = computed(() => {
		return moveX.value - startX.value > 0 ? false : true
	})
	const touchStart = (e) => {
		if (isTouchEndAnimate.value) {
			return
		}
		startX.value = e.changedTouches[0].pageX
	}
	const touchMove = (e) => {
		if (isTouchEndAnimate.value) {
			return
		}
		moveX.value = e.changedTouches[0].pageX
		const pageX = moveX.value - startX.value
		translateX.value = pageX + endX.value
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
	.list {
		width: 100vw;
		position: relative;
		overflow: hidden;
	}

	.page {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}

	.cur {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 3;
		box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.3);
	}
</style>
