import request from '@renderer/utils/request'
const COUNTER_BASE_API = import.meta.env.RENDERER_VITE_COUNTER_BASE_API

export function GetNotifyList(params) {
  return request({
    url: `${COUNTER_BASE_API}/inform/get_inform_list`,
    method: 'GET',
    params
  })
}