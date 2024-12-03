<script setup lang="ts">
import { ref } from 'vue'
const list=ref(Array.from(new Array(6),(x,idx)=>idx+1))
</script>
<template>
	<div class="box">
		<div class="list list1">
			<div class="item" v-for="(item,idx) in list" :key="item">{{item}}</div>
		</div>
		<div class="list list2">
			<div class="item" v-for="(item,idx) in list" :key="item">{{item}}</div>
		</div>
	</div>
</template>

<style scoped>
.box {
	width: 300px;
	height: 50px;
	overflow: hidden;
	position: relative;
}
.list {
	height: 100%;
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
}

.list1 {
	animation: move 5s linear infinite reverse;
}
.list2 {
	left: 100%;
	animation: move 5s linear infinite reverse;
}
.box:hover .list {
	animation-play-state: paused;
}
.item {
	width: 50px;
	height: 50px;
	background-color: rgba(255, 0, 255, 0.5);
}
.item:nth-child(even) {
	background-color: rgba(0, 255, 255, 0.5);
}
@keyframes move {
	to {
		transform: translateX(0);
	}
	from {
		transform: translateX(-100%);
	}
}
</style>
