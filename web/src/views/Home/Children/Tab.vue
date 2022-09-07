<template>
  <div class="tab">
    <van-tabs v-model="active" animated swipeable sticky>
      <template #nav-left>
        <van-icon class-prefix="icon" name="faxian" size="0.2rem"></van-icon>
      </template>
      <van-tab title="关注">
        <template #title>
          <van-badge dot>
            关注
          </van-badge>
        </template>
        内容1
      </van-tab>
      <van-tab title="发现">
        内容 2
      </van-tab>
      <van-tab title="附近">
        内容 3
      </van-tab>
      <template #nav-right>
        <van-icon class-prefix="icon" name="search" size="0.2rem"></van-icon>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab, Badge } from "vant"
export default {
  name: "Tab",
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Badge.name]: Badge,
  },
  data() {
    return {
      active:1
    }
  },
}
</script>

<style lang="less" scoped>
  /deep/ .van-tab__text--ellipsis{
    overflow: visible;
  }
  .icon {
    flex: .8;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>