/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2022-11-21 09:40:30
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2022-11-25 17:24:46
 * @FilePath: \electron-app\src\renderer\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import './styles/element/index.scss'
import ElementPlus from 'element-plus'
import router from  './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')