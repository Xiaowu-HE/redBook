<template>
  <div id="app">
    <router-view></router-view>
    <nav-vue v-show="$route.meta.show"></nav-vue>
  </div>
</template>

<script>
import NavVue from './components/Nav.vue';
export default {
  name:"App",
  components:{
    NavVue
  },
  data() {
    return {
      width:document.documentElement.clientWidth,
      height:document.documentElement.clientHeight
    }
  },
  methods:{
    
    // 比较浏览器可见区域的宽高
    compareVwAndVh(){
      if(this.width<this.height){
        document.getElementsByTagName('html')[0].style.fontSize = '26.66667vw'
      }else{
        document.getElementsByTagName('html')[0].style.fontSize = '26.66667vh'
      }
    }
  },
  mounted(){
    this.compareVwAndVh()
    // 监听浏览器宽高
    window.onresize = ()=>{
      this.width = document.documentElement.clientWidth
      this.height = document.documentElement.clientHeight
      this.compareVwAndVh()
    }
  },
}
</script>

<style lang="less">
</style>
