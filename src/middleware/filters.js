import Vue from 'vue'
import dayjs from 'dayjs'

const filters = {
  dateFormat (_timestamp, _format = 'YYYY-MM-DD HH:mm:ss') {
    if (!_timestamp) return '-'
    return dayjs(_timestamp).format(_format)
  },
  dateDayFormat (_timestamp, _format = 'YYYY-MM-DD') {
    if (!_timestamp) return '-'
    return dayjs(_timestamp).format(_format)
  },
  timeFormat (_timestamp, _format = 'HH:mm:ss') {
    if (!_timestamp) return '-'
    return dayjs(_timestamp).format(_format)
  },
  betweenTime (_timestamp) {
    const timestamp = _timestamp.split('~')
    const result = []
    timestamp.map(item => {
      result.push(dayjs(Number(item)).format('YYYY年MM月DD日'))
    })
    return result.join('~')
  },
  spaceTime (_start, _end) {
    const startDate = new Date(_start).getTime()
    const endDate = new Date(_end).getTime()

    const diff = startDate - endDate // 获取相减的毫秒数

    // 计算出相差天数
    const days = Math.floor(diff / (24 * 3600 * 1000))

    // 计算出小时数
    const leave1 = diff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
    const hours = Math.floor(leave1 / (3600 * 1000))

    // 计算相差分钟数
    const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2 / (60 * 1000))

    // 计算相差秒数
    const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
    const seconds = Math.round(leave3 / 1000)

    let returnStr = seconds + '秒'
    if (minutes > 0) returnStr = minutes + '分' + returnStr
    if (hours > 0) returnStr = hours + '小时' + returnStr
    if (days > 0) returnStr = days + '天' + returnStr
    return returnStr
  },
  byteChange: (_limit) => {
    let size = ''
    if (_limit < 0.5 * 1024) { // 小于0.5KB，则转化成B
      size = _limit.toFixed(2) + 'B'
    } else if (_limit < 0.5 * 1024 * 1024) { // 小于0.5MB，则转化成KB
      size = (_limit / 1024).toFixed(2) + 'KB'
    } else if (_limit < 0.5 * 1024 * 1024 * 1024) { // 小于0.5GB，则转化成MB
      size = (_limit / (1024 * 1024)).toFixed(2) + 'MB'
    } else { // 其他转化成GB
      size = (_limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
    }

    const sizeStr = size + '' //  转成字符串
    const index = sizeStr.indexOf('.') //  获取小数点处的索引
    const dou = sizeStr.substr(index + 1, 2) //  获取小数点后两位的值
    if (dou === '00') { //  判断后两位是否为00，如果是则删除00
      return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    return size
  },
  dictionaryFilter (_value, _key) {
    const options = JSON.parse(window.localStorage.getItem('_dict'))
    let val = '--'
    if (!_key || !options[_key]) return '--'
    options[_key].map(item => {
      if (item.value === _value) {
        val = item.label
      }
    })
    return val
  },
  cllxFilter (_key) {
    const options = JSON.parse(window.localStorage.getItem('_cllx'))
    let val = '--'
    // if (_key) return '--'
    options.map(item => {
      if (item.code === _key) {
        val = item.name
      }
    })
    return val
  },
  sexFilter (_type) {
    if (_type === null) {
      return
    }
    return {
      1: '男',
      2: '女'
    }[_type]
  }
}

// 注册全局通用过滤器
for (const filter in filters) {
  Vue.filter(filter, filters[filter])
}
