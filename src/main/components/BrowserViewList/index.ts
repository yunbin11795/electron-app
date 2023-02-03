/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2023-01-29 10:55:23
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-03 11:01:25
 * @FilePath: \electron-app\src\main\components\BrowserViewList\index.ts
 */

import { BrowserWindow , BrowserView ,ipcMain , ipcRenderer} from 'electron'

import script from './BrowserViewList.js?asset'
export const BrowserViewIpcRenderer = {
  addBrowserView: (item)=> ipcRenderer.send('addBrowserView', item),
  clickBrowserView: (id)=> ipcRenderer.send('clickBrowserView', id),
  delBrowserView: (id)=> ipcRenderer.send('delBrowserView', id),
}

export default class BrowserViewList {
    mainWindow: BrowserWindow
    viewList:any = []
    bounds = {
      x:270,
      y:70,
      offsetX: 16,
      offsetY: 39
    }
    constructor(mainWindow){
      this.mainWindow = mainWindow
      this.handleEvent()
    }

    addBrowserView(item):void {
       const view = new BrowserView({
        webPreferences: {
          preload: script
        }
       })
       this.mainWindow.addBrowserView(view)
       view.webContents.loadURL(item.url)
       view.webContents.setWindowOpenHandler(details =>{
          view.webContents.loadURL(details.url)
          return {action: 'deny'}
       })
       const winBounds = this.mainWindow.getSize()

       view.setBounds({
          x: this.bounds.x,
          y: this.bounds.y,
          width: winBounds[0] - this.bounds.offsetX - this.bounds.x,
          height: winBounds[1]- this.bounds.offsetY  - this.bounds.y
       })

       view.setAutoResize({width:true, height: true})
       this.viewList.push({
         id:item.id,
         view:view
       })
    }

    showBrowserView(view:BrowserView){
      const winBounds = this.mainWindow.getSize()
      view.setBounds({
        x: this.bounds.x,
        y: this.bounds.y,
        width: winBounds[0] - this.bounds.offsetX - this.bounds.x,
        height: winBounds[1]- this.bounds.offsetY  - this.bounds.y
      })
    }

    hideBrowserView(view:BrowserView){
      view.setBounds({
        x:this.bounds.x,
        y:this.bounds.y,
        width:0,
        height: 0
      })
    }

    clickBrowserView(id:string){
      this.viewList.forEach((list)=>{
        if(list.id === id){
           this.showBrowserView(list.view)
        }else{
           this.hideBrowserView(list.view)
        }
      })
    }

    delBrowserView(id:string){
        let index = this.viewList.findIndex(item => item.id === id)
        this.viewList = this.viewList.filter((list)=>{
          if(list.id === id){
            this.mainWindow.removeBrowserView(list.view)
            return false
          }else{
            return true
          }
        })

        if(this.viewList.length <= index){
            index = index -1;
        }

        if(index != -1){
            this.clickBrowserView(this.viewList[index].id)
        }
    }

    handleEvent():void {
      ipcMain.on("addBrowserView" , (_event, item)=>{
        this.addBrowserView(item)
      })

      ipcMain.on("clickBrowserView" , (_event,id)=>{
        this.clickBrowserView(id)
      })

      ipcMain.on("delBrowserView" , (_event,id)=>{
        this.delBrowserView(id)
      })
    }
}
