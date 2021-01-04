//
// ----------------- 配置 相关 -----------------
//
export const url = process.env.VUE_APP_url
export const socketUrl = process.env.VUE_APP_url_socket

//
// ----------------- 鉴权 相关接口 -----------------
//
export const login = '/crms-security-service/v1/security/users/anon/login'
export const logout = '/crms-security-service/v1/security/users/anon/logout'
export const updatePassword = '/crms-security-service/v1/security/users/update/password'
export const getRandomSalt = '/crms-security-service/v1/security/users/anon/login-salt'
export const getFileUrl = '/vehiclemonitor-security-service/file/fileserver'
export const getPermisionList = '/crms-security-service/v1/security/permissions/list-by-Id'

//
// ----------------- 系统 相关接口 -----------------
//
// 部门
export const getDeptTree = '/crms-security-service/v1/security/departments/tree'
export const insertDept = '/crms-security-service/v1/security/departments/insert'
export const editDept = '/crms-security-service/v1/security/departments/update'
export const removeDept = '/crms-security-service/v1/security/departments/delete'
// 用户
export const getUserList = '/crms-security-service/v1/security/users/page'
export const insertUser = '/crms-security-service/v1/security/users/insert'
export const removeUser = '/crms-security-service/v1/security/users/delete'
export const updateUser = '/crms-security-service/v1/security/users/update'
export const switchUser = '/vehiclemonitor-security-service/v1/security/users'
export const rePassword = '/vehiclemonitor-security-service/v1/security/users/update/password'
export const resetPassword = '/crms-security-service/v1/security/users/cz/password'

// 角色
export const getRoleSelect = '/crms-security-service/v1/security/permissions/list-tree'
export const getRoleList = '/crms-security-service/v1/security/roles/get/list'
export const insertRole = '/vehiclemonitor-security-service/v1/security/roles/insert'
export const removeRole = '/vehiclemonitor-security-service/v1/security/roles/delete'
export const getPermissions = '/crms-security-service/v1/security/permissions/list-tree'
export const getPermissionsById = '/crms-security-service/v1/security/permissions/list-by-roleId'
export const updatePermissions = '/crms-security-service/v1/security/roles/update'

//
// ----------------- 训练演练 相关接口 -----------------
//
// 计划制定
export const getPlanList = '/crms-business-service/trainPlan/list' // 分页查询
export const addTrainPlan = '/crms-business-service/trainPlan/add' // 新增计划
export const delTrainPlan = '/crms-business-service/trainPlan/delete' // 删除计划
export const updataTrainPlan = '/crms-business-service/trainPlan/update' // 修改计划
// 场景构建
export const getSceneList = '/crms-business-service/trainControl/list' // 分页查询
export const addTrainScene = '/crms-business-service/trainControl/add' // 新增场景
export const selectPlanInfo = '/crms-business-service/trainControl/getJhId' // 根据id查计划
export const delTrainScene = '/crms-business-service/trainControl/delete' // 删除场景
export const updataTrainScene = '/crms-business-service/trainControl/update' // 修改场景
// 场景控制
export const getControlList = '/crms-business-service/trainScene/list' // 分页查询
export const addTrainControl = '/crms-business-service/trainScene/add' // 新增控制
export const selectSceneInfo = '/crms-business-service/trainScene/getCjId' // 根据id查场景
// 过程回放
export const getReviewList = '/crms-business-service/tarinPlayBack/list' // 分页查询
export const selectAllInfo = '/crms-business-service/tarinPlayBack/get' // 根据id查全部
// 总结评价
export const getAssessList = '/crms-business-service/trainEvaluation/list' // 分页查询
export const addAssess = '/crms-business-service/trainEvaluation/update' // 新增评价
//
//
// ----------------- 综合办公 相关接口 -----------------
//
export const downloadFile = '/crms-business-service/file/download' // 下载文件
// 首页
export const getDBTask = '/crms-business-service/trainPlan/list' // 获取代办任务
export const getYBTask = '/crms-business-service/trainPlan/list' // 获取已办任务
export const getMeetingNotice = '/crms-business-service/trainPlan/list' // 获取会议通知
export const getZZJGTJData = '/crms-business-service/indexDataStatistic/organizationDataStatistic' // 获取组织机构统计
export const getHYSJTJData = '/crms-business-service/indexDataStatistic/industryDataStatistic' // 获取行业数据
export const getZHJSTJData = '/crms-business-service/indexDataStatistic/comprehenConstructDataStatistic' // 获取综合建设数据

// 我的任务
export const getCheckInfo = '/crms-business-service/myTask/get' // 获取审核信息
export const handleApprove = '/crms-business-service/myTask/getPass' // 通过任务
export const handleReject = '/crms-business-service/myTask/getPass' // 驳回任务
export const getMyTaskList = '/crms-business-service/myTask/list' // 任务列表
export const getAllUser = '/crms-business-service/myTask/getUser' // 获取所有用户

