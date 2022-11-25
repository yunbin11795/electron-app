/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2022-11-25 16:40:18
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2022-11-25 17:05:32
 * @FilePath: \electron-app\src\renderer\src\router\index.ts
 */

import {createRouter,createWebHistory} from 'vue-router'

const routes = [
  {
    path:'/',
    component: () => import('@renderer/views/dashboard/index.vue'),
  }
]

export default createRouter({
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})