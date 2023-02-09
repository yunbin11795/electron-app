/*
 * @Description: 更新
 * @Author: Chen YunBin
 * @Date: 2022-12-09 18:05:32
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-09 14:52:14
 * @FilePath: \electron-app\src\main\autoUpdater.ts
 */

import { autoUpdater } from 'electron-updater'
import { dialog } from 'electron'

export default class AppUpdater {
  constructor() {
    const log = require('electron-log')
    log.transports.file.level = 'info'
    autoUpdater.logger = log
    log.info('App starting...')
    // autoUpdater.checkForUpdatesAndNotify()

    autoUpdater.autoDownload = false
    autoUpdater.checkForUpdates()

    autoUpdater.on('error', (error) => {
      console.log(error)
    })

    autoUpdater.on('update-available', () => {
      dialog.showMessageBox({
        title: '版本更新',
        message: '有新版本, 是否现在更新?',
        buttons: ['确认', '取消']
      }).then((res) => {
        if (res.response === 0) {
          autoUpdater.downloadUpdate()
        }
      })
    })

    autoUpdater.on('update-not-available', () => {
      console.log('Current version is up-to-date.')
    })

    autoUpdater.on('update-downloaded', () => {
      dialog.showMessageBox({
        title: '安装更新',
        message: '更新下载完毕，应用将重启并进行安装'
      }).then(() => {
        setImmediate(() => autoUpdater.quitAndInstall())
      })
    })
  }
}
