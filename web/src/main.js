import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 统一样式
import "@/assets/default.css"
import "@/assets/iconfont/iconfont.css"

// 应入全局vant icon
import {Icon} from "vant"
Vue.use(Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
