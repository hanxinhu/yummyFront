import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import user from '@/components/User'
import restaurant from '@/components/Restaurant'
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
      component: user
    },
    {
      path:'/restaurant',
      name: 'restaurant',
      component: restaurant
    }
  ]
})
