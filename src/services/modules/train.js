/**
 * 训练演练模块
 */
import axios from 'axios'
import * as api from '../api'

export default {
  name: 'train',
  services: {

    //
    // - - - - - - 计划制定 - - - - - -
    //
    // 分页查询
    getPlanList: (_params) => {
      return axios.post(api.getPlanList, _params)
    },
    // 新增计划
    addTrainPlan: (_params) => {
      return axios.post(api.addTrainPlan, _params)
    },
    // 删除计划
    delTrainPlan: (id) => {
      return axios.delete(`${api.delTrainPlan}/${id}`)
    },
    // 修改计划
    updataTrainPlan: (_params) => {
      return axios.put(api.updataTrainPlan, _params)
    },
    //
    // - - - - - - 场景构建 - - - - - -
    //
    // 分页查询
    getSceneList: (_params) => {
      return axios.post(api.getSceneList, _params)
    },
    // 新增场景
    addTrainScene: (_params) => {
      return axios.post(api.addTrainScene, _params)
    },
    // 根据id查计划
    selectPlanInfo: (id) => {
      return axios.get(`${api.selectPlanInfo}/?jhid=${id}`)
    },
    // 删除场景
    delTrainScene: (id) => {
      return axios.delete(`${api.delTrainScene}/${id}`)
    },
    // 修改场景
    updataTrainScene: (_params) => {
      return axios.put(api.updataTrainScene, _params)
    },
    //
    // - - - - - - 场景控制 - - - - - -
    //
    // 分页查询
    getControlList: (_params) => {
      return axios.post(api.getControlList, _params)
    },
    // 根据chjd查场景
    selectSceneInfo: (id) => {
      return axios.get(`${api.selectSceneInfo}/?chjd=${id}`)
    },
    // 新增场景控制
    addTrainControl: (_params) => {
      return axios.post(api.addTrainControl, _params)
    },
    //
    // - - - - - - 过程回放 - - - - - -
    //
    // 分页查询
    getReviewList: (_params) => {
      return axios.post(api.getReviewList, _params)
    },
    // 根据id查全部
    selectAllInfo: (id) => {
      return axios.get(`${api.selectAllInfo}/${id}`)
    },
    //
    // - - - - - - 总结评估 - - - - - -
    //
    // 分页查询
    getAssessList: (_params) => {
      return axios.post(api.getAssessList, _params)
    },
    // 新增场景控制
    addAssess: (_params) => {
      return axios.put(api.addAssess, _params)
    }
  }
}
