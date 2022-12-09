/*
 * @Description: 更新
 * @Author: Chen YunBin
 * @Date: 2022-12-09 18:05:32
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2022-12-09 18:27:23
 * @FilePath: \electron-app\src\main\autoUpdater.ts
 */

import { dialog } from 'electron'
import { autoUpdater } from 'electron-updater'

autoUpdater.setFeedURL();
autoUpdater.on('update-downloaded', () => {
  if (process.env.NODE_ENV === 'production') {
      dialog.showMessageBox({
          title: '安装更新',
          message: '更新下载完毕，应用将重启并进行安装'
      }).then(() => {
          // 退出并安装应用
           autoUpdater.quitAndInstall()
      });
  }
})
export default autoUpdater
