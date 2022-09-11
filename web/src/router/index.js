import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes"
Vue.use(VueRouter)



// 先把VueRouter原形对象的push，先保存有一份
let originPush  = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace

VueRouter.prototype.push = function(location,resolve,reject) {
  if(resolve&&reject){
    // call||apply区别
    // 相同点，都可以调用函数一次，都可以篡改函数上下文一次
    // 不同点，call 与 apply传递参数：call 传递参数用逗号隔开，apply 方法执行，传递数组
    originPush.call(this,location,resolve,reject)
  }else {
    originPush.call(this,location,()=>{},()=>{})
  }
}

VueRouter.prototype.replace = function(location,resolve,reject) {
  if(resolve&&reject){
    originReplace.call(this,location,resolve,reject)
  }else {
    originPush.call(this,location,()=>{},()=>{})
  }
}




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass:"active"
})

// 全局前置守卫
router.beforeEach((to,from,next)=>{
  let path = to.fullPath
  let token = true
  if(path=='/upload'||path=='/address'){
    if(token){
      next()
    }else{
      next("/home")
    }
  }else{
    next()
  }
})

// 全局后置守卫 
router.afterEach((to,from)=>{
  // 更改网页标题
  document.title = to.meta.title

})

export default router
