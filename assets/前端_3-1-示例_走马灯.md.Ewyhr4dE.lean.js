import{d as f,p as _,c as t,o as e,j as i,F as o,B as d,t as c,_ as h,C as y,G as l,a as b,w as m,k as u}from"./chunks/framework.C-Bog4j8.js";import{R as x}from"./chunks/index.CE6Py4t8.js";const B=`<script setup lang="ts">\r
import { ref } from 'vue'\r
const list=ref(Array.from(new Array(6),(x,idx)=>idx+1))\r
<\/script>\r
<template>\r
	<div class="box">\r
		<div class="list list1">\r
			<div class="item" v-for="(item,idx) in list" :key="item">{{item}}</div>\r
		</div>\r
		<div class="list list2">\r
			<div class="item" v-for="(item,idx) in list" :key="item">{{item}}</div>\r
		</div>\r
	</div>\r
</template>\r
\r
<style scoped>\r
.box {\r
	width: 300px;\r
	height: 50px;\r
	overflow: hidden;\r
	position: relative;\r
}\r
.list {\r
	height: 100%;\r
	display: flex;\r
	position: absolute;\r
	top: 0;\r
	left: 0;\r
}\r
\r
.list1 {\r
	animation: move 5s linear infinite reverse;\r
}\r
.list2 {\r
	left: 100%;\r
	animation: move 5s linear infinite reverse;\r
}\r
.box:hover .list {\r
	animation-play-state: paused;\r
}\r
.item {\r
	width: 50px;\r
	height: 50px;\r
	background-color: rgba(255, 0, 255, 0.5);\r
}\r
.item:nth-child(even) {\r
	background-color: rgba(0, 255, 255, 0.5);\r
}\r
@keyframes move {\r
	to {\r
		transform: translateX(0);\r
	}\r
	from {\r
		transform: translateX(-100%);\r
	}\r
}\r
</style>\r
`,U={class:"box"},J={class:"list list1"},g={class:"list list2"},k=f({__name:"walking",setup(v){const a=_(Array.from(new Array(6),(n,s)=>s+1));return(n,s)=>(e(),t("div",U,[i("div",J,[(e(!0),t(o,null,d(a.value,(r,p)=>(e(),t("div",{class:"item",key:r},c(r),1))),128))]),i("div",g,[(e(!0),t(o,null,d(a.value,(r,p)=>(e(),t("div",{class:"item",key:r},c(r),1))),128))])]))}}),C=h(k,[["__scopeId","data-v-62c0bec8"]]),A=JSON.parse('{"title":"走马灯","description":"","frontmatter":{},"headers":[],"relativePath":"前端/3-1-示例/走马灯.md","filePath":"前端/3-1-示例/走马灯.md"}'),V={name:"前端/3-1-示例/走马灯.md"},F=Object.assign(V,{setup(v){return(a,n)=>{const s=y("ClientOnly");return e(),t("div",null,[n[0]||(n[0]=i("h1",{id:"走马灯",tabindex:"-1"},[b("走马灯 "),i("a",{class:"header-anchor",href:"#走马灯","aria-label":'Permalink to "走马灯"'},"​")],-1)),l(s,null,{default:m(()=>[l(u(x),{title:"",description:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,vueCode:u(B)},{vue:m(()=>[l(C)]),_:1},8,["vueCode"])]),_:1})])}}});export{A as __pageData,F as default};
