<template>
  <div class="table-model">
    <TableWrap @handle-page="handlePage" :pages="page" :loading="loading">
      <div class="search__wrap">
        <div class="search__content">
          <el-form ref="MeetingSearch" :model="search" :inline="true">
            <el-form-item>
              <el-input clearable v-model="search.hymc" placeholder="会议名称"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="button__wrap">
          <el-button type="primary" @click="handleAddMeeting">新增</el-button>
          <el-button type="primary" @click="handleBatchRemove">删除</el-button>
        </div>
      </div>
      <div class="table__content" ref="tableWrap">
        <el-table
          :data="tableList"
          :fit="true"
          header-row-class-name="table-header"
          :height="tableHeight"
          @selection-change="handleSelectionChange"
          @row-dblclick="handleLook"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="70">
          </el-table-column>
          <el-table-column
            prop="bh"
            align="center"
            :show-overflow-tooltip="true"
            label="编号">
          </el-table-column>
          <el-table-column
            prop="hymc"
            align="center"
            :show-overflow-tooltip="true"
            label="会议名称">
          </el-table-column>
          <el-table-column
            prop="qcrmc"
            align="center"
            :show-overflow-tooltip="true"
            label="起草人">
          </el-table-column>
          <el-table-column
            prop="hylx"
            align="center"
            :show-overflow-tooltip="true"
            label="类型">
            <template slot-scope="scope">
              <span v-if="scope.row.hylx === '1'">交战办会议通知</span>
              <span v-else>交通委会议通知</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="fbzt"
            align="center"
            :show-overflow-tooltip="true"
            label="发布状态">
            <template slot-scope="scope">
              <span v-if="scope.row.fbzt === '1'">草稿</span>
              <span v-else>已发布</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="spzt"
            align="center"
            :show-overflow-tooltip="true"
            label="审批状态">
            <template slot-scope="scope">
              <span v-if="scope.row.spzt === '1'">-</span>
              <span v-if="scope.row.spzt === '2'"><i style="background:#f00" class="cirleColor"></i>审批中</span>
              <span v-if="scope.row.spzt === '3'"><i style="background:#0f0" class="cirleColor"></i>已审批</span>
              <span v-if="scope.row.spzt === '4'"><i style="background:#000" class="cirleColor"></i>已驳回</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="gxsj"
            align="center"
            :show-overflow-tooltip="true"
            label="更新时间">
            <template slot-scope="scope">{{scope.row.time | dateFormat}}</template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            width="240">
            <template slot-scope="scope">
              <!-- <span @click="handleUpdate(scope.row)" v-if="scope.row.spzt === '1' || scope.row.spzt === '4'" class="handle-text">修改</span> -->
              <!-- <span @click="handleRemove(scope.row)" v-if="scope.row.spzt === '1' || scope.row.spzt === '4'" class="handle-text">删除</span> -->
              <!-- <span @click="handleWithdraw(scope.row)" v-if="scope.row.spzt === '2'" class="handle-text">撤回</span> -->
              <span @click="handleLook(scope.row)" class="handle-text">查看</span>
              <!-- <span @click="handlePrint(scope.row)" v-if="scope.row.spzt === '3' || scope.row.spzt === '4' " class="handle-text">打印</span> -->
              <!-- <span @click="handlePreview(scope.row)" class="handle-text">预览</span> -->
              <!-- <el-dropdown trigger="click" @command="item => handleCommond(item, scope.row)">
                <span class="el-dropdown-link"><i class="el-icon-more-outline"/></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="Look">查看</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.spzt === '1' || scope.row.spzt === '4'" command="Update">修改</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.spzt === '1'" command="Remove">删除</el-dropdown-item>
                  <el-dropdown-item command="Preview">预览</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.spzt === '3' || scope.row.spzt === '4'" command="Print">打印</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.spzt === '2'" command="Withdraw">撤回</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </TableWrap>
  </div>
</template>

<script>
import tableView from '@mixins/tableView.js'
export default {
  name: 'test',
  mixins: [tableView],
  data() {
    return {
      loading: false,
      tableList: []
    }
  },
  methods: {
    handleAddMeeting () {
      console.log('dd')
    },
    handleBatchRemove () {
      console.log('dd')
    },
    handleLook () {
      console.log('dd')
    }
  }
}
</script>

<style lang='scss' scoped>
  .table-model {
    height: 100%;
    i.cirleColor {
      width: 8px;
      height: 8px;
      display: inline-block;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
</style>
