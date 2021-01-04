'use strict'
import axios from 'axios'
import Vue from 'vue'

import { url } from './api'
import { getFilenameFromResponse } from '@/assets/libs/util'
import vue from '@/main'

window.__axiosCancelTokenArr = []

const website = '//' + location.host + location.pathname + '#/login'

/**
 * 请求拦截器
 * 处理发送请求之前 header 插入 token 鉴权
 */
axios.interceptors.request.use(requestConfig => {
  const configs = requestConfig
  const localUser = localStorage.getItem('x_crms_admin_user_info')
  let userInfo = ''

  if (localUser !== null && localUser !== undefined) {
    userInfo = JSON.parse(localUser)
  }

  if (userInfo) {
    configs.headers.token = userInfo.token
  }

  configs.cancelToken = new axios.CancelToken(cancel => {
    window.__axiosCancelTokenArr.push({ cancel })
  })

  return configs
}, err => {
  return Promise.reject(err)
})

/**
 * 响应拦截器
 * 响应回调错误处理、数据处理等逻辑
 */
axios.interceptors.response.use(response => {
  if (response.headers['content-type'].indexOf('application/vnd.ms-excel') !== -1 ||
      response.headers['content-type'].indexOf('application/octet-stream') !== -1) {
    const cd = response.headers['content-disposition']
    // const blob = new Blob([response.data])
    const blob = new Blob([response.data])
    const fileName = getFilenameFromResponse(cd)
    const eLink = document.createElement('a')
    eLink.download = fileName
    eLink.style.display = 'none'
    eLink.href = URL.createObjectURL(blob)
    eLink.click()
    URL.revokeObjectURL(eLink.href) // 释放 URL 对象
    return
  }

  if (response.headers['content-type'].indexOf('text/html') !== -1) {
    const open = window.open('', '', 'width=1000,height=800')
    open.document.write(response.data)
    open.document.close()
    open.focus()
    return
  }
  const result = response.data
  if (result.code === 200) {
    return Promise.resolve(result.data)
  } else if (result.code === 401) {
    localStorage.removeItem('x_crms_admin_user_info')
    window.location = website
  } else {
    vue.$message.error(result.message)
    return Promise.reject(result)
  }
}, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('x_crms_admin_user_info')
    window.location = website
  } else if (error.response.status === 500) {
    vue.$message.error(error.message)
    return Promise.reject(error) // 返回接口返回的错误信息
  } else {
    vue.$message.error(error.response ? error.response.data : error.response)
    return Promise.reject(error.response ? error.response.data : error.response) // 返回接口返回的错误信息
  }
})

/**
 * 切换配置
 */
const defaults = {
  baseURL: url,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

Object.assign(axios.defaults, defaults)

const files = require.context('./modules', true, /\.js$/)

const services = {}

files.keys().forEach(file => {
  const fileConfig = files(file)
  const _file = fileConfig.default || fileConfig
  services[_file.name] = { ..._file.services }
})

Vue.prototype.$http = services
