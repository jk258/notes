<script setup>
import NovelSwiper from './NovelSwiper.vue'
import { ref } from 'vue'

const pages = ref([
	{
		content: '第一页',
		background: 'red',
	},
	{
		content: '第二页',
		background: 'blue',
	},
	{
		content: '第三页',
		background: 'yellow',
	},
	{
		content: '第四页',
		background: 'green',
	},
	{
		content: '第五页',
		background: 'pink',
	},
])
const pageIndex = ref(0)
const windowWidth = ref(280)
const windowHeight = ref(400)
const updatePageIndex = (index) => {
	pageIndex.value = index
}
</script>
<template>
	<NovelSwiper :pages="pages" :pageIndex="pageIndex" :windowWidth="windowWidth" :windowHeight="windowHeight" @updatePageIndex="updatePageIndex">
		<template v-slot="slotProps">
			<div style="width: 100%;height: 100%;box-sizing: border-box;border: 1px solid #000;">{{ slotProps.item.content }}</div>
		</template>
	</NovelSwiper>
</template>

<style scoped></style>
