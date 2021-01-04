/**
 * 系统管理模块
 */
import axios from 'axios'
import * as api from '../api'

export default {
  name: 'system',
  services: {

    //
    // - - - - - - 部门 - - - - - -
    //
    // 获取部门树
    getDeptTree: (_params) => {
      return axios.get(api.getDeptTree)
    },
    // 新增部门
    insertDept: (_params) => {
      return axios.post(api.insertDept, _params)
    },
    // 编辑部门
    editDept: (_params) => {
      return axios.post(api.editDept, _params)
    },
    // 删除部门
    removeDept: (_params) => {
      return axios.get(`${api.removeDept}/${_params}`)
    },
    //
    // - - - - - - 用户 - - - - - -
    //
    // 获取用户列表
    getUserList: (_params) => {
      return axios.post(api.getUserList, _params)
    },
    // 新增用户
    insertUser: (_params) => {
      return axios.post(api.insertUser, _params)
    },
    // 删除用户
    removeUser: (_params) => {
      return axios.get(`${api.removeUser}/${_params}`)
    },
    // 编辑用户
    updateUser: (_params) => {
      return axios.post(api.updateUser, _params)
    },
    // 启用 - 禁用
    switchUser: (_params) => {
      return axios.get(`${api.switchUser}/${_params.action}/${_params.id}`)
    },
    // 修改密码
    rePassword: (_params) => {
      return axios.post(api.rePassword, _params)
    },
    // 重置密码
    resetPassword: (_params) => {
      return axios.get(`${api.resetPassword}/${_params}`)
    },
    //
    // - - - - - - 角色 - - - - - -
    //
    // 角色列表
    getRoleList: () => {
      return axios.get(api.getRoleList)
    },
    // 获取角色下拉框
    getRoleSelect: () => {
      return axios.get(api.getRoleSelect)
    },
    // 新增角色
    insertRole: (_params) => {
      return axios.post(api.insertRole, _params)
    },
    // 删除角色
    removeRole: (_params) => {
      return axios.get(`${api.removeRole}/${_params}`)
    },
    // 权限
    getPermissions: () => {
      return axios.get(api.getPermissions)
    },
    getPermissionsById: (_params) => {
      return axios.get(`${api.getPermissionsById}/${_params}`)
    },

    // 权限修改
    updatePermissions: (_params) => {
      return axios.post(api.updatePermissions, _params)
    }
  }
}
