import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/Search.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/sign',
      name: 'Sign',
      component: () => import('../views/Sign.vue')
    },
    {
      path: '/forgetpasswork',
      name: 'ForgetPasswork',
      component: () => import('../views/Forget_Passwork.vue')
    },
    {
      path: '/setting',
      name: 'Settig',
      component: () => import('../views/Setting.vue'),
      children:[
        // 通用
        {
          path:'',
          component: () => import('../views/Setting/Account.vue')
        },

        // 僅管理者使用
        {
          path:'staff',
          component: () => import('../views/Setting/People_Data/Staff.vue')
        },{
          path:'client',
          component: () => import('../views/Setting/People_Data/Client.vue')
        },

        // 通用
        {
          path:'shopping',
          component: () => import('../views/Setting/Shopping.vue')
        },

        // 僅員工使用
        {
          path:'purchase',
          component: () => import('../views/Setting/Account_Management/Purchase.vue')
        },
        {
          path:'sale',
          component: () => import('../views/Setting/Account_Management/Sale.vue')
        },
        {
          path:'stock',
          component: () => import('../views/Setting/Account_Management/Stock.vue')
        },
        {
          path:'supplier',
          component: () => import('../views/Setting/Account_Management/Supplier.vue')
        }
      ]
    }
  ]
})

export default router
