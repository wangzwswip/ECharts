const WSS_URL = process.env.VUE_APP_url_socket

let Socket = ''
let setIntervalWesocketPush = null
let time = new Date().getTime()
let AppId = ''
const TimeOut = 60 * 1000
let reloadSize = 0
const reloadSizeMAX = 3
/** 建立连接 */
export function createSocket (userID) {
  if (!Socket) {
    AppId = userID
    console.log('建立websocket连接', userID)
    time = new Date().getTime()
    Socket = new WebSocket(WSS_URL + `/${userID}`)
    Socket.onopen = onopenWS
    Socket.onmessage = onmessageWS
    Socket.onerror = onerrorWS
    Socket.onclose = oncloseWS
  } else {
    console.log('websocket已连接')
  }
}
/** 打开WS之后发送心跳 */
export function onopenWS () {
  reloadSize = 0
  console.log('发送心跳')
  sendPing() // 发送心跳
}
/** 连接失败重连 */
export function onerrorWS () {
  reloadSize += 1
  console.log('连接失败重连')
  clearInterval(setIntervalWesocketPush)
  Socket.close()
  setTimeout(() => {
    if (reloadSize <= reloadSizeMAX) {
      Socket = ''
      createSocket() // 重连
    } else {
      var event = document.createEvent('HTMLEvents')
      event.initEvent('onerrorWS', true, true)
      window.detail = '重连3次失败了!请检查网络和服务'
      window.dispatchEvent(event)
    }
  }, 3000)
}
/** WS数据接收统一处理 */
export function onmessageWS (e) {
  const data = JSON.parse(e.data)
  // if (data.appId === AppId) {
  if (true) {
    switch (data.code) {
      case 0:
        time = new Date().getTime()
        break
      // case 5:
      //   location.reload()
      //   break
      default:
        var event = document.createEvent('HTMLEvents')
        event.initEvent('onmessageWS', true, true)
        window.detail = data
        window.dispatchEvent(event)
        break
    }
  }
}
/**
 * 发送数据
 * @param code 指令码
 * @param data json的obj
 */
export function sendWSPush (code, data, msg) {
  // code = isNaN(code)? 0 : code
  const obj = {
    appId: AppId,
    code: code,
    data: data,
    msg: msg
  }
  if (!Socket) {
    return
  }
  if (Socket !== null && Socket.readyState === 3) {
    Socket.close()
    createSocket() // 重连
  } else if (Socket.readyState === 1) {
    Socket.send(JSON.stringify(obj))
  } else if (Socket.readyState === 0) {
    setTimeout(() => {
      Socket.send(JSON.stringify(obj))
    }, 3000)
  }
}
/** 关闭WS */
export function oncloseWS () {
  clearInterval(setIntervalWesocketPush)
  Socket = ''
  console.log('websocket已断开')
}

/** 发送心跳 */
export function sendPing () {
  sendWSPush(0)
  setIntervalWesocketPush = setInterval(() => {
    sendWSPush(0)
    if ((new Date().getTime() - time) > TimeOut) {
      onerrorWS()
    }
  }, 15000)
}
