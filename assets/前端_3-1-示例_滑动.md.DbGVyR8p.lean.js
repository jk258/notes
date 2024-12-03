import{_ as D,p as n,h as C,o as m,c as I,j as u,r as N,N as f,n as A,b as H,w as y,t as J,e as U,q as V,F as z,C as _,a as B,G as x,k as W,B as $}from"./chunks/framework.DaWjvruP.js";import{R as S}from"./chunks/index.hFOXI6-D.js";const Z=`<script setup>\r
import NovelSimulation from './NovelSimulation.vue'\r
import { ref } from 'vue'\r
\r
const pages = ref([\r
	{\r
		content: '第一页',\r
		background: 'red',\r
	},\r
	{\r
		content: '第二页',\r
		background: 'blue',\r
	},\r
	{\r
		content: '第三页',\r
		background: 'yellow',\r
	},\r
	{\r
		content: '第四页',\r
		background: 'green',\r
	},\r
	{\r
		content: '第五页',\r
		background: 'pink',\r
	},\r
])\r
const pageIndex = ref(0)\r
const windowWidth = ref(280)\r
const windowHeight = ref(400)\r
const updatePageIndex = (index) => {\r
	pageIndex.value = index\r
}\r
<\/script>\r
<template>\r
	<NovelSimulation :pages="pages" :pageIndex="pageIndex" :windowWidth="windowWidth" :windowHeight="windowHeight" @updatePageIndex="updatePageIndex">\r
		<template v-slot="slotProps">\r
			<div :style="{width:windowWidth+'px',height:windowHeight+'px',}" style="box-sizing: border-box;border: 1px solid #000;background-color: #fff;">{{ slotProps.item.content }}</div>\r
		</template>\r
	</NovelSimulation>\r
</template>\r
\r
<style scoped></style>\r
`,E={__name:"NovelSimulation",props:{windowWidth:{type:Number,default:0},windowHeight:{type:Number,default:0},pages:{type:Array,default:()=>[]},pageIndex:{type:Number,default:0}},emits:["updatePageIndex"],setup(a,{emit:w}){const e=a,p=w,i=n(0),s=n(0),r=n(0),c=n(0),d=n(!1),l=n(0),h=C(()=>s.value<r.value),b=C(()=>{let t=e.pages[e.pageIndex];return l.value!=0&&(t=s.value<r.value?e.pages[e.pageIndex-1]:e.pages[e.pageIndex+1]),t});function k(t,o){const g=t-l.value;Math.abs(g)>1?(l.value=l.value+g*.2,setTimeout(()=>{k(t,o)},1e3/60)):(d.value=!1,i.value=0,c.value=0,l.value=c.value,p("updatePageIndex",o))}const T=t=>{d.value||(s.value=t.changedTouches[0].pageX,r.value=t.changedTouches[0].pageX)},X=t=>{d.value||(r.value=t.changedTouches[0].pageX,c.value=r.value-s.value,l.value=c.value)},v=t=>{if(d.value)return;d.value=!0;let o=e.pageIndex;const g=r.value-s.value;g>100&&o>0&&(o-=1,i.value-=1),g<-100&&o<e.pages.length-1&&(o+=1,i.value+=1),c.value=-i.value*e.windowWidth,k(c.value,o)};return(t,o)=>(m(),I("div",{class:A(["yingbing-flip",{"left-to-right":h.value}]),onTouchstart:T,onTouchmove:X,onTouchend:v,style:f({width:a.windowWidth+"px",height:a.windowHeight+"px"})},[u("div",null,[N(t.$slots,"default",{item:b.value},void 0,!0)]),u("div",{class:"yingbing-flip-item",style:f({transform:`translateX(${l.value}px)`,opacity:l.value!=0?1:0})},[u("div",{style:f([{height:"100%"},{transform:`translateX(${-l.value}px)`}])},[N(t.$slots,"default",{item:a.pages[a.pageIndex]},void 0,!0)],4),u("div",{class:"yingbing-flip-item-bg",style:f([{transform:`translateX(${h.value?-(a.windowWidth-Math.abs(l.value)):a.windowWidth-Math.abs(l.value)}px)`},{background:"#fff"}])},null,4),o[0]||(o[0]=u("div",{class:"yingbing-flip-item-shadow"},null,-1))],4)],38))}},R=D(E,[["__scopeId","data-v-774aefde"]]),F={__name:"SimulationDemo",setup(a){const w=n([{content:"第一页",background:"red"},{content:"第二页",background:"blue"},{content:"第三页",background:"yellow"},{content:"第四页",background:"green"},{content:"第五页",background:"pink"}]),e=n(0),p=n(280),i=n(400),s=r=>{e.value=r};return(r,c)=>(m(),H(R,{pages:w.value,pageIndex:e.value,windowWidth:p.value,windowHeight:i.value,onUpdatePageIndex:s},{default:y(d=>[u("div",{style:f([{width:p.value+"px",height:i.value+"px"},{"box-sizing":"border-box",border:"1px solid #000","background-color":"#fff"}])},J(d.item.content),5)]),_:1},8,["pages","pageIndex","windowWidth","windowHeight"]))}},L=`<script setup>\r
import NovelCover from './NovelCover.vue'\r
import { ref } from 'vue'\r
\r
const pages = ref([\r
	{\r
		content: '第一页',\r
		background: 'red',\r
	},\r
	{\r
		content: '第二页',\r
		background: 'blue',\r
	},\r
	{\r
		content: '第三页',\r
		background: 'yellow',\r
	},\r
	{\r
		content: '第四页',\r
		background: 'green',\r
	},\r
	{\r
		content: '第五页',\r
		background: 'pink',\r
	},\r
])\r
const pageIndex = ref(0)\r
const windowWidth = ref(280)\r
const windowHeight = ref(400)\r
const updatePageIndex = (index) => {\r
	pageIndex.value = index\r
}\r
<\/script>\r
<template>\r
	<NovelCover :pages="pages" :pageIndex="pageIndex" :windowWidth="windowWidth" :windowHeight="windowHeight" @updatePageIndex="updatePageIndex">\r
		<template v-slot="slotProps">\r
			<div style="width: 100%;height: 100%;box-sizing: border-box;border: 1px solid #000;background-color: #fff;">{{ slotProps.item.content }}</div>\r
		</template>\r
	</NovelCover>\r
</template>\r
\r
<style scoped></style>\r
`,M={__name:"NovelCover",props:{windowWidth:{type:Number,default:0},windowHeight:{type:Number,default:0},pages:{type:Array,default:()=>[]},pageIndex:{type:Number,default:0}},emits:["updatePageIndex"],setup(a,{emit:w}){const e=a,p=w,i=n(!1),s=n(0),r=n(0),c=n(0),d=n(0),l=n(0);function h(v,t){const o=v-l.value;Math.abs(o)>1?(l.value=l.value+o*.2,setTimeout(()=>{h(v,t)},1e3/60)):(i.value=!1,s.value=0,d.value=0,l.value=d.value,p("updatePageIndex",t))}const b=C(()=>!(c.value-r.value>0)),k=v=>{i.value||(r.value=v.changedTouches[0].pageX)},T=v=>{if(i.value)return;c.value=v.changedTouches[0].pageX;const t=c.value-r.value;l.value=t+d.value},X=v=>{if(i.value)return;i.value=!0;let t=e.pageIndex;const o=c.value-r.value;o>100&&t>0&&(t-=1,s.value-=1),o<-100&&t<e.pages.length-1&&(t+=1,s.value+=1),d.value=-s.value*e.windowWidth,h(d.value,t)};return(v,t)=>(m(),I("div",{class:"list",onTouchstart:k,onTouchmove:T,onTouchend:X,style:f({width:a.windowWidth+"px",height:a.windowHeight+"px"})},[a.pages[a.pageIndex-1]?(m(),I("div",{key:0,class:"page pre",style:f({zIndex:b.value?1:2,transform:`translateX(${b.value?"-100%":0})`})},[N(v.$slots,"default",{item:a.pages[a.pageIndex-1]},void 0,!0)],4)):U("",!0),u("div",{class:"page cur",style:f({transform:`translateX(${l.value}px)`})},[N(v.$slots,"default",{item:a.pages[a.pageIndex]},void 0,!0)],4),a.pages[a.pageIndex+1]?(m(),I("div",{key:1,class:"page next",style:f({zIndex:b.value?2:1,transform:`translateX(${b.value?0:"100%"})`})},[N(v.$slots,"default",{item:a.pages[a.pageIndex+1]},void 0,!0)],4)):U("",!0)],36))}},O=D(M,[["__scopeId","data-v-6d9fa7a3"]]),G={style:{width:"100%",height:"100%","box-sizing":"border-box",border:"1px solid #000","background-color":"#fff"}},q={__name:"CoverDemo",setup(a){const w=n([{content:"第一页",background:"red"},{content:"第二页",background:"blue"},{content:"第三页",background:"yellow"},{content:"第四页",background:"green"},{content:"第五页",background:"pink"}]),e=n(0),p=n(280),i=n(400),s=r=>{e.value=r};return(r,c)=>(m(),H(O,{pages:w.value,pageIndex:e.value,windowWidth:p.value,windowHeight:i.value,onUpdatePageIndex:s},{default:y(d=>[u("div",G,J(d.item.content),1)]),_:1},8,["pages","pageIndex","windowWidth","windowHeight"]))}},j=`<script setup>\r
import NovelSwiper from './NovelSwiper.vue'\r
import { ref } from 'vue'\r
\r
const pages = ref([\r
	{\r
		content: '第一页',\r
		background: 'red',\r
	},\r
	{\r
		content: '第二页',\r
		background: 'blue',\r
	},\r
	{\r
		content: '第三页',\r
		background: 'yellow',\r
	},\r
	{\r
		content: '第四页',\r
		background: 'green',\r
	},\r
	{\r
		content: '第五页',\r
		background: 'pink',\r
	},\r
])\r
const pageIndex = ref(0)\r
const windowWidth = ref(280)\r
const windowHeight = ref(400)\r
const updatePageIndex = (index) => {\r
	pageIndex.value = index\r
}\r
<\/script>\r
<template>\r
	<NovelSwiper :pages="pages" :pageIndex="pageIndex" :windowWidth="windowWidth" :windowHeight="windowHeight" @updatePageIndex="updatePageIndex">\r
		<template v-slot="slotProps">\r
			<div style="width: 100%;height: 100%;box-sizing: border-box;border: 1px solid #000;">{{ slotProps.item.content }}</div>\r
		</template>\r
	</NovelSwiper>\r
</template>\r
\r
<style scoped></style>\r
`,Q={__name:"NovelSwiper",props:{windowWidth:{type:Number,default:0},windowHeight:{type:Number,default:0},pages:{type:Array,default:()=>[]},pageIndex:{type:Number,default:0}},emits:["updatePageIndex"],setup(a,{emit:w}){const e=a,p=w,i=C(()=>{const t=[null,e.pages[e.pageIndex],e.pages[e.pageIndex+1]];return t[0]=e.pageIndex-1>=0?e.pages[e.pageIndex-1]:null,t}),s=n(1),r=n(0),c=n(0),d=n(0),l=n(!1),h=n(0);function b(t,o){const g=t-h.value;Math.abs(g)>1?(h.value=h.value+g*.2,setTimeout(()=>{b(t,o)},1e3/60)):v(o)}const k=t=>{if(l.value)return!1;r.value=t.changedTouches[0].pageX},T=t=>{if(l.value)return!1;c.value=t.changedTouches[0].pageX;const o=c.value-r.value;h.value=o+d.value},X=t=>{if(l.value)return!1;l.value=!0;const o=c.value-r.value;let g=e.pageIndex;o>100&&g>0&&(g-=1,s.value-=1),o<-100&&g<e.pages.length-1&&(g+=1,s.value+=1);const P=-s.value*e.windowWidth;d.value=P,b(d.value,g)};function v(t){l.value=!1,s.value=1;const o=-s.value*e.windowWidth;d.value=o,h.value=o,p("updatePageIndex",t)}return V(()=>e.windowWidth,t=>{t>0&&(d.value=-t,h.value=-t)},{immediate:!0}),(t,o)=>(m(),I("div",{class:"swiper",onTouchstart:k,onTouchmove:T,onTouchend:X,style:f({width:a.windowWidth+"px",height:a.windowHeight+"px"})},[u("div",{class:"list",style:f({transform:`translateX(${h.value}px)`})},[(m(!0),I(z,null,_(i.value,(g,P)=>(m(),I("div",{style:{flex:"1"},key:P},[g?N(t.$slots,"default",{key:0,item:g},void 0,!0):U("",!0)]))),128))],4)],36))}},Y=D(Q,[["__scopeId","data-v-c585f8c0"]]),K={style:{width:"100%",height:"100%","box-sizing":"border-box",border:"1px solid #000"}},ee={__name:"SwiperDemo",setup(a){const w=n([{content:"第一页",background:"red"},{content:"第二页",background:"blue"},{content:"第三页",background:"yellow"},{content:"第四页",background:"green"},{content:"第五页",background:"pink"}]),e=n(0),p=n(280),i=n(400),s=r=>{e.value=r};return(r,c)=>(m(),H(Y,{pages:w.value,pageIndex:e.value,windowWidth:p.value,windowHeight:i.value,onUpdatePageIndex:s},{default:y(d=>[u("div",K,J(d.item.content),1)]),_:1},8,["pages","pageIndex","windowWidth","windowHeight"]))}},oe=JSON.parse('{"title":"滑动","description":"","frontmatter":{},"headers":[{"level":2,"title":"平移","slug":"平移","link":"#平移","children":[]},{"level":2,"title":"覆盖","slug":"覆盖","link":"#覆盖","children":[]},{"level":2,"title":"仿真","slug":"仿真","link":"#仿真","children":[]}],"relativePath":"前端/3-1-示例/滑动.md","filePath":"前端/3-1-示例/滑动.md"}'),te={name:"前端/3-1-示例/滑动.md"},re=Object.assign(te,{setup(a){return(w,e)=>{const p=$("ClientOnly");return m(),I("div",null,[e[0]||(e[0]=u("h1",{id:"滑动",tabindex:"-1"},[B("滑动 "),u("a",{class:"header-anchor",href:"#滑动","aria-label":'Permalink to "滑动"'},"​")],-1)),e[1]||(e[1]=u("p",null,"在移动端查看",-1)),e[2]||(e[2]=u("h2",{id:"平移",tabindex:"-1"},[B("平移 "),u("a",{class:"header-anchor",href:"#平移","aria-label":'Permalink to "平移"'},"​")],-1)),x(p,null,{default:y(()=>[x(W(S),{title:"",description:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,vueCode:W(j)},{vue:y(()=>[x(ee)]),_:1},8,["vueCode"])]),_:1}),e[3]||(e[3]=u("h2",{id:"覆盖",tabindex:"-1"},[B("覆盖 "),u("a",{class:"header-anchor",href:"#覆盖","aria-label":'Permalink to "覆盖"'},"​")],-1)),x(p,null,{default:y(()=>[x(W(S),{title:"",description:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,vueCode:W(L)},{vue:y(()=>[x(q)]),_:1},8,["vueCode"])]),_:1}),e[4]||(e[4]=u("h2",{id:"仿真",tabindex:"-1"},[B("仿真 "),u("a",{class:"header-anchor",href:"#仿真","aria-label":'Permalink to "仿真"'},"​")],-1)),x(p,null,{default:y(()=>[x(W(S),{title:"",description:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,vueCode:W(Z)},{vue:y(()=>[x(F)]),_:1},8,["vueCode"])]),_:1})])}}});export{oe as __pageData,re as default};
