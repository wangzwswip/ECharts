/**
 * author     dark
 * date       19/01/09
 */
export const judgeType = function (_obj) {
  // toString 会返回对应不同的标签的构造函数
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (_obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(_obj)]
}

export const deepClone = function (_data) {
  const type = judgeType(_data)
  let obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return _data
  }
  if (type === 'array') {
    for (let i = 0, len = _data.length; i < len; i++) {
      obj.push(deepClone(_data[i]))
    }
  } else if (type === 'object') {
    // 对原型上的方法也拷贝了....
    for (const key in _data) {
      obj[key] = deepClone(_data[key])
    }
  }
  return obj
}

export const judgeRepeat = function (_array = [], _key, _value) {
  const _newArray = _array.filter((element, index, self) => {
    return _array[index][_key] === _value[_key]
  })
  return _newArray.length > 0
}

export const compareTime = function (activityTime, couponTime1, couponTime2) {
  if (couponTime1 === null || couponTime2 === null) {
    return false
  }
  if (activityTime[1] > couponTime2) {
    return true
  }
}

// 去重
export const unique = function (arr) {
  return Array.from(new Set(arr))
}

// 对象数组中，每个对象有多个属性，获取其中的一个属性 返回一个新数组
export const getArrayProps = function (_array, _key) {
  const key = _key || 'value'
  const res = []
  if (_array) {
    _array.forEach(function (t) {
      res.push(t[key])
    })
  }
  return res
}

/** * 自定义函数名：formatZero 后面补零

 * @param num： 需要补零的数值

 * @param len： 补零后的总位数

 */
export const formatZero = function (num, len = 6) {
  if (String(num).length >= len) return num
  return Number((num + Array(len).join('0')).slice(0, len))
}

/**
 * 生成随机字符串
 * @param len
 * @returns {string}
 */
export const randomString = function (len) {
  len = len || 32
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = $chars.length
  let str = ''
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str
}

/**
 * 获取 response 文件名
 * @param desc Content-Disposition
 * @returns {string} 解析到的文件名
 */
export const getFilenameFromResponse = function (desc) {
  if (desc != null) {
    const str = 'filename='
    const index = desc.indexOf(str)
    let filename = ''
    if (index > 0) {
      filename = desc.substring(index + str.length)
    }
    return decodeURIComponent(filename)
  }
  return ''
}

// 秒 转换 为 小时 分钟 秒
export const formatSeconds = (value) => {
  const result = parseInt(value)
  const h = Math.floor(result / 3600) < 10 ? '' + Math.floor(result / 3600) : Math.floor(result / 3600)
  const m = Math.floor((result / 60 % 60)) < 10 ? '' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
  const s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))

  let res = ''
  if (h !== '0') res += `${h}h`
  if (m !== '0') res += `${m}′`
  if (s !== '00') res += `${m}″`
  return res
}

export const getBlob = (base64, contentType, sliceSize) => {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  const byteCharacters = atob(base64)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: contentType })
}
