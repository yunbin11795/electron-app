/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2022-11-21 09:40:30
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-07 09:42:28
 * @FilePath: \electron-app\src\renderer\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import './styles/element/index.scss'
import ElementPlus from 'element-plus'
import router from  './router'
import i18n from './i18n'
import store from './store/index'
import './permission'

const app = createApp(App)


app.use(ElementPlus)
app.use(router)
app.use(i18n)
app.use(store)
app.mount('#app')