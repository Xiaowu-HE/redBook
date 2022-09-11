<template>
  <div class="upload">
    <!-- 头部 -->
    <van-nav-bar fixed placeholder safe-area-inset-top @click-left="onClickLeft" @click-right="onClickRight">
      <template #left>
        <van-icon name="arrow-left" color="#aaa" size="0.22rem" />
      </template>
      <template #right>
        <van-icon name="warning-o" color="#aaa" size="0.22rem" />
      </template>
      <!-- 头部结束 -->
    </van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit" validate-trigger="onSubmit">
      <!-- 图片上传 -->
      <van-field name="uploader" :border="false" :rules="[
        {
          required: fileList,
          message: () => {
            $toast('至少需要一张图片');
          },
        },
      ]">
        <template #input>
          <van-uploader v-model="fileList" preview-size="1.05rem" multiple max-count="6" :max-size="3000 * 1024"
            @oversize="onOversize">
            <div class="uploader">
              <van-icon name="plus" size="0.3rem" color="#ddd" />
            </div>
          </van-uploader>
        </template>
        <!-- 图片上传结束 -->
      </van-field>
      <!-- 笔记标题 -->
      <van-field class="title" :rules="[
        // 验证内容不能为空
        {
          validator: () => title != '',
          message: () => {
            $toast('请输入标题');
          },
        },
      ]" v-model="title" name="title" placeholder="请输入标题(10)" maxlength="10" />
      <!-- 笔记内容 -->
      <van-field v-model="content" :rules="[
        // 验证 内容 不能为空
        {
          validator: () => content != '',
          message: () => {
            $toast('请输入内容');
          },
        },
      ]" type="textarea" name="content" placeholder="输入内容前请先看右上角发布小贴士" maxlength="200" show-word-limit />
      <!-- 选择位置 -->
      <van-field @click="$router.push({name:'Address',params:{address}})" v-model="addressName" name="addressName" right-icon="arrow">
        <!-- 左侧图标 -->
        <template #left-icon>
          <van-icon name="location-o" :color="color" size="0.16rem" />
        </template>
        <!-- 默认添加地点 -->
        <template #input>
          <input :value="addressName" class="input" placeholder="添加地点" :style="{color:color}" />
        </template>
      </van-field>
      <div class="btn">
        <van-button round block color="red" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <van-overlay :show="show">
      <van-loading color="red" size="0.4rem" />
    </van-overlay>
  </div>
</template>

<script>
import { Form, Field, NavBar, Uploader, Button, Loading,Overlay} from "vant";
import { getPlace } from "@/api"
export default {
  name: "Upload",
  data() {
    return {
      fileList: [],
      title: "",
      content: "",
      addressName: "",
      color: 'black',
      address: {},
      show:false,
    };
  },
  // 退出此路由页面是提示是否退出
  beforeRouteLeave(to, from, next) {
    // 判断是否有值，有值就提示保存退出，没有值就直接退出
    if (to.fullPath != "/address"&&(this.title||this.content||this.addressName||this.fileList[0])) {
      this.$dialog.confirm({
        message: "退出并保存"
      }).then(() => {
        next()
      }).catch(() => {

      })
    }else{
      next()
    }
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [NavBar.name]: NavBar,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Loading.name]: Loading,
    [Overlay.name]: Overlay,
  },
  mounted() {
    let index = this.$route.params.index
    console.log(index);
    this.address = this.$route.params.item || {}
    console.log(this.address);
    this.addressName = index!=-1 ? this.address.name : ''
    console.log(this.addressName);
    // 获取会话存储里面的数据
    let {title,content,fileList,addressName} = sessionStorage
    this.title = title || ''
    this.content = content || ''
    this.fileList = fileList? JSON.parse(fileList) : []
    this.addressName = (index==-1 ? '' : this.address.name) || addressName
    // 查看路由是否携带了新的地址
  },
  methods: {
    // 标题栏 左上角返回按钮
    onClickLeft() {
      let path = this.$route.meta.path
      if (path) {
        this.$router.push(path)
      } else {
        this.$router.push('/home')
      }
    },
    // 标题栏 右上角发布提示
    onClickRight() {
      Dialog.alert({
        title: "发布小贴士",
        message:
          "1.请不要发布违法内容，不文明用语\n2.富强、民主、文明、和谐、自由、平等、公正、法治，爱国、敬业、诚信、友善",
        theme: "round-button",
        confirmButtonText: "我知道了",
        confirmButtonColor: "red",
        messageAlign: "left",
      }).then(() => {
        // on close
      });
    },
    // 限制图片大小
    onOversize(file) {
      this.$toast("照片大小不能超过3Mb");
    },
    // 提交按钮
    onSubmit(value) {
      console.log(value);
      this.show = true
      setTimeout(() => {
        sessionStorage.clear()
        this.fileList = []
        this.title = ''
        this.content = ''
        this.addressName = ''
        this.show = false
      }, 5000);
      
    },
    // 获取经纬度 
    async setAddress() {
      if (!localStorage.getItem("point")) {
        const result = await getPlace()
        localStorage.setItem("point", JSON.stringify(result.content.point))
      }
    },
  },
  watch: {
    // 监听是否选择地址 选择就保存在会话存储
    addressName(value,old) {
      console.log("新："+value+"久的："+old);
      value ? this.color = 'blue' : this.color = 'black'
      sessionStorage.setItem("addressName",value)
    },
    title(value){
      sessionStorage.setItem("title",value)
    },
    fileList(value){
      value = JSON.stringify(value)
      sessionStorage.setItem("fileList",value)
    },
    content(value){
      sessionStorage.setItem("content",value)
    }
  },
};
</script>

<style lang="less" scoped>
.uploader {
  width: 0.8rem;
  height: 0.8rem;
  border: 1px solid #aaa;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 0.2rem;

  /deep/ .van-field__control::placeholder {
    color: #999;
  }

  /deep/ .van-field__control:-moz-placeholder {
    color: #999;
  }

  /deep/ .van-field__control::-webkit-input-placeholder {
    color: #999;
  }
}

.input {
  width: 100%;
  outline: none;
  border: none;
  font-size: 0.12rem;
}

.btn {
  width: 100%;
  padding: 0.16rem;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>