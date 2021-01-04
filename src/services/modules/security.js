/**
 * 鉴权
 */
import axios from 'axios'
import * as api from '../api'

export default {
  name: 'security',
  services: {
    // 登录
    login: (_params) => {
      return axios.post(api.login, _params)
    },
    // 随机盐
    getRandomSalt: (_params) => {
      return axios.get(`${api.getRandomSalt}/${_params}`)
    },
    // 退出登录
    logout: () => {
      return axios.get(api.logout)
    },
    // 修改密码
    rePassword: (_params) => {
      return axios.post(api.updatePassword, _params)
    },
    // 获取文件地址
    getFileUrl: () => {
      return axios.get(api.getFileUrl)
    },
    // 获取权限列表
    getPermisionList: (_params) => {
      return axios.post(api.getPermisionList, _params)
    }
  }
}
