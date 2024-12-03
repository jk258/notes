<script setup lang="ts">
import { ref } from 'vue'
const chessOptions = ref({
	num: 20,
	padding: 20,
	size: 20,
	lineWidth: 1,
})

const boardSize = ref({
	width: chessOptions.value.size * chessOptions.value.num,
	height: chessOptions.value.size * chessOptions.value.num,
})
const pieceList = ref(
	new Array(chessOptions.value.num + 1).fill(0).map((item, index) => {
		return {
			x: index + 1,
			yList: new Array(chessOptions.value.num + 1).fill(0).map((i, idx) => {
				return {
					y: idx + 1,
					status: '',
				}
			}),
		}
	}),
)
let status = 'black'
const selectPrice = (x, y) => {
	pieceList.value[x].yList[y].status = status
	status = status === 'black' ? 'white' : 'black'
}
</script>
<template>
	<div class="box-padd" :style="{ padding: chessOptions.padding + 'px', width: boardSize.width + 'px', height: boardSize.height + 'px' }">
		<div class="box">
			<div
				class="row"
				:style="{
					height: chessOptions.size + 'px',
					borderBottom: chessOptions.lineWidth + 'px solid #000',
					borderTop: idx == 0 ? chessOptions.lineWidth + 'px solid #000' : '',
				}"
				v-for="(i, idx) in chessOptions.num"
				:key="i"></div>
			<div class="col-box">
				<div
					class="col"
					:style="{
						width: chessOptions.size + 'px',
						borderRight: chessOptions.lineWidth + 'px solid #000',
						borderLeft: idx == 0 ? chessOptions.lineWidth + 'px solid #000' : '',
					}"
					v-for="(j, idx) in chessOptions.num"
					:key="j"></div>
			</div>
			<div
				class="piece-box"
				:style="{
					width: boardSize.width + chessOptions.size - chessOptions.lineWidth * 2 + 'px',
					height: boardSize.height + chessOptions.size - chessOptions.lineWidth * 2 + 'px',
					top: -chessOptions.size / 2 + chessOptions.lineWidth + 'px',
					left: -chessOptions.size / 2 + chessOptions.lineWidth + 'px',
				}">
				<div
					class="piece-row"
					:style="{ marginBottom: index < pieceList.length - 1 ? chessOptions.lineWidth * 2 + 'px' : 0 }"
					v-for="(item, index) in pieceList"
					:key="item.x">
					<div
						class="piece-col"
						:class="j.status ? j.status : ''"
						:style="{
							width: chessOptions.size - chessOptions.lineWidth * 2 + 'px',
							height: chessOptions.size - chessOptions.lineWidth * 2 + 'px',
							marginRight: index < pieceList.length - 1 ? chessOptions.lineWidth * 2 + 'px' : 0,
						}"
						@click="selectPrice(index, yIdx)"
						v-for="(j, yIdx) in item.yList"
						:key="j.y"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.box-padd {
	background-color: antiquewhite;
	box-sizing: content-box;
}
.box {
	width: 100%;
	height: 100%;
	position: relative;
}
.row {
	box-sizing: border-box;
	position: relative;
}
/* .row:first-child {
	border-top: 1px solid #000;
} */
.col-box {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
}
.piece-box {
	position: absolute;
	display: flex;
	flex-direction: column;
}
.piece-row {
	display: flex;
}
.piece-col {
	position: relative;
}
.piece-col.black::after,
.piece-col.white::after {
	content: '';
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 50%;
}
.piece-col.black::after {
	background-color: #000;
}
.piece-col.white::after {
	background-color: #fff;
}
</style>
