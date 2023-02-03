/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2023-02-03 14:52:53
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-03 15:53:10
 * @FilePath: \electron-app\src\renderer\src\api\user.ts
 */
import request from '@renderer/utils/request'

// 登录
export function Login(data) {
  return request({
    url: `https://yeh.lu/counter-api/system/user/login`,
    method: 'POST',
    data,
  })
}