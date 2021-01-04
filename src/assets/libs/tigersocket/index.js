/**
 * author     dark
 * date       20/04/26
 */
'use strict'

import { CODE_PING } from './sendType'

// 重连开始时间
let reConnectBeginTime
// 重连计数
let reConnectNum = 1
// 重连次数限定
let limitReConnectNum = 3
// 重连timer
let reConnectTimer

/**
 * 构造函数
 * originalConfig
 *      url         string  // 链接的url
 *      message     string  // 连接成功后默认发送的数据，并且在执行send如果没有传递参数，则默认发送该值
 *
 *      onopen: function () {}, // 连接成功后触发发
 *      onmessage: function () {},  // 接收到消息触发
 *      onclose: function () {},    // 关闭后触发
 *      onBeforeClose:function(){}  // 关闭之前触发
 *      onerror: function () {},    // 发生错误后触发
 *
 */
function TigerSocket (originalConfig) {
  // 默认配置参数
  let defaultConfig = {
    ws: null,
    timeout: 5000,
    onopen: function () {
    },
    onmessage: function () {
    },
    onclose: function () {
    },
    onBeforeClose: function () {
    },
    onerror: function () {
    }
  }
  // 是否心跳状态，为false不可操作，等待重连
  this.isHeartFlat = false
  // 重连状态
  this.isReconnect = false

  // 心跳相关
  this.timeout = 1000 * 10 // 心跳时长
  this.timeoutObj = null
  this.serverTimeoutObj = null

  originalConfig
    ? (this.config = Object.assign(defaultConfig, originalConfig))
    : (this.config = defaultConfig)

  // 发送消息函数
  this.send = function (message) {
    if (!this.ws) {
      console.log(
        'websocket链接已关闭'
      )
      return
    }
    // 如果没有传值，则默认发送配置的默认消息
    if (
      typeof message === 'undefined' &&
      typeof this.config.message !== 'undefined'
    ) {
      message = this.config.message
    }
    // 判断心跳检测，连接是否存在或已连接
    if (this.isHeartFlat) {
      this.ws.send(message)
    }
  }
  // 关闭连接
  this.close = function () {
    if (!this.ws) {
      console.log(
        'websocket链接已关闭'
      )
      return
    }
    this.config.onBeforeClose(this.config, this.ws)
    this.ws.close()
  }

  this.init()
}

// 初始化
TigerSocket.prototype.init = function () {
  window.WebSocket = window.WebSocket || window.MozWebSocket
  if (!window.WebSocket) {
    console.log(
      '浏览器不支持WebSocket'
    )
    return
  }

  let ws = new WebSocket(this.config.url)
  ws.onopen = e => {
    console.log(
      'webSocket连接成功'
    )
    this.onopen(e)
  }
  ws.onmessage = e => {
    let _data = {}
    if (e.data) {
      _data = JSON.parse(e.data)
    }
    this.onmessage(_data)
  }
  ws.onclose = e => {
    console.log(
      'webSocket连接关闭',
      e
    )
    this.onclose(e)
  }
  ws.onerror = e => {
    console.log(
      'webSocket连接出错',
      e
    )
    this.onerror(e)
  }

  this.ws = ws
}

// 心跳
TigerSocket.prototype.heartCheck = function () {
  this.timeoutObj = setInterval(() => {
    // 这里发送一个心跳，后端收到后，返回一个心跳消息，
    // onmessage拿到返回的心跳就说明连接正常
    const _data = {
      code: CODE_PING,
      message: '发送心跳',
      data: {
        value: 'ping'
      }
    }
    this.ws.send(JSON.stringify(_data))

    console.log(
      '发送了一个心跳，时间：' + new Date().getTime()
    )
    // this.serverTimeoutObj = setTimeout(() => {
    //   // 如果超过一定时间还没重置，说明后端主动断开了
    //   this.ws.close() // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
    // }, this.timeout)
  }, this.timeout)
}

