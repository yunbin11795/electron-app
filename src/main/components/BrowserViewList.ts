/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2023-01-29 10:55:23
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-01-29 17:22:44
 * @FilePath: \electron-app\src\main\components\BrowserViewList.ts
 */

import { BrowserWindow , BrowserView ,ipcMain , ipcRenderer} from 'electron'
import * as path from 'path'

export const BrowserViewIpcRenderer = {
  addBrowserView: (item)=> ipcRenderer.send('addBrowserView', item),
  clickBrowserView: (id)=> ipcRenderer.send('clickBrowserView', id),
  delBrowserView: (id)=> ipcRenderer.send('delBrowserView', id),
}

export default class BrowserViewList {
    mainWindow: BrowserWindow
    viewList:any = []
    bounds = {
      x:280,
      y:100,
      width:700,
      height: 500
    }
    constructor(mainWindow){
      this.mainWindow = mainWindow
      this.handleEvent()
    }

    addBrowserView(item):void {
       const view = new BrowserView({
        webPreferences: {
          preload: path.join(__dirname, '../renderer/script/BrowserViewList.js'),
        }
       })
       this.mainWindow.addBrowserView(view)
       view.setBounds(this.bounds)
       view.setAutoResize({width:true, height: true})
       view.webContents.loadURL(item.url)

       this.viewList.push({
         id:item.id,
         view:view
       })
    }

    showBrowserView(view:BrowserView){
      view.setBounds(this.bounds)
    }

    hideBrowserView(view:BrowserView){
      view.setBounds({
        x:280,
        y:100,
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
