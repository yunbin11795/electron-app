/*
 * @Description:
 * @Author: Chen YunBin
 * @Date: 2022-11-22 10:34:02
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-09 15:07:06
 * @FilePath: \electron-app\src\main\components\Theme\index.ts
 */
import { nativeTheme, ipcMain, ipcRenderer, BrowserWindow, dialog } from 'electron'

export const ThemeIpcRenderer = {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),
  test: (title:string) => ipcRenderer.send('test', title),
  openFile: () => ipcRenderer.invoke('dialog:openFile')
}

export default class Theme {
  constructor(mainWindow) {
    this.mainWindow = mainWindow
    this.handleEvent()
  }

  mainWindow: BrowserWindow
  handleEvent():void {
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

    ipcMain.on('test', this.handleTest)
    ipcMain.handle('dialog:openFile', () => { return this.handleOpenFile(this.mainWindow) })
  }

  handleTest(event, title):void {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win ? win.setTitle(title) : ''
  }

  async handleOpenFile(mainWindow):Promise<string> {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow)
    if (canceled) {
      return ''
    } else {
      return filePaths[0]
    }
  }
}

