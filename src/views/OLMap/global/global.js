/**
 * @Author: LXL
 * @Date: 2022-11-10
 * @LastEditTime: 2022-11-10
 * @LastEditors: LXL
 * @Description: 地图代码
 */
import axios from "axios"
const global={
  sessionKey: 'dcxx_gis_map', // token将存放在sessionStorage中，用此key获取
  username:'dev', // 用于鉴权账号
  password:'c914e10c4680413a82ee73c51189fd52', // 用于鉴权密码
  securityUrl:['gis.dcyun.com:48475'] // 需要鉴权的地址
}
/**
 * 创建token并设置定时器
 */
export const createToken = async ()=>{
  
  const token = sessionStorage.getItem(global.sessionKey)
  if(!token){ // token 不存在的情况下
    // 获取token
    const result = await axios({
      method: 'post',
      url: 'https://gis.dcyun.com:48475/auth/token',
      data: {
        password:global.password,
        username:global.username
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    // 将token放入session中
    sessionStorage.setItem(global.sessionKey,JSON.stringify(result.data.message))
    setTimeout(()=>{
      createToken()
    },7*3600*1000) // 暂定每7小时更新token
  }
}

/**
 * 从session中获取token
 * @returns 
 */
export function getToken(){
  const token = sessionStorage.getItem(global.sessionKey)
  if(token){
    return JSON.parse(token)
  }
  console.error('token已失效或不存在，请重新获取！')
}

export function isSecurity(url){
  let isSecurity = false
  global.securityUrl.forEach(item=>{
    if(url.indexOf(item) !== -1 && url.indexOf('token') === -1 && url.indexOf('accessKey') === -1){
      isSecurity=true
    }
  })
  return isSecurity
}