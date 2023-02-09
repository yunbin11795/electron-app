/*
 * @Description:
 * @Author: Chen YunBin
 * @Date: 2023-02-07 11:00:56
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-09 14:46:29
 * @FilePath: \electron-app\src\renderer\src\api\dashboard.ts
 */
import request from '@renderer/utils/request'
const COUNTER_BASE_API = import.meta.env.RENDERER_VITE_COUNTER_BASE_API

export function GetNotifyList(params) {
  return request({
    url: `${COUNTER_BASE_API}/inform/get_inform_list`,
    method: 'GET',
    params
  })
}
