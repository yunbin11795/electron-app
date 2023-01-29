/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2022-11-25 16:40:18
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-01-29 10:17:56
 * @FilePath: \electron-app\src\renderer\src\router\index.ts
 */

import {createRouter,createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@renderer/views/user/index.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@renderer/views/dashboard/index.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})