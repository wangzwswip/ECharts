import axios from 'axios'
/**
 * 民用运力
 */
import * as api from '../api'
export default {
  name: 'ask',
  services: {
    onlyDownload: (_params) => {
      return axios.post(api.onlyDownload, _params, {
        baseURL: api.url,
        responseType: 'blob'
      })
    },
    SomeDownload: (_params) => {
      return axios.post(api.SomeDownload, _params, {
        baseURL: api.url,
        responseType: 'blob'
      })
    },
    //
    // - - - - - - 演练管理 - - - - - -
    //
    // 分页查询
    getExerciseList: (_params) => {
      return axios.post(api.getExerciseList, _params)
    },
    //
    // - - - - - - 潜力数据核查 - - - - - -
    //
    // 筛选交管局数据----导出
    exportTrafficData: (_params) => {
      return axios.post(api.exportTrafficData, _params, {
        responseType: 'arraybuffer'
      })
    },
    exportpotential: (_params) => {
      return axios.post(api.exportpotential, _params, {
        responseType: 'arraybuffer'
      })
    },
    // 筛选交管局数据----导入
    importTrafficData: (_params) => {
      return axios.post(api.importTrafficData, _params)
    },
    importpotential: (_params) => {
      return axios.post(api.importpotential, _params)
    },
    // 运营车辆数据对比
    getCarDataList: () => {
      return axios.get(`${api.getCarDataList}`)
    },
    /* getCarDataList: (_params) => {
      return axios.get(`${api.getCarDataList}`)
    }, */
    putCarData: (_params) => {
      return axios.post(api.putCarData, _params)
    },
    // 分发各区待核查数据------导出
    getWaitDataListExport: (_params) => {
      return axios.post(api.getWaitDataListExport, _params, {
        responseType: 'arraybuffer'
      })
    },
    // 分发各区待核查数据
    getWaitDataList: (_params) => {
      return axios.post(api.getWaitDataList, _params)
    },
    getOverDataList: (_params) => {
      return axios.post(api.getOverDataList, _params)
    },
    allotCarDataList: (_params) => {
      return axios.post(api.allotCarDataList, _params)
    },
    allotEnsure: (_params) => {
      return axios.post(api.allotEnsure, _params)
    },
    submitTask: (_params) => {
      return axios.put(`${api.submitTask}/${_params}`)
    },
    // 上报潜力核查数据
    reportDataList: (_params) => {
      return axios.post(api.reportDataList, _params)
    },
    // 上报潜力核查数据----导出
    reportDataListExport: (_params) => {
      return axios.post(api.reportDataListExport, _params, {
        responseType: 'arraybuffer'
      })
    },
    inspectSubmit: (_params) => {
      return axios.post(api.inspectSubmit, _params)
    },

    // 核查情况查询
    // 核查任务情况统计
    getDataStatistics: (_params) => {
      return axios.post(api.getDataStatistics, _params)
    },
    // 核查任务情况统计-------导出
    DataStatisticsExpore: (_params) => {
      return axios.post(api.DataStatisticsExpore, _params, {
        responseType: 'arraybuffer'
      })
    },
    //
    // - - - - - - 潜力数据采集 - - - - - -
    //
    // 分页查询
    getOperationVechicleList: (_params) => {
      return axios.post(api.getOperationVechicleList, _params)
    },
    //
    // - - - - - - 预征用核查 - - - - - -
    //
    // 下发预征用核查任务-下发任务
    requistTaskRwqkTask: (_params) => {
      return axios.post(api.requistTaskRwqkTask, _params)
    },
    // 下发预征用核查任务-新增
    addRequistTaskList: (_params) => {
      return axios.post(api.addRequistTaskList, _params)
    },
    // 下发预征用核查任务-编辑
    editorRequistTaskList: (_params) => {
      return axios.put(api.editorRequistTaskList, _params)
    },
    // 下发预征用核查任务-删除
    delRequistTaskList: (id) => {
      return axios.delete(`${api.delRequistTaskList}/${id}`)
    },
    // 查看预征用核查任务-导出
    watchTaskImport: (_params) => {
      return axios.post(api.watchTaskImport, _params, {
        responseType: 'arraybuffer'
      })
    },
    // 查看预征用核查任务-核查
    watchTaskCheck: (_params) => {
      return axios.post(api.watchTaskCheck, _params)
    },
    // 下发预征用核查任务
    requistTaskRwqkCount: (_params) => {
      return axios.post(api.requistTaskRwqkCount, _params)
    },
    // 查看预征用核查任务
    queryRequistTaskList: (_params) => {
      return axios.post(api.queryRequistTaskList, _params)
    },
    // 已分配的车辆
    resultCarListcom: (_params) => {
      return axios.post(api.resultCarListcom, _params)
    },
    // 查看预征用核查任务
    queryRequistTaskListl: (_params) => {
      return axios.post(api.queryRequistTaskListl, _params)
    },
    resultCarList: (_params) => {
      return axios.post(api.resultCarList, _params)
    },
    resultCarLists: (_params) => {
      return axios.post(api.resultCarLists, _params)
    },
    resultCarListarr: (_params) => {
      return axios.post(api.resultCarListarr, _params)
    },
    resultCarListyyy: (_params) => {
      return axios.post(api.resultCarListyyy, _params)
    },
    resultCarSubmit: (ids) => {
      return axios.put(`${api.resultCarSubmit}/${ids}`)
    },
    // 查看预征用核查数据
    queryRequistDataList: (_params) => {
      return axios.post(api.queryRequistDataList, _params)
    },
    // 预征用核查车辆------导出
    requisitionCarExpore: (_params) => {
      return axios.post(api.requisitionCarExpore, _params, {
        responseType: 'arraybuffer'
      })
    },
    // 撤回预征用车辆
    removeyzycar: (_params) => {
      return axios.get(`${api.removeyzycar}?id=${_params}`)
    },
    // 撤回征用车辆
    removezycar: (_params) => {
      return axios.put(api.removezycar, _params)
    },
    // 预征车辆和首批车辆------导出
    bothCarExpore: (_params) => {
      return axios.post(api.bothCarExpore, _params, {
        responseType: 'arraybuffer'
      })
    },
    carInfoInspect: (_params) => {
      return axios.post(api.carInfoInspect, _params)
    },

    // 已核查的可征用数据
    OverRequistDataList: (_params) => {
      return axios.post(api.OverRequistDataList, _params)
    },
    // 已核查的可征用数据------导出
    checkDataExpore: (_params) => {
      return axios.post(api.checkDataExpore, _params, {
        responseType: 'arraybuffer'
      })
    },
    // 确认预征用首批征用车辆
    addPlanCar: (_params) => {
      return axios.post(api.addPlanCar, _params)
    },
    getPlanCarList: (_params) => {
      return axios.post(api.getPlanCarList, _params)
    },
    getPlanCarListlist: (_params) => {
      return axios.post(api.getPlanCarListlist, _params)
    },
    addFirstCar: (_params) => {
      return axios.put(api.addFirstCar, _params)
    },
    //
    // - - - - - - 征用管理 - - - - - -
    //
    // 导出车辆补偿情况记录信息
    exportCompensationList: (_params) => {
      return axios.post(api.exportCompensationList, _params, {
        baseURL: api.url,
        responseType: 'blob'
      })
    },
    // 导出车辆交付记录信息
    exportDeliveredList: (_params) => {
      return axios.post(api.exportDeliveredList, _params, {
        baseURL: api.url,
        responseType: 'blob'
      })
    },
    // 导出车辆处罚记录信息
    exportPunishList: (_params) => {
      return axios.post(api.exportPunishList, _params, {
        baseURL: api.url,
        responseType: 'blob'
      })
    },
    // 导出车辆复原记录信息
    exportRecoverList: (_params) => {
      return axios.post(api.exportRecoverList, _params, {
        baseURL: api.url,
        responseType: 'blob'
      })
    },
    // 管理征用证照分页查询
    getExpPicture: (_params) => {
      return axios.post(api.getExpPicture, _params)
    },
    // 计划安排查询
    getExpPlan: (_params) => {
      return axios.post(api.getExpPlan, _params)
    },
    // 新增计划安排
    addExpPlan: (_params) => {
      return axios.post(api.addExpPlan, _params)
    },
    // 选择车辆查询
    getSelectCarList: (_params) => {
      return axios.post(api.getSelectCarList, _params)
    },
    // 删除计划安排
    deleteExpPlan: (_params) => {
      return axios.delete(`${api.deleteExpPlan}/${_params}`)
    },
    // 分批删除计划安排
    deleteAllExpPlan: (_params) => {
      return axios.delete(api.deleteExpPlan, {
        data: _params
      })
    },
    // 录入征用情况查询
    addInputRequisition: (_params) => {
      return axios.post(api.addInputRequisition, _params)
    },
    // 录入征用情况
    getInputRequisitionList: (_params) => {
      return axios.post(api.getInputRequisitionList, _params)
    },
    // 交付使用查询
    getUseunitList: (_params) => {
      return axios.post(api.getUseunitList, _params)
    },
    // 交付记录查询（hphm）
    getDeliveryRecordList: (_params) => {
      return axios.post(api.getDeliveryRecordList, _params)
    },
    // 分页查询交付使用情况记录表
    getDeliveredRecordList: (_params) => {
      return axios.post(api.getDeliveredRecordList, _params)
    },
    // 分页查询复原情况记录表
    getRecoverRecordList: (_params) => {
      return axios.post(api.getRecoverRecordList, _params)
    },
    // 分页查询补偿情况记录表
    getCompensationRecordList: (_params) => {
      return axios.post(api.getCompensationRecordList, _params)
    },
    // 分页查询处罚情况记录表
    getPunishRecordList: (_params) => {
      return axios.post(api.getPunishRecordList, _params)
    },
    // 删除交付车辆记v录
    deleteUserRecord: (id) => {
      return axios.delete(`${api.deleteUserRecord}/${id}`)
    },
    // 添加交付使用记录
    addUserRecord: (_params) => {
      return axios.post(api.addUserRecord, _params)
    },
    // 修改交付使用记录
    updateUserRecord: (_params) => {
      return axios.put(api.updateUserRecord, _params)
    },
    // 征用情况查询
    getRequisitionList: (_params) => {
      return axios.post(api.getRequisitionList, _params)
    },
    // 添加车辆复原记录
    addRecarRecord: (_params) => {
      return axios.post(api.addRecarRecord, _params)
    },
    // 添加车辆复原记录(新)
    addRecarRecordNew: (_params) => {
      return axios.post(api.addRecarRecordNew, _params)
    },
    // 导出复原记录
    outRecarRecord: (_params) => {
      return axios.post(api.outRecarRecord, _params)
    },
    // 添加、修改处罚情况
    addUpdatePunish: (_params) => {
      return axios.post(api.addUpdatePunish, _params)
    },
    // 添加、修改补偿情况
    addUpdateCompensation: (_params) => {
      return axios.post(api.addUpdateCompensation, _params)
    },
    // 文件下载
    downloadFile: (_params) => {
      return axios.get(`${api.downloadFile}/?id=${_params}`, {
        responseType: 'arraybuffer'
      })
    },
    // 民用运力字典
    getDictionaryList: (_params) => {
      return axios.get(`${api.getDictionaryList}/${_params}`)
    },
    // 证照批量下载
    /* SomeDownload: (_params) => {
      return axios.post(api.SomeDownload, _params)
    }, */
    // 证照单独下载
    /* onlyDownload: (_params) => {
      return axios.post(api.onlyDownload, _params)
    }, */
    // 更新交付计划
    updataDeliveryPlan: (_params) => {
      return axios.put(api.updataDeliveryPlan, _params)
    },
    // 录入征用情况分页查询
    getdeliveredPlanVehicleList: (_params) => {
      return axios.post(api.getdeliveredPlanVehicleList, _params)
    },
    // 录入交付使用
    InputExerciseCord: (_params) => {
      return axios.post(api.InputExerciseCord, _params)
    },
    //
    // - - - - - - 演练管理 - - - - - -
    //
    // 演练征用情况查询
    getExeRegisterList: (_params) => {
      return axios.post(api.getExeRegisterList, _params)
    },
    // 分页查询应急演练预分配车辆列表
    getExerDispenseLiset: (_params) => {
      return axios.post(api.getExerDispenseLiset, _params)
    },
    // 分页查询应急演练车辆列表
    getExerDeliveredLiset: (_params) => {
      return axios.post(api.getExerDeliveredLiset, _params)
    },
    // 分页查询应急演练情况记录表
    getExerRecordLiset: (_params) => {
      return axios.post(api.getExerRecordLiset, _params)
    },
    // 新增应急演练情况记录表
    addExerRecord: (_params) => {
      return axios.post(api.addExerRecord, _params)
    },
    // 筛选交管局数据----导出
    exportExerRecord: (_params) => {
      return axios.post(api.exportExerRecord, _params, {
        responseType: 'arraybuffer'
      })
    },
    // 删除应急演练情况记录表
    deleteExerRecord: (id) => {
      return axios.delete(`${api.deleteExerRecord}/${id}`)
    },
    // 修改应急演练情况记录表
    updataExerRecord: (_params) => {
      return axios.put(api.updataExerRecord, _params)
    }
    /* addExcePlan: (_params) => {
      return axios.post(api.addExcePlan, _params)
    } */
  }
}
