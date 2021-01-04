/**
 * 模板页面
 */
import axios from 'axios'

export default {
  name: 'common',
  services: {
    // 分页查询
    getCommonListByPage: (_module, _params) => {
      return axios.post(`/crms-business-service/${_module}/list`, _params)
    },
    // 新增
    addCommon: (_module, _params) => {
      return axios.post(`/crms-business-service/${_module}/add`, _params)
    },
    // 删除
    removeCommon: (_module, _params) => {
      return axios.delete(`/crms-business-service/${_module}/delete/${_params}`)
    },
    // 修改
    updateCommon: (_module, _params) => {
      return axios.put(`/crms-business-service/${_module}/update`, _params)
    },
    // 导入
    importCommon: (_module, _params) => {
      return axios.post(`/crms-business-service/${_module}/import`, _params)
    },
    // 导出
    exportCommon: (_module, _params) => {
      return axios.post(`/crms-business-service/${_module}/export`, _params, {
        responseType: 'arraybuffer'
      })
    },
    // 字典树
    getDictionary: (_params) => {
      return axios.post('/crms-business-service/dictionary/list', _params)
    }
  }
}
