/*
 * @Description:
 * @Author: Chen YunBin
 * @Date: 2023-02-03 14:52:53
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-09 15:44:59
 * @FilePath: \electron-app\src\renderer\src\api\user.ts
 */
import request from '@renderer/utils/request'
const COUNTER_BASE_API = import.meta.env.RENDERER_VITE_COUNTER_BASE_API

// 登录
export function Login(data, customConfig) {
  return request({
    url: `${COUNTER_BASE_API}/system/user/login`,
    method: 'POST',
    data,
    customConfig
  })
}
