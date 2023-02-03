/*
 * @Description: 托盘
 * @Author: Chen YunBin
 * @Date: 2022-11-23 14:25:33
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-03 11:01:00
 * @FilePath: \electron-app\src\main\components\MyTray\index.ts
 */
import { Menu, Tray, ipcMain ,nativeImage ,app , ipcRenderer} from 'electron'
import { BrowserWindow } from 'electron'
import icon from '../../../../resources/icon.png?asset'

export const MyTrayIpcRenderer = {
  startFlash:() => ipcRenderer.send('startFlash'),
  stopFlash: ()=> ipcRenderer.send('stopFlash')
}

export default class MyTray{

    constructor(mainWindow){
      this.mainWindow = mainWindow
      this.tray = new Tray(this.image)
      this.init()
      this.handleEvent()
    }

    mainWindow: BrowserWindow
    image = icon
    normalImage = nativeImage.createFromPath('')
    tray:Tray
    timer: any

    init():void {
      const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'normal' },
        { label: 'Item2', type: 'separator' },
        { label: 'Item3', type: 'checkbox', checked: true },
        { label: 'close', type: 'normal' ,click: ()=>{
          app.exit()
        } }
      ])

      this.tray.setToolTip('This is my application.')
      this.tray.setContextMenu(contextMenu)
    
      // 载入托盘菜单
      this.tray.setContextMenu(contextMenu);

    }

    handleEvent():void {
        // 双击触发
      this.tray.on('double-click', () => {
          // 双击通知区图标实现应用的显示或隐藏
          this.mainWindow.isVisible() ? this.mainWindow.hide() : this.mainWindow.show()
          this.mainWindow.isVisible() ? this.mainWindow.setSkipTaskbar(false) : this.mainWindow.setSkipTaskbar(true);
      });
      
      ipcMain.on('startFlash',()=>{
        this.startFlash()
      })
      ipcMain.on('stopFlash',()=>{
        this.stopFlash()
      })
    }

    stopFlash():void {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.tray.setImage(this.image);
    }

    // 图标闪烁
    startFlash():void {
      let count = 0;
      this.timer = setInterval(() => {
        try {
          count++;
          if (count % 2 === 0) {
            this.tray.setImage(this.normalImage);
          } else {
            this.tray.setImage(this.image);
          }
          if (count === 100) {
            count = 0;
          }
        } catch (err) {
          console.log(err);
          this.stopFlash();
        }
      }, 700);
    }

}
