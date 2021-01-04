import { SET_USER, SHOW_TRACK_BACK_PANEL, SHOW_VIDEO_BACK_PANEL, ALARM_SHOW_VIDEO_BACK_PANEL, ALARM_SHOW_TRACK_BACK_PANEL, ALARM_REAL_TIME_VIDEO } from '../mutation-types'

// initial state
const state = {
  // user: JSON.parse(localStorage.getItem('x_car_user_info')) || {},
  showTrackBackPanel: false,
  showVideoBackPanel: false,
  alarmShowTrackBackPanel: false,
  alarmShowVideoBackPanel: false,
  alarmRealTimeVideo: false,
  user: JSON.parse(localStorage.getItem('x_crms_admin_user_info')) || {}
}

// getters
const getters = {
  user: state => state.user,
  showTrackBackPanel: state => state.showTrackBackPanel,
  showVideoBackPanel: state => state.showVideoBackPanel,
  alarmShowTrackBackPanel: state => state.alarmShowTrackBackPanel,
  alarmShowVideoBackPanel: state => state.alarmShowVideoBackPanel,
  alarmRealTimeVideo: state => state.alarmRealTimeVideo
}

// actions
const actions = {
  setUser ({ commit, state }, params) {
    commit(SET_USER, params)
  },
  showTrackBackPanel ({ commit, state }, params) {
    commit(SHOW_TRACK_BACK_PANEL, params)
  },
  showVideoBackPanel ({ commit, state }, params) {
    commit(SHOW_VIDEO_BACK_PANEL, params)
  },
  alarmShowTrackBackPanel ({ commit, state }, params) {
    commit(ALARM_SHOW_TRACK_BACK_PANEL, params)
  },
  alarmShowVideoBackPanel ({ commit, state }, params) {
    commit(ALARM_SHOW_VIDEO_BACK_PANEL, params)
  },
  alarmRealTimeVideo ({ commit, state }, params) {
    commit(ALARM_REAL_TIME_VIDEO, params)
  }
}

// mutations
const mutations = {
  [SET_USER] (state, params) {
    state.user = params
    localStorage.setItem('x_crms_admin_user_info', JSON.stringify(params))
    // localStorage.setItem('x_car_user_info', JSON.stringify(params))
  },
  [SHOW_TRACK_BACK_PANEL] (state, params) {
    state.showTrackBackPanel = params
  },
  [SHOW_VIDEO_BACK_PANEL] (state, params) {
    state.showVideoBackPanel = params
  },
  [ALARM_SHOW_TRACK_BACK_PANEL] (state, params) {
    state.alarmShowTrackBackPanel = params
  },
  [ALARM_SHOW_VIDEO_BACK_PANEL] (state, params) {
    state.alarmShowVideoBackPanel = params
  },
  [ALARM_REAL_TIME_VIDEO] (state, params) {
    state.alarmRealTimeVideo = params
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
