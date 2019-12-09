import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/content/User'
import Index from '@/components/index/Index'
import Login from '@/components/login/Login'

Vue.use(Router)

const  router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Index',
      component: Index,
      children:[{
        path: 'user',
        name: 'User',
        component: User
      },{
        path:'/',
        redirect:"/home/user"
      }]
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path:'*',
      redirect:"/home"
    },
  ]
})
router.beforeEach((to,from,next)=>{
    if(to.path === "/login") return next();
    const tokenStr = sessionStorage.getItem("token");
    if(!tokenStr) return next("/login");
    next();

})

export default router