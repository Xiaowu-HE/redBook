import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes"
Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass:"active"
})

// 全局前置守卫
router.beforeEach((to,from,next)=>{

  next()
})

// 全局后置守卫 
router.afterEach((to,from)=>{
  // 更改网页标题
  document.title = to.meta.title

})

export default router
