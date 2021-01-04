/**
 * author     dark
 * date       18/11/20
 */
'use strict'
export const isValidPhone = (str) => {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}

export const isVehicleNumber = (vehicleNumber) => {
  let result = false
  if (!vehicleNumber) {
    return result
  }
  if (vehicleNumber.length === 7) {
    let express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
    result = express.test(vehicleNumber)
  }
  return result
}
