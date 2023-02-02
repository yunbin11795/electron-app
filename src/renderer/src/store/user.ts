/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2023-02-02 15:44:26
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-02 17:13:01
 * @FilePath: \electron-app\src\renderer\src\store\user.ts
 */
import { defineStore } from 'pinia'
import { getLanguage } from '@renderer/i18n'

export const userStore = defineStore('user', {
  state: () => ({ 
    language: getLanguage()
  }),
  getters: {

  },
  actions: {
    setLanguage(language:string) {
      this.language = language
      localStorage.setItem('language', language)
    }
  }
})
