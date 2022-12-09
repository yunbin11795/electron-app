/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2022-12-09 15:29:30
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2022-12-09 15:43:08
 * @FilePath: \electron-app\src\main\components\index.ts
 */

import { setTheme } from './theme'
import {MyTray} from './tray'

export default (mainWindow)=>{
  setTheme()
  new MyTray(mainWindow)
}