
<script setup>
  import nav from './.vitepress/nav.ts'
</script>
<ul>
  <li v-for="(item,index) in nav" :key="item.link">
    <a :href="item.link">{{item.text}}</a>
  </li>
</ul>
