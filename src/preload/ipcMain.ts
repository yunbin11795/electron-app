/*
 * @Description: ipcMain函数
 * @Author: Chen YunBin
 * @Date: 2022-11-21 11:56:20
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2022-11-21 16:45:46
 * @FilePath: \electron-app\src\preload\ipcMain.ts
 */
import { BrowserWindow, ipcMain,dialog  }  from 'electron'


const handleTest = (event, title):void=>{
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win?win.setTitle(title):''
}

const handleOpenFile = async (mainWindow):Promise<string> => {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow)
  if (canceled) {
    return ''
  } else {
    return filePaths[0]
  }
}

export default (mainWindow):void => {
  ipcMain.on('test',handleTest),
  ipcMain.handle('dialog:openFile',()=>{ return handleOpenFile(mainWindow) })
}