// 签报
export const getQBList = '/crms-business-service/signManagement/list' // 获取签报列表
export const handleQBCheck = '/crms-business-service/signManagement/add' // 新增签报审批
export const handleQBDraft = '/crms-business-service/signManagement/add' // 新增签报草稿
export const getQBPreview = '/crms-business-service/signManagement/exportWordAndHtml' // 预览签报
export const handleQBUpdate = '/crms-business-service/signManagement/update' // 更新签报
export const removeQBDraft = '/crms-business-service/signManagement/delete' // 删除签报草稿
export const reviewQBDraft = '/crms-business-service/signManagement/exportWordAndHtml' // 签报预览
export const QBdownload = '/crms-business-service/signManagement/downloadWord'// 签报下载
export const handlePSWJ = '/crms-business-service/signManagement/update' // 签报审批完成，上传批示文件

// 会议通知
export const getMeetingList = '/crms-business-service/meetingNotice/list' // 获取会议列表
export const removeMeetingDraft = '/crms-business-service/meetingNotice/delete' // 删除会议草稿
export const handleMeetingCheck = '/crms-business-service/meetingNotice/add' // 新增会议
export const handleMeetingDraft = '/crms-business-service/meetingNotice/add' // 新增会议草稿
export const handleMeetingUpdate = '/crms-business-service/meetingNotice/update' // 更新会议
export const getMeetingPreview = '/crms-business-service/signManagement/add' // 预览会议
export const MeetingReview = '/crms-business-service/meetingNotice/exportWordAndHtml' // 预览会议
export const MeetingDowload = '/crms-business-service/meetingNotice/downloadWord' // 下载会议
export const widthdrawMeet = '/crms-business-service/myTask/getBhSp' // 下载会议

// 会议室管理
export const getRoomPlan = '/crms-business-service/meetingRoom/list' // 获取会议安排
export const handleRoomAdd = '/crms-business-service/meetingRoom/add' // 新增会议
export const handleRoomUpdate = '/crms-business-service/meetingRoom/update' // 编辑会议
export const getRoomList = '/crms-business-service/meetingRoom/list' // 会议分页
export const removeMeetRoom = '/crms-business-service/meetingRoom/delete' // 删除会议
export const getRoomStatic = '/crms-business-service/meetingRoom/statistics' // 会议统计
//
// ----------------- 综合办公 相关接口 -----------------
//
// 交通保障任务
export const getTaskList = '/crms-business-service/supportTask/list' // 分页查询
export const addSaveTask = '/crms-business-service/supportTask/add' // 新增：发送审批、保存草稿任务
export const updateSaveTask = '/crms-business-service/supportTask/update' // 编辑：发送审批、保存草稿任务
export const selectTaskAll = '/crms-business-service/supportTask/get' // 查保障任务（全部）
export const deleteTask = '/crms-business-service/supportTask/delete' // 删除保障任务
export const getchuzhangList = '/crms-business-service/myTask/getPost' // 处长列表
export const noticePreview = '/crms-business-service/trafficNotice/exportWordAndHtml'// 通知书预览
export const noticePreviewId = '/crms-business-service/trafficNotice/exportWordAndHtmlByTaskId'// 通知书预览id
export const letterPreview = '/crms-business-service/tafficEnsuer/exportWordAndHtml'// 保障函预览
export const letterPreviewId = '/crms-business-service/tafficEnsuer/exportWordAndHtmlByTaskId'// 保障函预览id
export const noticeDownload = '/crms-business-service/trafficNotice/downloadword'// 通知书下载
export const letterDownload = '/crms-business-service/tafficEnsuer/downloadWord'// 保障函下载
export const taskRecall = '/crms-business-service/myTask/getBhSp'// 任务撤回
//
// ----------------- 民用运力 相关接口 -----------------
//
export const getDictionaryList = '/crms-vehicle-service/dictionary'// 民用运力字典
// 筛选交管局数据---导出
export const exportpotential = '/crms-vehicle-service/potentialVehicle/export'
export const exportTrafficData = '/crms-vehicle-service/operationVehicle/export'
// 筛选交管局数据---导入
export const importpotential = '/crms-vehicle-service/potentialVehicle/import'// 筛选交管局数据
export const importTrafficData = '/crms-vehicle-service/operationVehicle/import'// 运营车辆数据对比
// 运营车辆数据对比
export const getCarDataList = '/crms-vehicle-service/potentialVehicle/count/{11000}' // 分页查询
export const putCarData = '/crms-vehicle-service/potentialTask/jg/count' // 分配核查数据
// 分发各区待核查数据
export const getWaitDataList = '/crms-vehicle-service/potentialTask/count/dispense/unit'
// 核查情况查询
export const getOverDataList = '/crms-vehicle-service/potentialTask/count/complete/unit'
// 分发各区待核查数据-----导出
export const getWaitDataListExport = '/crms-vehicle-service/potentialVehicle/export'
export const allotCarDataList = '/crms-vehicle-service/potentialVehicle/list' // 分配分页查询
export const allotEnsure = '/crms-vehicle-service/potentialTask/assign/unit' // 分配确定
// 上报潜力核查数据
export const reportDataList = '/crms-vehicle-service/potentialTask/list' // 分页查询
// 上报潜力核查数据---导出
export const reportDataListExport = '/crms-vehicle-service/potentialTask/export'
export const submitTask = '/crms-vehicle-service/potentialTask/submit' // 提交任务
export const inspectSubmit = '/crms-vehicle-service/potentialTask/affirm' // 核查确定
// 核查情况查询
// 核查任务情况统计
export const getDataStatistics = '/crms-vehicle-service/potentialTask/count/complete/vehicle' // 分页查询
// 已核查的可征用数据------导出
export const checkDataExpore = '/crms-vehicle-service/requisitionTask/count/complete/vehicle/export'
// 核查任务情况统计------导出
export const DataStatisticsExpore = '/crms-vehicle-service/potentialTask/count/complete/vehicle/export'
// 预征用核查车辆------导出
export const requisitionCarExpore = '/crms-vehicle-service/requisitionVehicleTask/completed/export'
// 预征用车辆和首批车辆------导出
export const bothCarExpore = '/crms-vehicle-service/requisitionVehicle/export'
//
// ----------------- 演练管理 相关接口 -----------------
//
export const getExerDispenseLiset = '/crms-vehicle-service/exercise/vehicle/dispense/list' // 分页查询应急演练预分配车辆列表
export const getExerDeliveredLiset = '/crms-vehicle-service/exercise/vehicle/delivered/list' // 分页查询应急演练车辆列表
export const getExerRecordLiset = '/crms-vehicle-service/exercise/record/list' // 分页查询应急演练情况记录表
export const addExerRecord = '/crms-vehicle-service/exercise/record/add' // 新增应急演练情况记录表
export const exportExerRecord = '/crms-vehicle-service/exercise/record/export' // 导出应急演练情况记录表
export const deleteExerRecord = '/crms-vehicle-service/exercise/record/delete' // 删除应急演练情况记录表
export const updataExerRecord = '/crms-vehicle-service/exercise/record/update' // 修改应急演练情况记录表
// 下发演练预征用证照
export const getExerciseList = '/crms-vehicle-service/exerciseLicense/list' // 分页演练列表
//
// 演练征用情况查询
//
export const InputExerciseCord = '/crms-vehicle-service/deliveredVehicle/record' // 录入演练记录、录入民用运力演练记录

