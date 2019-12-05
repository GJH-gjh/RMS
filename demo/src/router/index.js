import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/content/User'
import Index from '@/components/index/Index'
import Longin from '@/components/login/Longin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Index',
      component: Index,
      children:[{
        path: 'user',
        name: 'User',
        component: User
      },]
    },{
      path: '/longin',
      name: 'Longin',
      component: Longin
    },{
      path:'*',
      redirect:"/home"
      
    }
  ]
})
