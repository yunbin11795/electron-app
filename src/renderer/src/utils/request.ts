/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2023-02-03 14:23:53
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-03 18:42:38
 * @FilePath: \electron-app\src\renderer\src\utils\request.ts
 */
import axios from 'axios'
import { userStore } from '@renderer/store/user'
import i18n from '@renderer/i18n'
import {
  ERROR_GENERAL,
  ERROR_EXPIRED_TOKEN,
  ERROR_ILLEGAL_TOKEN,
  ERROR_OTHER_CLIENT_LOGGED_IN,
  ERROR_DISABLED_ACCOUNT,
  ERROR_DELETED_ACCOUNT,
  ERROR_NONEXISTENT_ACCOUNT
} from '@renderer/conf/error'


const request = axios.create({
  baseURL: '/',
  timeout: 30 * 1000 // request timeout
})


const showErrorMessage = (errorCode)=>{
  
  if ([
    ERROR_EXPIRED_TOKEN,
    ERROR_ILLEGAL_TOKEN,
    ERROR_OTHER_CLIENT_LOGGED_IN,
    ERROR_DISABLED_ACCOUNT,
    ERROR_DELETED_ACCOUNT,
    ERROR_NONEXISTENT_ACCOUNT
  ].includes(errorCode)) {
    const alertMessageMap = {
      [ERROR_EXPIRED_TOKEN]: i18n.global.t('message.expiredAccount'),
      [ERROR_ILLEGAL_TOKEN]: i18n.global.t('message.expiredAccount'),
      [ERROR_OTHER_CLIENT_LOGGED_IN]: i18n.global.t('message.otherClientLoggedIn'),
      [ERROR_DISABLED_ACCOUNT]: i18n.global.t('message.disabledAccount'),
      [ERROR_DELETED_ACCOUNT]: i18n.global.t('message.deletedAccount'),
      [ERROR_NONEXISTENT_ACCOUNT]: i18n.global.t('message.nonexistentAccount')
    }
    
  }else if (errorCode === ERROR_GENERAL){
    const defaultErrorMessage = i18n.global.t('message.systemAbnormal')
  }
}

// request interceptor
request.interceptors.request.use(
  (config) => {
    // set default custom config
    // config.customConfig = config.customConfig || {}
    const store = userStore()
    if(store.token){
      config.headers['token'] = store.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  response => {
    const res = response.data
    let errorCode = res.code
    let errMsg = res.errmsg
    if (errorCode === 200) {
      // 成功状态码统一为0
      errorCode = 0
    }
    showErrorMessage(errorCode)

    return response
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)



export default request
