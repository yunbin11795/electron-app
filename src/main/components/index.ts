
/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2022-12-09 15:29:30
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-03 10:43:45
 * @FilePath: \electron-app\src\main\components\index.ts
 */

import Theme, { ThemeIpcRenderer } from './Theme'
import MyTray, { MyTrayIpcRenderer } from './MyTray'
import BrowserViewList, { BrowserViewIpcRenderer } from './BrowserViewList'

export const initComponents = (mainWindow) => {
  new Theme(mainWindow)
  new MyTray(mainWindow)
  new BrowserViewList(mainWindow)
}

export default {
  ...ThemeIpcRenderer,
  ...MyTrayIpcRenderer,
  ...BrowserViewIpcRenderer
}
