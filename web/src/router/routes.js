import Home from "@/views/Home"

const routes = [
  {
    path: "/home",
    component: Home,
    name: "Home",
    meta: {
      title:"首页",
      show: true
    },
  },
  {
    path: "/shop",
    component: () => import("@/views/Shop"),
    name:"Shop",
    meta:{
      title:"购物",
      show:true
    }
  },
  {
    path: "/message",
    component: () => import("@/views/Message"),
    name:"Message",
    meta:{
      title:"消息",
      show:true
    }
  },
  {
    path: "/person",
    component: () => import("@/views/Person"),
    name:"Person",
    meta:{
      title:"个人",
      show:true
    }
  },
  {
    path: "/upload",
    component: () => import("@/views/Upload"),
    name:"Upload",
    meta:{
      title: "发布笔记",
      show:false
    }
  },
  {
    path:"/",
    redirect:"/home"
  }
]

export default routes