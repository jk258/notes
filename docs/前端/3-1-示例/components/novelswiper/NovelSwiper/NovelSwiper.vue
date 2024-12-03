<template>
	<div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
		:style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<div class="list" :style="{transform:`translateX(${translateX}px)`}">
			<div style="flex: 1;" v-for="(item,index) in swiperPages" :key="index">
				<slot :item="item" v-if="item"></slot>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed,  ref, watch } from 'vue'
	const props = defineProps({
		windowWidth: {
			type: Number,
			default: 0
		},
		windowHeight: {
			type: Number,
			default: 0
		},
		pages: {
			type: Array,
			default: () => []
		},
		pageIndex: {
			type: Number,
			default: 0
		}
	})

	const emit = defineEmits(["updatePageIndex"])

	const swiperPages = computed(() => {
		const arr = [null, props.pages[props.pageIndex], props.pages[props.pageIndex + 1]]
		arr[0] = props.pageIndex - 1 >= 0 ? props.pages[props.pageIndex - 1] : null
		return arr
	})
	const swiperIndex = ref(1)
	const startX = ref(0)
	const moveX = ref(0)
	const endX = ref(0)
	const isTouchEndAnimate = ref(false)
	const translateX = ref(0)

	function step(finishX, pageIndex) {
		const distance = finishX - translateX.value
		if (Math.abs(distance) > 1) {
			translateX.value = translateX.value + distance * 0.2
			setTimeout(() => {
				step(finishX, pageIndex)
			}, 1000 / 60)
		} else {
			touchEndData(pageIndex)
		}
	}
	const touchStart = (e) => {
		if (isTouchEndAnimate.value) {
			return false
		}
		startX.value = e.changedTouches[0].pageX
	}
	const touchMove = (e) => {
		if (isTouchEndAnimate.value) {
			return false
		}
		moveX.value = e.changedTouches[0].pageX
		const pageX = moveX.value - startX.value
		translateX.value = pageX + endX.value
	}
	const touchEnd = (e) => {
		if (isTouchEndAnimate.value) {
			return false
		}
		isTouchEndAnimate.value = true
		const touchX = moveX.value - startX.value
		let pageIndex = props.pageIndex
		if (touchX > 100 && pageIndex > 0) {
			pageIndex -= 1
			swiperIndex.value -= 1
		}
		if (touchX < -100 && pageIndex < props.pages.length - 1) {
			pageIndex += 1
			swiperIndex.value += 1
		}
		const endpagex = -swiperIndex.value * props.windowWidth
		endX.value = endpagex
		step(endX.value, pageIndex)
	}

	function touchEndData(pageIndex) {
		isTouchEndAnimate.value = false
		swiperIndex.value = 1
		const endpagex = -swiperIndex.value * props.windowWidth
		endX.value = endpagex
		translateX.value = endpagex
		emit('updatePageIndex', pageIndex)
	}
	watch(() => props.windowWidth, (newVal) => {
		if (newVal > 0) {
			endX.value = -newVal
			translateX.value = -newVal
		}
	}, { immediate: true })
</script>

<style scoped>
	.swiper {
		position: relative;
    overflow: hidden;
	}

	.list {
		width: 300%;
		height: 100%;
		display: flex;
		position: absolute;
		left: 0;
		top: 0;
	}

</style>
