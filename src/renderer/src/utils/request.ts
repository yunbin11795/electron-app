/*
 * @Description: 请求拦截
 * @Author: Chen YunBin
 * @Date: 2023-02-03 14:23:53
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-09 16:42:02
 * @FilePath: \electron-app\src\renderer\src\utils\request.ts
 */
import axios from 'axios'
import { MyAxiosInstance, MyInternalAxiosRequestConfig } from './index'
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
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import router from '@renderer/router'
import { throttle } from 'lodash'

const request:MyAxiosInstance = axios.create({
  baseURL: '/',
  timeout: 30 * 1000 // request timeout
})

const showErrorMessage = (errorCode, errMsg) => {
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
  } else if (errorCode === ERROR_GENERAL || errorCode === ERROR_INCORRECT_USERNAME_OR_PASSWORD) {
    const defaultErrorMessage = i18n.global.t('message.systemAbnormal')
    ElMessage({
      message: errMsg || defaultErrorMessage,
      type: 'error',
      duration: 5 * 1000
    })
  }
}

/**
 * 通知
 * 节流，避免一次性出现过多异常通知而引起用户恐慌
 * @param {string} title    标题
 * @param {string} message  说明文字
 * @param {string} type     主题样式（success/warning/info/error）
 * @param {number} duration 显示时间, 毫秒。设为 0 则不会自动关闭
 */
const notify = throttle(function({ title, message, type, duration }) {
  ElNotification({ title, message, type, duration })
}, 5000)

// request cancel
const pendingRequests:any = []
const removePendingRequest = (config, type) => {
  const { url, method } = config
  const { reqKey, silentCancel, cancelMessage } = config.customConfig
  const index = pendingRequests.findIndex(item => {
    const sameUrl = url === item.config.url
    const sameMethod = method === item.config.method
    const sameReqKey = reqKey === item.config.customConfig.reqKey
    return sameUrl && sameMethod && sameReqKey
  })
  if (index > -1) {
    if (type === 'request') {
      pendingRequests[index].cancel(silentCancel ? '' : cancelMessage)
      console.log('[Request Cancel]', pendingRequests[index]) // for debug
    }
    pendingRequests.splice(index, 1)
  }
}

// request interceptor
request.interceptors.request.use(
  (config: MyInternalAxiosRequestConfig) => {
    // set default custom config
    config.customConfig = config.customConfig || {}
    const store = userStore()
    if (store.token) {
      config.headers['token'] = store.token
    }
    config.headers['language'] = i18n.global.locale.value

    if (!config.customConfig.notCancel) {
      removePendingRequest(config, 'request')
      config.cancelToken = new axios.CancelToken(cancel => {
        pendingRequests.push({
          config,
          cancel
        })
      })
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
    const errMsg = res.msg
    if (errorCode === 200) {
      // 成功状态码统一为0
      errorCode = 0
    }
    showErrorMessage(errorCode, errMsg)

    return {
      errorCode,
      ...res
    }
  },
  error => {
    // const config = error.config || {}
    const request = error.request || {}
    const isCancel = axios.isCancel(error)
    const isTimeout = /^timeout of \d+ms exceeded$/.test(error.message)
    const isNetworkError = error.message === 'Network Error'
    const requestStatus = request.status
    let errorMessage = error.message
    const messageType = isCancel ? 'info' : 'error'
    if (!isCancel) {
      // “取消”在上面有更详细输出，[Request Cancel]
      console.dir(error) // for debug
    }
    if (isTimeout) {
      errorMessage = i18n.global.t('message.requestTimeout')
    } else if (isNetworkError) {
      errorMessage = i18n.global.t('message.networkError')
    } else if (requestStatus === 502) {
      errorMessage = i18n.global.t('message.502')
    } else if (requestStatus === 403) {
      errorMessage = i18n.global.t('message.403')
    }
    if (errorMessage) {
      notify({
        title: errorMessage,
        // message: config.url,
        type: messageType,
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default request
