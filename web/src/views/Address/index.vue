<template>
  <div class="site">
    <!-- 搜索框 form给移动端苹果系统显示搜索按钮 -->
    <form action="/" class="search" ref="search">
      <van-search v-model="value" shape="round" show-action placeholder="搜索地点" @search="onSearch" @cancel="onCancel" />
    </form>
    <!-- 搜索框固定定位占位盒子 -->
    <div style="margin-bottom:0.05rem" :style="{width:width+'px',height:height+'px'}"></div>
    <!-- 地址列表 -->
    <van-list v-model="loading" offset="50" :finished="finished" finished-text="- THE END -" @load="onLoad">
      <van-cell @click="onSign(-1)" title-style="height:0.3rem">
        <template #title>
          不显示位置
        </template>
        <template #right-icon>
          <van-icon name="success" :class="{sign:sign==-1}" class="active" color="red" size="0.25rem" />
        </template>
      </van-cell>
      <van-cell v-for="(item,index) in addressList" :key="item.uid" @click="onSign(index,item)" title-class="title">
        <template #title>
          {{item.name}}<span class="address">{{item.address}}</span>
        </template>
        <!-- 选中标志 -->
        <template #right-icon>
          <van-icon name="success" color="red" size="0.25rem" class="active" :class="{sign:sign==index}" />
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { Search, List, Cell } from "vant"
import { getAddress } from "@/api"
export default {
  name: "Site",
  components: {
    [Search.name]: Search,
    [List.name]: List,
    [Cell.name]: Cell
  },
  data() {
    return {
      value: "",
      loading: false,
      finished: false,
      addressList: [],
      address: {},
      sign: -1,
      height: 0,
      width: 0,
      page: 0,
    }
  },
  async mounted() {
    // 响应搜索框的宽高
    this.getWidthAndHeight()
    let result = await this.getLocation(JSON.parse(localStorage.getItem("point")),this.page)||{}
    this.addressList = result.results
    // 地址信息
    this.address = this.$route.params.address || {}
    // 判断进入选址页面是是否带有地址
    this.sign = this.filterId(this.addressList, this.address)
  },
  methods: {
    filterId(list, item) {
      let sign = -1
      // 判断是否有地址id 没有就直接返回默认参数 有就在地址列表查返回下标
      if (item.uid) {
          sign = list.findIndex((el) => {
          return el.uid == item.uid
        })
        return sign == -1 ? -2 : sign
      }else{
        return sign
      }

    },
    onSearch(val) {

    },
    onCancel() {
      this.$router.push({ name: "Upload", params: { item:this.address } })
    },
    // 获取附近地点 
    async getLocation(point = { x: 116.397128, y: 39.916527 }, page = 0) {
      const result = await getAddress(point, page)
      return result
    },
    // 列表滚动到底部触发
    async onLoad() {
      // 请求数据
      // 请求页数
      this.page = ++this.page
      let result = await this.getLocation(JSON.parse(localStorage.getItem("point")), this.page)
      // 合并数组
      // console.log(result);
      this.addressList.push(...result.results)
      this.sign = this.filterId(this.addressList,this.address)
      // 加载状态结束
      this.loading = false
      // 数据加载完毕
      if (this.addressList.length >= result.total) {
        this.finished = true
      }
    },
    // 点击选中被勾选的值 并带着地址信息跳转到upload
    onSign(index, item) {
      this.sign = index
      this.$router.push({ name: "Upload", params: { item,index } })
    },
    // 或取搜索框的宽高
    getWidthAndHeight() {
      this.height = this.$refs.search.offsetHeight
      this.width = this.$refs.search.offsetWidth
    }
  },
}
</script>

<style lang="less" scoped>
@font-size1: 0.12rem;
@font-size2: 0.14rem;

.search {
  width: 100%;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
}

.address {
  display: block;
  // padding-top:0.0rem;
  font-size: @font-size1;
  color: #aaa;
}

.active {
  display: none;
}

.sign {
  display: block;
}

.title {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: @font-size2;
  height: @font-size1+@font-size2*2;
}
</style>