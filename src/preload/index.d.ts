/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2022-11-21 09:40:30
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2022-11-21 16:06:59
 * @FilePath: \electron-app\src\preload\index.d.ts
 */
import { ElectronAPI } from '@electron-toolkit/preload'
import {IpcRendererType} from './ipcRenderer'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown,
    ipcRenderer: IpcRendererType
  }
}
