/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2023-02-02 10:33:11
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-02 16:21:32
 * @FilePath: \electron-app\src\renderer\src\i18n.ts
 */
import { createI18n } from 'vue-i18n'


function loadLocaleMessages() {
  const locales = import.meta.glob('./locales/*.json', { eager: true })
  const messages = {}
  for (const [key,value] of Object.entries(locales)) {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      const data:any = value
      messages[locale] = data.default
    }
  }
  return messages
}

const messages = loadLocaleMessages()

export function getLanguage() {
  const chooseLanguage = localStorage.getItem('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = navigator.language
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: getLanguage(),
  globalInjection:true, // 全域注入，让你在 <template> 可以使用 $t
  messages,
  fallbackLocale: 'en', // 设置备用语言
})

export default i18n