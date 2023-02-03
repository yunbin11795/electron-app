/*
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2023-02-03 16:18:15
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-03 16:18:40
 * @FilePath: \electron-app\src\renderer\src\conf\error.ts
 */
/**
 * 错误码
 */
// 通用错误，一般只需全局提示（已在@/utils/request.js配置）
const ERROR_GENERAL = 201
// 用户名或密码错误
const ERROR_INCORRECT_USERNAME_OR_PASSWORD = 202
// 过期Token
const ERROR_EXPIRED_TOKEN = 206
// 非法Token（后端未区分过期token和非法toked的情况下可以设置相同值）
const ERROR_ILLEGAL_TOKEN = 206
// 账号已到期（无）
const ERROR_EXPIRED_ACCOUNT = -1
// 账号被停用
const ERROR_DISABLED_ACCOUNT = 204
// 账号被删除
const ERROR_DELETED_ACCOUNT = 205
// 账号在别处登录
const ERROR_OTHER_CLIENT_LOGGED_IN = -1
// 账号不存在
const ERROR_NONEXISTENT_ACCOUNT = 203

export {
  ERROR_GENERAL,
  ERROR_INCORRECT_USERNAME_OR_PASSWORD,
  ERROR_EXPIRED_TOKEN,
  ERROR_ILLEGAL_TOKEN,
  ERROR_EXPIRED_ACCOUNT,
  ERROR_DISABLED_ACCOUNT,
  ERROR_DELETED_ACCOUNT,
  ERROR_OTHER_CLIENT_LOGGED_IN,
  ERROR_NONEXISTENT_ACCOUNT
}