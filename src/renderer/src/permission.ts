/*
 * @Description: 路由守卫
 * @Author: Chen YunBin
 * @Date: 2023-02-07 09:39:16
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-07 16:30:21
 * @FilePath: \electron-app\src\renderer\src\permission.ts
 */
import router from './router'
import { userStore } from '@renderer/store/user'

router.beforeEach(async(to, from, next) => {
    console.log(from)
    const store = userStore()
    if(!store.token && to.path !== '/login'){
        next('/login')
        return
    }
    next()
})