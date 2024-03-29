import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import User from '@/components/User'
import Restaurant from '@/components/Restaurant'
import UserMain from '@/components/UserMain'
import RestMain from '@/components/RestMain'
import SelectRestaurant from '@/components/SelectRestaurant'
import SelectDish from '@/components/SelectDish'
import MyOrders from '@/components/MyOrders'
import AdminLogin from '@/components/AdminLogin'
import Admin from '@/components/Admin'
import RestStat from '@/components/RestStat'

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
      path: '/restaurant',
      name: 'restaurant',
      component: Restaurant
    },
    {
      path: '/user/main',
      name: 'UserMain',
      component: UserMain
    },
    {
      path: '/restaurant/main',
      name: 'RestMain',
      component: RestMain
    },
    {
      path: '/user/selectRestaurant',
      name: 'SelectRestaurant',
      component: SelectRestaurant
    },
    {
      path: '/user/selectDish',
      name: 'SelectDish',
      component: SelectDish
    },

    {
      path: '/user/myOrders',
      name: 'MyOrders',
      component: MyOrders
    },
    {
      path: '/admin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/adminMain',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/restaurant/stat',
      name: 'RestStat',
      component: RestStat,
    },

  ]
})
