/**
 * 综合办公模块
 * 鉴权
 */
import axios from 'axios'
import * as api from '../api'

export default {
  name: 'office',
  services: {

    //
    // - - - - - - 交通保障任务 - - - - - -
    //
    // 分页查询
    getTaskList: (_params) => {
      return axios.post(api.getTaskList, _params)
    },
    // 新增：发送审批、保存草稿任务
    addSaveTask: (_params) => {
      return axios.post(api.addSaveTask, _params)
    },
    // 编辑：发送审批、保存草稿任务
    updateSaveTask: (_params) => {
      return axios.put(api.updateSaveTask, _params)
    },
    // 查保障任务（全部）
    selectTaskAll: (id) => {
      return axios.get(`${api.selectTaskAll}/${id}`)
    },
    // 删除保障任务
    deleteTask: (id) => {
      return axios.delete(`${api.deleteTask}/${id}`)
    },
    getchuzhangList: () => {
      return axios.get(`${api.getchuzhangList}`)
    },
    // 获取全部人员
    getAllUser: () => {
      return axios.get(api.getAllUser)
    },
    // 通知书预览
    noticePreview: (_params) => {
      return axios.post(api.noticePreview, _params)
    },
    // 通知书预览id
    noticePreviewId: (_params) => {
      return axios.post(api.noticePreviewId, _params)
    },
    // 保障函预览
    letterPreview: (_params) => {
      return axios.post(api.letterPreview, _params)
    },
    // 保障函预览id
    letterPreviewId: (_params) => {
      return axios.post(api.letterPreviewId, _params)
    },
    // 通知书下载
    noticeDownload: (_params) => {
      return axios.post(api.noticeDownload, _params, {
        responseType: 'arraybuffer'
      })
    },
    // 保障函下载
    letterDownload: (_params) => {
      return axios.post(api.letterDownload, _params, {
        responseType: 'arraybuffer'
      })
    },
    // 任务驳回
    taskRecall: (id) => {
      return axios.post(`${api.taskRecall}/${id}`)
    },
    /** **************首页 ************/
    // 获取代办任务
    getDBTask: () => {
      return axios.get(api.getDBTask)
    },
    // 获取已办任务
    getYBTask: () => {
      return axios.get(api.getYBTask)
    },
    // 获取会议通知
    getMeetingNotice: () => {
      return axios.get(api.getMeetingNotice)
    },
    // 获取组织机构统计
    getZZJGTJData: () => {
      return axios.get(api.getZZJGTJData)
    },
    // 获取行业数据统计
    getHYSJTJData: () => {
      return axios.get(api.getHYSJTJData)
    },
    // 获取综合建设数据统计
    getZHJSTJData: () => {
      return axios.get(api.getZHJSTJData)
    },
    /** **************我的任务 ************/
    // 获取审核信息
    getCheckInfo: (_params) => {
      return axios.get(`${api.getCheckInfo}/${_params}`)
    },
    // 通过任务
    handleApprove: (_params) => {
      return axios.post(api.handleApprove, _params)
    },
    // 驳回任务
    handleReject: (_params) => {
      return axios.post(api.handleReject, _params)
    },
    // 获取我的任务
    getMyTaskList: (_params) => {
      return axios.post(api.getMyTaskList, _params)
    },
    /** **************签报 ************/
    // 获取签报列表
    getQBList: (_params) => {
      return axios.post(api.getQBList, _params)
    },
    // 新增签报
    handleQBCheck: (_params) => {
      return axios.post(api.handleQBCheck, _params)
    },
    // 保存签报草稿
    handleQBDraft: (_params) => {
      return axios.post(api.handleQBDraft, _params)
    },
    // 保存签报草稿
    handleQBUpdate: (_params) => {
      return axios.post(api.handleQBUpdate, _params)
    },
    // 删除签报草稿
    removeQBDraft: (_params) => {
      return axios.delete(`${api.removeQBDraft}/${_params}`)
    },
    // 预览签报
    getQBPreview: (_params) => {
      return axios.post(api.getQBPreview, _params)
    },
    // 签报审批完成添加领导批示文件
    handlePSWJ: (_params) => {
      return axios.post(api.handlePSWJ, _params)
    },
    // 下载签报
    QBdownload: (_params) => {
      return axios.post(api.QBdownload, _params, {
        responseType: 'arraybuffer'
      }) // { responseType: 'blob' }
    },
    /** **************会议通知 ************/
    // 获取会议通知列表
    getMeetingList: (_params) => {
      return axios.post(api.getMeetingList, _params)
    },
    // 删除会议草稿
    removeMeetingDraft: (_params) => {
      return axios.delete(`${api.removeMeetingDraft}/${_params}`)
    },
    // 新增会议
    handleMeetingCheck: (_params) => {
      return axios.post(api.handleMeetingCheck, _params)
    },
    // 保存会议草稿
    handleMeetingDraft: (_params) => {
      return axios.post(api.handleMeetingDraft, _params)
    },
    // 保存修改会议草稿
    handleMeetingUpdate: (_params) => {
      return axios.post(api.handleMeetingUpdate, _params)
    },
    // 签报预览
    reviewQBDraft: (_params) => {
      return axios.post(api.reviewQBDraft, _params)
    },
    // 预览签报
    getMeetingPreview: (_params) => {
      return axios.post(api.getMeetingPreview, _params)
    },
    /** **************会议室管理 ************/
    // 获取会议室安排
    getRoomPlan: (_params) => {
      return axios.post(api.getRoomPlan, _params)
    },
    // 会议室
    // 新增会议
    handleRoomAdd: (_params) => {
      return axios.post(api.handleRoomAdd, _params)
    },
    // 会议列表
    getRoomList: (_params) => {
      return axios.post(api.getRoomList, _params)
    },
    // 编辑会议
    handleRoomUpdate: (_params) => {
      return axios.put(api.handleRoomUpdate, _params)
    },
    // 删除会议
    removeMeetRoom: (_params) => {
      return axios.delete(`${api.removeMeetRoom}/${_params}`)
    },
    // 会议统计
    getRoomStatic: (_params) => {
      return axios.post(api.getRoomStatic, _params)
    },
    // 会议预览
    MeetingReview: (_params) => {
      return axios.post(api.MeetingReview, _params)
    },
    // 会议下载
    MeetingDowload: (_params) => {
      return axios.post(api.MeetingDowload, _params, {
        responseType: 'arraybuffer'
      })
    },
    // 会议撤回
    widthdrawMeet: (_params) => {
      return axios.get(`${api.widthdrawMeet}?id=${_params}`)
    },
    // 文件下载
    downloadFile: (_params) => {
      return axios.get(`${api.downloadFile}/?id=${_params}`, {
        responseType: 'arraybuffer'
      })
    }
  }
}
