/*
 * @Description: ipcRenderer函数
 * @Author: Chen YunBin
 * @Date: 2022-11-21 11:47:53
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2022-11-24 15:36:37
 * @FilePath: \electron-app\src\preload\ipcRenderer.ts
 */
import { ipcRenderer, IpcRenderer,IpcRendererEvent }  from 'electron'

export interface IpcRendererType{
  test: (title:string)=>void,
  openFile: () => Promise<void>,
  onUpdateCounter: (callback:(event:IpcRendererEvent, value:string) => void) => IpcRenderer,
  toggle: () => Promise<void>,
  system: () => Promise<void>,
  startFlash: ()=>void,
  stopFlash: ()=>void
}

export const ipc:IpcRendererType = {
  test: (title)=> ipcRenderer.send('test',title),
  openFile: ()=> ipcRenderer.invoke('dialog:openFile'),
  onUpdateCounter: (callback)=> ipcRenderer.on('update-counter',callback),
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),
  startFlash:() => ipcRenderer.send('startFlash'),
  stopFlash: ()=> ipcRenderer.send('stopFlash')
}