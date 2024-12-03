import{d as z,p as x,o as e,c as i,j as a,F as c,C as p,N as o,n as O,_ as W,a as _,G as b,w as m,k as y,B as k}from"./chunks/framework.DaWjvruP.js";import{R as B}from"./chunks/index.hFOXI6-D.js";const J=`<script setup lang="ts">\r
import { ref } from 'vue'\r
const chessOptions = ref({\r
	num: 20,\r
	padding: 20,\r
	size: 20,\r
	lineWidth: 1,\r
})\r
\r
const boardSize = ref({\r
	width: chessOptions.value.size * chessOptions.value.num,\r
	height: chessOptions.value.size * chessOptions.value.num,\r
})\r
const pieceList = ref(\r
	new Array(chessOptions.value.num + 1).fill(0).map((item, index) => {\r
		return {\r
			x: index + 1,\r
			yList: new Array(chessOptions.value.num + 1).fill(0).map((i, idx) => {\r
				return {\r
					y: idx + 1,\r
					status: '',\r
				}\r
			}),\r
		}\r
	}),\r
)\r
let status = 'black'\r
const selectPrice = (x, y) => {\r
	pieceList.value[x].yList[y].status = status\r
	status = status === 'black' ? 'white' : 'black'\r
}\r
<\/script>\r
<template>\r
	<div class="box-padd" :style="{ padding: chessOptions.padding + 'px', width: boardSize.width + 'px', height: boardSize.height + 'px' }">\r
		<div class="box">\r
			<div\r
				class="row"\r
				:style="{\r
					height: chessOptions.size + 'px',\r
					borderBottom: chessOptions.lineWidth + 'px solid #000',\r
					borderTop: idx == 0 ? chessOptions.lineWidth + 'px solid #000' : '',\r
				}"\r
				v-for="(i, idx) in chessOptions.num"\r
				:key="i"></div>\r
			<div class="col-box">\r
				<div\r
					class="col"\r
					:style="{\r
						width: chessOptions.size + 'px',\r
						borderRight: chessOptions.lineWidth + 'px solid #000',\r
						borderLeft: idx == 0 ? chessOptions.lineWidth + 'px solid #000' : '',\r
					}"\r
					v-for="(j, idx) in chessOptions.num"\r
					:key="j"></div>\r
			</div>\r
			<div\r
				class="piece-box"\r
				:style="{\r
					width: boardSize.width + chessOptions.size - chessOptions.lineWidth * 2 + 'px',\r
					height: boardSize.height + chessOptions.size - chessOptions.lineWidth * 2 + 'px',\r
					top: -chessOptions.size / 2 + chessOptions.lineWidth + 'px',\r
					left: -chessOptions.size / 2 + chessOptions.lineWidth + 'px',\r
				}">\r
				<div\r
					class="piece-row"\r
					:style="{ marginBottom: index < pieceList.length - 1 ? chessOptions.lineWidth * 2 + 'px' : 0 }"\r
					v-for="(item, index) in pieceList"\r
					:key="item.x">\r
					<div\r
						class="piece-col"\r
						:class="j.status ? j.status : ''"\r
						:style="{\r
							width: chessOptions.size - chessOptions.lineWidth * 2 + 'px',\r
							height: chessOptions.size - chessOptions.lineWidth * 2 + 'px',\r
							marginRight: index < pieceList.length - 1 ? chessOptions.lineWidth * 2 + 'px' : 0,\r
						}"\r
						@click="selectPrice(index, yIdx)"\r
						v-for="(j, yIdx) in item.yList"\r
						:key="j.y"></div>\r
				</div>\r
			</div>\r
		</div>\r
	</div>\r
</template>\r
\r
<style scoped>\r
.box-padd {\r
	background-color: antiquewhite;\r
	box-sizing: content-box;\r
}\r
.box {\r
	width: 100%;\r
	height: 100%;\r
	position: relative;\r
}\r
.row {\r
	box-sizing: border-box;\r
	position: relative;\r
}\r
/* .row:first-child {\r
	border-top: 1px solid #000;\r
} */\r
.col-box {\r
	width: 100%;\r
	height: 100%;\r
	position: absolute;\r
	top: 0;\r
	left: 0;\r
	display: flex;\r
}\r
.piece-box {\r
	position: absolute;\r
	display: flex;\r
	flex-direction: column;\r
}\r
.piece-row {\r
	display: flex;\r
}\r
.piece-col {\r
	position: relative;\r
}\r
.piece-col.black::after,\r
.piece-col.white::after {\r
	content: '';\r
	width: 100%;\r
	height: 100%;\r
	position: absolute;\r
	top: 0;\r
	left: 0;\r
	border-radius: 50%;\r
}\r
.piece-col.black::after {\r
	background-color: #000;\r
}\r
.piece-col.white::after {\r
	background-color: #fff;\r
}\r
</style>\r
`,L={class:"box"},C={class:"col-box"},U=["onClick"],N=z({__name:"checkerboard",setup(f){const t=x({num:20,padding:20,size:20,lineWidth:1}),s=x({width:t.value.size*t.value.num,height:t.value.size*t.value.num}),l=x(new Array(t.value.num+1).fill(0).map((u,d)=>({x:d+1,yList:new Array(t.value.num+1).fill(0).map((r,n)=>({y:n+1,status:""}))})));let h="black";const g=(u,d)=>{l.value[u].yList[d].status=h,h=h==="black"?"white":"black"};return(u,d)=>(e(),i("div",{class:"box-padd",style:o({padding:t.value.padding+"px",width:s.value.width+"px",height:s.value.height+"px"})},[a("div",L,[(e(!0),i(c,null,p(t.value.num,(r,n)=>(e(),i("div",{class:"row",style:o({height:t.value.size+"px",borderBottom:t.value.lineWidth+"px solid #000",borderTop:n==0?t.value.lineWidth+"px solid #000":""}),key:r},null,4))),128)),a("div",C,[(e(!0),i(c,null,p(t.value.num,(r,n)=>(e(),i("div",{class:"col",style:o({width:t.value.size+"px",borderRight:t.value.lineWidth+"px solid #000",borderLeft:n==0?t.value.lineWidth+"px solid #000":""}),key:r},null,4))),128))]),a("div",{class:"piece-box",style:o({width:s.value.width+t.value.size-t.value.lineWidth*2+"px",height:s.value.height+t.value.size-t.value.lineWidth*2+"px",top:-t.value.size/2+t.value.lineWidth+"px",left:-t.value.size/2+t.value.lineWidth+"px"})},[(e(!0),i(c,null,p(l.value,(r,n)=>(e(),i("div",{class:"piece-row",style:o({marginBottom:n<l.value.length-1?t.value.lineWidth*2+"px":0}),key:r.x},[(e(!0),i(c,null,p(r.yList,(v,w)=>(e(),i("div",{class:O(["piece-col",v.status?v.status:""]),style:o({width:t.value.size-t.value.lineWidth*2+"px",height:t.value.size-t.value.lineWidth*2+"px",marginRight:n<l.value.length-1?t.value.lineWidth*2+"px":0}),onClick:V=>g(n,w),key:v.y},null,14,U))),128))],4))),128))],4)])],4))}}),S=W(N,[["__scopeId","data-v-4a7d7528"]]),T=JSON.parse('{"title":"棋盘","description":"","frontmatter":{},"headers":[],"relativePath":"前端/3-1-示例/棋盘.md","filePath":"前端/3-1-示例/棋盘.md"}'),R={name:"前端/3-1-示例/棋盘.md"},Z=Object.assign(R,{setup(f){return(t,s)=>{const l=k("ClientOnly");return e(),i("div",null,[s[0]||(s[0]=a("h1",{id:"棋盘",tabindex:"-1"},[_("棋盘 "),a("a",{class:"header-anchor",href:"#棋盘","aria-label":'Permalink to "棋盘"'},"​")],-1)),b(l,null,{default:m(()=>[b(y(B),{title:"",description:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,vueCode:y(J)},{vue:m(()=>[b(S)]),_:1},8,["vueCode"])]),_:1})])}}});export{T as __pageData,Z as default};
