import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 统一样式
import "@/assets/default.css"
import "@/assets/iconfont/iconfont.css"

// 引入全局 icon toast
import {Icon,Toast,Dialog} from "vant"
Vue.use(Icon)
Vue.use(Toast)
Vue.use(Dialog)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
