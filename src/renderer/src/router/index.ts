/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2022-11-25 16:40:18
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-07 16:08:21
 * @FilePath: \electron-app\src\renderer\src\router\index.ts
 */

import {createRouter,createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
    children: [{
      path: 'login',
      name: 'Login',
      component: () => import('@renderer/views/user/index.vue'),
    }]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@renderer/views/dashboard/index.vue'),
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})