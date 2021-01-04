/**
 * author     dark
 * date       18/12/19
 */
'use strict'
import { POPUP_DETAIL, POPUP_MONITOR_CAR_DETAIL, CURR_CAR_INFO } from '../mutation-types'

// initial state
const state = {
  popupDetail: {},
  currCarInfo: {},
  popupMonitorCarDetail: {}
}

// getters
const getters = {
  popupDetail: state => state.popupDetail,
  currCarInfo: state => state.currCarInfo,
  popupMonitorCarDetail: state => state.popupDetail
}

// actions
const actions = {
  popupDetail ({ commit, state }, params) {
    commit(POPUP_DETAIL, params)
  },
  currCarInfo ({ commit, state }, params) {
    commit(CURR_CAR_INFO, params)
  },
  popupMonitorCarDetail ({ commit, state }, params) {
    commit(POPUP_MONITOR_CAR_DETAIL, params)
  }
}

// mutations
const mutations = {
  [POPUP_DETAIL] (state, params) {
    state.popupDetail = params
  },
  [CURR_CAR_INFO] (state, params) {
    state.currCarInfo = params
  },
  [POPUP_MONITOR_CAR_DETAIL] (state, params) {
    state.popupMonitorCarDetail = params
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
