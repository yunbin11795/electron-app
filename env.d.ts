/*
 * @Description:
 * @Author: Chen YunBin
 * @Date: 2023-01-31 11:01:57
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-01-31 11:02:12
 * @FilePath: \electron-app\env.d.ts
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
