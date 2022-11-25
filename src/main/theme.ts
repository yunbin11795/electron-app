/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2022-11-22 10:34:02
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2022-11-22 10:36:11
 * @FilePath: \electron-app\src\main\theme.ts
 */
import {nativeTheme,ipcMain} from 'electron'

export const setTheme = ():void=>{
  
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })
  
  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
}
