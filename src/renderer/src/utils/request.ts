/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2023-02-03 14:23:53
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-06 10:32:31
 * @FilePath: \electron-app\src\renderer\src\utils\request.ts
 */
import axios from 'axios'
import { userStore } from '@renderer/store/user'
import i18n from '@renderer/i18n'
import {
  ERROR_GENERAL,
  ERROR_INCORRECT_USERNAME_OR_PASSWORD,
  ERROR_EXPIRED_TOKEN,
  ERROR_ILLEGAL_TOKEN,
  ERROR_OTHER_CLIENT_LOGGED_IN,
  ERROR_DISABLED_ACCOUNT,
  ERROR_DELETED_ACCOUNT,
  ERROR_NONEXISTENT_ACCOUNT
} from '@renderer/conf/error'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from  '@renderer/router'

const request = axios.create({
  baseURL: '/',
  timeout: 30 * 1000 // request timeout
})


const showErrorMessage = (errorCode,errMsg)=>{
  
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

    // 关闭上一个弹窗，避免重复显示
    const alertCloseBtn:any = document.querySelector('.global-auth-fail-message-box .el-button')
    if (alertCloseBtn) {
      alertCloseBtn.click()
    }

    ElMessageBox.alert(`${alertMessageMap[errorCode]}`, '', {
      showClose: false,
      customClass: 'global-auth-fail-message-box'
    }).then(() => {
      router.push({ name: 'Login' })
    })
    
  }else if (errorCode === ERROR_GENERAL || errorCode === ERROR_INCORRECT_USERNAME_OR_PASSWORD ){
    const defaultErrorMessage = i18n.global.t('message.systemAbnormal')
    ElMessage({
      message: errMsg || defaultErrorMessage,
      type: 'error',
      duration: 5 * 1000
    })
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
    let errMsg = res.msg
    if (errorCode === 200) {
      // 成功状态码统一为0
      errorCode = 0
    }
    showErrorMessage(errorCode,errMsg)

    return {
      errorCode,
      ...res
    }
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)



export default request