// 训练征用情况查询
// 潜力数据采集
export const getOperationVechicleList = '/crms-vehicle-service/operationVehicle/list'
// 下发预征用核查任务
export const requistTaskRwqkCount = '/crms-vehicle-service/requisitionTask/count/dispense/unit'
// 下发预征用核查任务-下达任务
export const requistTaskRwqkTask = '/crms-vehicle-service/requisitionTask/list'
// 查看预征用核查任务--gai
export const queryRequistTaskList = '/crms-vehicle-service/requisitionTask/count/dispense/vehicle'
export const queryRequistTaskListl = '/crms-vehicle-service/requisitionTask/count/dispense/vehicle'
// 下达预征用任务新增
export const addRequistTaskList = '/crms-vehicle-service/requisitionTask/add'
// 下达预征用任务编辑
export const editorRequistTaskList = '/crms-vehicle-service/requisitionTask/update'
// 下达预征用任务删除
export const delRequistTaskList = '/crms-vehicle-service/requisitionTask/delete'
// gai待分配车辆
export const resultCarList = '/crms-vehicle-service/requisitionVehicleTask/dispense/list'
export const resultCarLists = '/crms-vehicle-service/requisitionVehicleTask/dispense/lists'
// gai已分配车辆
export const resultCarListcom = '/crms-vehicle-service/requisitionVehicleTask/vehicle/list'
export const resultCarListyyy = '/crms-vehicle-service/requisitionVehicleTask/vehicle/list'
export const resultCarListarr = '/crms-vehicle-service/requisitionVehicleTask/completed/list'
export const resultCarSubmit = '/crms-vehicle-service/requisitionVehicleTask/submit'
export const watchTaskImport = '/crms-vehicle-service/requisitionVehicleTask/vehicle/export' // 查看预征用核查任务------导出
export const watchTaskCheck = '/crms-vehicle-service/requisitionVehicleTask/affirm' // 查看预征用核查任务-----核查
export const carInfoInspect = '/crms-vehicle-service/requisitionVehicleTask/affirm'// 预征用车辆信息核查
export const queryRequistDataList = '/crms-vehicle-service/requisitionTask/count/complete/unit'// 查看预征用核查数据
// gai
export const OverRequistDataList = '/crms-vehicle-service/requisitionTask/count/complete/vehicle'// 已核查的可征用数据
export const addPlanCar = '/crms-vehicle-service/requisitionVehicle/add'// 确认预征用首批征用车辆
export const getPlanCarList = '/crms-vehicle-service/requisitionVehicle/list'
export const addFirstCar = '/crms-vehicle-service/requisitionVehicle/requisition'
export const getPlanCarListlist = '/crms-vehicle-service/requisitionVehicle/list'
// 撤回预征用车辆
export const removeyzycar = '/crms-vehicle-service/requisitionVehicle/back'
// 撤回征用车辆
export const removezycar = '/crms-vehicle-service/requisitionVehicle/back/requisition'
//
// ----------------- 征用管理 相关接口 -----------------
//
export const exportCompensationList = 'crms-vehicle-service/deliveredVehicle/export/compensation'// 导出车辆补偿情况记录信息
export const exportDeliveredList = '/crms-vehicle-service/deliveredVehicle/export/delivered'// 导出车辆交付记录信息
export const exportPunishList = '/crms-vehicle-service/deliveredVehicle/export/punish'// 导出车辆处罚记录信息
export const exportRecoverList = '/crms-vehicle-service/deliveredVehicle/export/recover'// 导出车辆复原记录信息
export const getExpPicture = '/crms-vehicle-service/requisitionVehicle/list'// 管理征用证照分页查询
export const getExpPlan = '/crms-vehicle-service/deliveredPlan/list'// 计划安排查询
export const addExpPlan = '/crms-vehicle-service/deliveredPlan/add'// 新增计划安排
export const getSelectCarList = '/crms-vehicle-service/deliveredPlanVehicle/requisition/list'// 选择车辆查询
export const deleteExpPlan = '/crms-vehicle-service/deliveredPlan/delete'// 删除计划安排
export const getInputRequisitionList = '/crms-vehicle-service/deliveredVehicle/list'// 录入征用情况查询
export const addInputRequisition = '/crms-vehicle-service/deliveredPlanVehicle/update'// 录入征用情况
export const getUseunitList = '/crms-vehicle-service/deliveredInstitution/list'// 交付单位使用查询
export const getDeliveryRecordList = '/crms-vehicle-service/deliveredVehicle/delivered/list'// 交付记录查询（hphm）
export const addUserRecord = '/crms-vehicle-service/deliveredInstitution/record'// 添加交付使用记录
export const getDeliveredRecordList = '/crms-vehicle-service/deliveredVehicle/list/delivered'// 分页查询交付使用情况记录表
export const getRecoverRecordList = '/crms-vehicle-service/deliveredVehicle/list/recover'// 分页查询复原情况记录表
export const getCompensationRecordList = '/crms-vehicle-service/deliveredVehicle/list/compensation'// 分页查询补偿情况记录表
export const getPunishRecordList = '/crms-vehicle-service/deliveredVehicle/list/punish'// 分页查询处罚情况记录表
export const updateUserRecord = '/crms-vehicle-service/deliveredVehicle/update'// 修改交付使用记录
export const deleteUserRecord = '/crms-vehicle-service/deliveredVehicle/delete'// 删除交付车辆记v录
export const getRequisitionList = '/crms-vehicle-service/deliveredRecord/list'// 征用情况查询
export const addRecarRecord = '/crms-vehicle-service/deliveredRecord/record'// 添加车辆复原记录
export const addRecarRecordNew = '/crms-vehicle-service/deliveredVehicle/recover'// 添加车辆复原记录(新)
export const outRecarRecord = '/crms-vehicle-service/deliveredVehicle/export'// 导出复原记录
export const getExeRegisterList = '/crms-vehicle-service/exerciseRecord/list'// 演练征用情况查询
export const SomeDownload = '/crms-vehicle-service/requisitionVehicle/batch/downloadWord'// 证照批量下载
export const onlyDownload = '/crms-vehicle-service/requisitionVehicle/alone/downloadWord'// 证照单独下载
export const updataDeliveryPlan = '/crms-vehicle-service/deliveredPlan/update'// 更新交付计划
export const addExcePlan = '/crms-vehicle-service/exerciseRecord/record'// 演练添加记录
export const addUpdatePunish = '/crms-vehicle-service/deliveredVehicle/punish'// 添加、修改处罚情况
export const addUpdateCompensation = '/crms-vehicle-service/deliveredVehicle/compensation'// 添加、修改补偿情况
export const getdeliveredPlanVehicleList = '/crms-vehicle-service/deliveredPlanVehicle/list'// 录入征用情况分页查询
// export const carRecallUpdate = ''// 车辆复原更改
