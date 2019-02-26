import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import User from '@/components/User'
import Restaurant from '@/components/Restaurant'
import UserMain from '@/components/UserMain'
import RestMain from '@/components/RestMain'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path:'/restaurant',
      name: 'restaurant',
      component: Restaurant
    },
    {
      path:'/user/main',
      name: 'UserMain',
      component: UserMain
    },
    {
      path:'/restaurant/main',
      name: 'RestMain',
      component:RestMain
    },
  ]
})
