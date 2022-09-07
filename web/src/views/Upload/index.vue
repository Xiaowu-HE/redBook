<template>
  <div class="upload">
    <van-nav-bar fixed placeholder safe-area-inset-top @click-left="onClickLeft" @click-right="onClickRight">
      <template #left>
        <van-icon name="arrow-left" color="#aaa" size="0.22rem" />
      </template>
      <template #right>
        <van-icon name="warning-o" color="#aaa" size="0.22rem" />
      </template>
    </van-nav-bar>
    <van-form>
      <van-field name="uploader">
        <template #input>
          <van-uploader>

          </van-uploader>
        </template>
      </van-field>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, NavBar, Dialog, Uploader } from "vant"
export default {
  name: "Upload",
  data() {
    return {

    }
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [NavBar.name]: NavBar,
    [Uploader.name]: Uploader,
  },
  methods: {
    onClickLeft() {
      history.back()
    },
    onClickRight() {
      Dialog.alert({
        title: '发布小贴士',
        message: '1.请不要发布违法内容，不文明用语\n2.富强、民主、文明、和谐、自由、平等、公正、法治，爱国、敬业、诚信、友善',
        theme: 'round-button',
        confirmButtonText: "我知道了",
        confirmButtonColor: "red",
        messageAlign:"left"
      }).then(() => {
        // on close
      });

    }
  },
}
</script>

<style lang="less" scoped>
</style>