// 清除心跳
TigerSocket.prototype.clearHeartCheck = function () {
  clearTimeout(this.timeoutObj)
  clearTimeout(this.serverTimeoutObj)
}

// 连接成功
TigerSocket.prototype.onopen = function (e) {
  this.heartCheck()
  this.isHeartFlat = true
  this.config.onopen(e)
  if (typeof this.config.message !== 'undefined') {
    this.ws.send(this.config.message)
  }
}

// 接收消息回调
TigerSocket.prototype.onmessage = function (e) {
  this.config.onmessage(e)
}

// 连接出错回调，默认执行重连操作
TigerSocket.prototype.onerror = function (e) {
  this.clearHeartCheck()
  // 心跳值为false
  this.isHeartFlat = false
  this.config.onerror(e)

  if (reConnectNum <= limitReConnectNum) {
    // 开始重连
    console.log(
      'webSocket连接出错，正在重连...'
    )
    clearTimeout(reConnectTimer)
    reConnectTimer = setTimeout(() => {
      if (reConnectNum === 1) {
        reConnectBeginTime = new Date()
      }

      console.log(
        '尝试第' + reConnectNum + '次重连'
      )
      this.isReconnect = true
      this.reConnect()

      // 如果心跳值为true，则重连成功
      if (this.isHeartFlat) {
        clearTimeout(reConnectTimer)
        reConnectTimer = null
      }
    }, 2000)
  } else {
    console.log(
      '重连次数超出设定值，不再重连，请检查配置项'
    )
  }
}

// 关闭回调
TigerSocket.prototype.onclose = function (e) {
  console.log(
    'WEBSOCKET_CLOSE_CODE: ' + e.code + ' ' + this.getStatusCodeString(e.code)
  )

  this.clearHeartCheck()
  this.isHeartFlat = false
  this.config.onclose(e)
}

// 状态码字典
TigerSocket.prototype.specificStatusCodeMappings = {
  '1000': 'Normal Closure',
  '1001': 'Going Away',
  '1002': 'Protocol Error',
  '1003': 'Unsupported Data',
  '1004': '(For future)',
  '1005': 'No Status Received',
  '1006': 'Abnormal Closure',
  '1007': 'Invalid frame payload data',
  '1008': 'Policy Violation',
  '1009': 'Message too big',
  '1010': 'Missing Extension',
  '1011': 'Internal Error',
  '1012': 'Service Restart',
  '1013': 'Try Again Later',
  '1014': 'Bad Gateway',
  '1015': 'TLS Handshake'
}

// 解析状态吗
TigerSocket.prototype.getStatusCodeString = function (_code) {
  if (_code >= 0 && _code <= 999) {
    return '(Unused)'
  } else if (_code >= 1016) {
    if (_code <= 1999) {
      return '(For WebSocket standard)'
    } else if (_code <= 2999) {
      return '(For WebSocket extensions)'
    } else if (_code <= 3999) {
      return '(For libraries and frameworks)'
    } else if (_code <= 4999) {
      return '(For applications)'
    }
  }
  if (typeof this.specificStatusCodeMappings[_code] !== 'undefined') {
    return this.specificStatusCodeMappings[_code]
  }
  return '(Unknown)'
}

// 重连操作
TigerSocket.prototype.reConnect = function () {
  // 如果没有触发重连操作，则不执行
  if (!this.isReconnect) return

  // 判断重连超时，若超时，则不再重连
  if (new Date() - reConnectBeginTime > this.config.timeout) {
    console.log(
      'websocket重连超时'
    )
    this.isReconnect = false
    // 清除重连延时器
    clearTimeout(reConnectTimer)
    reConnectTimer = null
    return
  }

  // 开始重连
  // 重连计数器
  reConnectNum++
  this.init()
}

// 关闭连接
TigerSocket.prototype.closeConnect = function () {
  console.log(
    'websocket链接已关闭'
  )
  this.ws.close()
}

export default TigerSocket
