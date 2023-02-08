/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2023-02-02 15:44:26
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-07 16:11:53
 * @FilePath: \electron-app\src\renderer\src\store\user.ts
 */
import { defineStore } from 'pinia'
import { getLanguage } from '@renderer/i18n'

export const userStore = defineStore('user', {
  state: () => ({ 
    language: getLanguage(),
    token: localStorage.getItem('token') || '',
    userInfo:{}
  }),
  getters: {

  },
  actions: {
    setLanguage(language:string) {
      this.language = language
      localStorage.setItem('language', language)
    },
    setUser(userInfo){
      this.userInfo = userInfo
      this.token = userInfo.token || 'test'
      localStorage.setItem('token', this.token)
    }
  }
})
