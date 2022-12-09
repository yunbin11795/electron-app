
/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2022-12-09 15:29:30
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2022-12-09 16:54:32
 * @FilePath: \electron-app\src\main\components\index.ts
 */

import { initTheme}  from './theme'
import { MyTray } from './tray'

export const initComponents = (mainWindow)=>{
  initTheme()
  new MyTray(mainWindow)
}


