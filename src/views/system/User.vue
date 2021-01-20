<template>
  <div class="two-part-body user-manage">
    <div class="left-part">
      <!-- <div class="left-title">用户管理</div> -->
      <div class="table-tree">
        <el-input
          placeholder="输入关键字进行过滤"
          suffix-icon="el-input__icon el-icon-search"
          v-model="filterText">
        </el-input>
        <Scrollbar class="table-scroll">
          <el-tree
            :props="defaultProps"
            :data="institutionTreeData"
            ref="institutionTree"
            default-expand-all
            node-key="id"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick">
            <div class="table-tree-node" slot-scope="{ node, data }">
              <span class="menu-item" :title="node.label">{{ node.label }}</span>
              <div class="tree-menu-handle">
                <span class="el-icon-plus" v-on:click.stop="addFrame(data)"></span>
                <span class="el-icon-edit" v-on:click.stop="editFrame(data)"></span>
                <span class="el-icon-delete" v-if="node.label !== '一级'" v-on:click.stop="deleteFrame(data)"></span>
              </div>
            </div>
          </el-tree>
        </Scrollbar>
      </div>
    </div>
    <div class="right-part">
      <!-- <div class="right-title">编辑</div> -->
      <div class="right-body">
        <TableWrap @handle-page="handlePage" :pages="page" :loading="loading">
          <div class="search__wrap">
            <User-search class="search__content" @handle-search="handleSearch"/>
            <div class="button__wrap">
              <el-button  type="primary" @click="handleAdd()">新建</el-button>
            </div>
          </div>
          <div class="table__content" ref="tableWrap">
            <el-table
              :data="tableList"
              :fit="true"
              header-row-class-name="table-header"
              :height="tableHeight"
              style="width: 100%">
              <el-table-column
                type="index"
                align="center"
                width="60"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="username"
                align="center"
                :show-overflow-tooltip="true"
                label="登录名">
              </el-table-column>
              <!-- <el-table-column
                prop="roleNames"
                align="center"
                :show-overflow-tooltip="true"
                label="角色">
                <template slot-scope="scope">
                  <span>{{scope.row.roleNames | roleFilter}}</span>
                </template>
              </el-table-column> -->
              <el-table-column
                prop="status"
                align="center"
                :show-overflow-tooltip="true"
                label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 1">启用</span>
                  <span v-else>禁用</span>
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="remark"
                align="center"
                :show-overflow-tooltip="true"
                label="备注">
              </el-table-column> -->
              <el-table-column
                label="操作"
                align="center"
                width="200">
                <template slot-scope="scope">
                  <span @click="handleUpdate(scope.row)" class="handle-text">编辑</span>
                  <span @click="handleRemove(scope.row)" class="handle-text">删除</span>
                  <span @click="handleResetPassword(scope.row)" class="handle-text">重置密码</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </TableWrap>
      </div>
    </div>
    <user-form
      v-if="showDialog"
      @on-close="dialogClose"
      @on-submit="dialogSubmit"
      :params="listItem"
      :parentId="currentId"
      :roleList="roleList"
    />
    <department-form
      v-if="showDepDialog"
      @on-close="depDialogClose"
      @on-submit="depDialogSubmit"
      :params="listItem"
      :parentId="parentId"
    />
  </div>
</template>

<script>
import tableView from '@/mixins/tableView'
export default {
  name: 'User',
  components: {
    Scrollbar
  },
  mixins: [tableView],
  data () {
    return {
      flag: true,
      loading: false,
      showDepDialog: false,
      filterText: '',
      tableList: [
        {
          username: 'xxx',
          status: 1
        },
        {
          username: 'xxxx',
          status: 2
        }
      ],
      roleList: [],
      institutionTreeData: [
        {
          id: '01',
          name: '一级',
          parentId: '00',
          children: [
            {
              id: '0101',
              name: '二级1',
              parentId: '01',
              children: null
            },
            {
              id: '0102',
              name: '二级2',
              parentId: '01',
              children: null
            },
            {
              id: '0103',
              name: '二级3',
              parentId: '01',
              children: null
            }
          ]
        }
      ],
      institutionList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      departmentForm: {
        name: '',
        manager: '',
        phone: '',
        remark: '',
        parentId: ''
      },
      currentId: '',
      parentId: ''
    }
  },
  watch: {
    filterText (val) {
      console.log(val, '搜素')
      this.$refs.institutionTree.filter(val)
    }
  },
  filters: {
    roleFilter (_value) {
      let val = '-'
      if (_value === null) return '-'
      val = _value.toString()
      return val
    }
  },
  methods: {
    handleResetPassword (row) {
      this.$confirm('确定要重置密码吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.system.resetPassword(row.id).then(resp => {
          this.$message({ type: 'success', message: '重置成功!' })
          this.getList()
        })
      }).catch(() => {
        this.$message({ showClose: true, type: 'info', message: '已取消操作' })
      })
    },
    getRoleList () {
      this.roleList = []
      this.$http.system.getRoleList().then(res => {
        console.log('资源列表', res)
        this.roleList = res
      })
    },
    depDialogClose () {
      this.listItem = {}
      this.showDepDialog = false
    },
    depDialogSubmit () {
      this.showDepDialog = false
      this.listItem = {}
      this.getDepartmentTree()
    },
    handleNodeClick (data) {
      if (this.currentId !== data.id) {
        this.currentId = data.id
        this.getList()
        console.log(data.id)
      }
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    addFrame (data) {
      this.parentId = data.id
      this.listItem = { id: null }
      this.showDepDialog = true
    },
    editFrame (data) {
      console.log('编辑', data)
      this.parentId = null
      this.listItem = data
      this.showDepDialog = true
    },
    deleteFrame (data) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.system.removeDept(data.id).then(resp => {
          if (resp) {
            this.$message({ type: 'success', message: '删除成功!' })
            this.getDepartmentTree()
          } else {
            this.$message({ type: 'error', message: '删除失败!' })
          }
        })
      }).catch(() => {
        this.$message({ showClose: true, type: 'info', message: '已取消操作' })
      })
    },
    removeFunc (_row) {
      this.$http.system.removeUser(_row.id)
        .then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        })
    },
    getList () {
      this.loading = true
      let params = {
        departmentId: this.currentId
      }
      params = Object.assign(params, this.page, this.search)
      this.$http.system.getUserList(params)
        .then(res => {
          console.log('分页', res)
          if (res) {
            this.tableList = res.list
            this.page.total = res.total
          }
          this.loading = false
        })
        .catch(e => {
          console.error('分页查询错误: ', e)
          this.loading = false
        })
    },
    // 获取部门树
    getDepartmentTree () {
      this.$http.system.getDeptTree().then(val => {
        console.log('部门树', val)
        if (val) {
          this.institutionTreeData = []
          this.institutionTreeData.push(val)
          this.institutionList.push(val)
          this.circle(this.institutionList)
        }
      })
    },
    circle (item) {
      const el = this.$refs.institutionTree
      item.forEach(v => {
        if (v.children && v.children.length > 0 && this.flag) {
          this.circle(v.children)
        } else {
          if (this.flag) {
            this.currentId = v.id
            this.$nextTick(() => {
              el.setCurrentKey(v.id)
            })
            this.getList()
            this.flag = false
          }
        }
      })
    }
  },
  mounted () {
    // this.getDepartmentTree()
    // this.getRoleList()
  }
}
</script>

<style lang='scss'>
.user-manage {
  .table-tree {
    padding: 10px;
    height: 100%;
    position: relative;
    .el-input {
      width: 206px!important;
      height: 40px!important;
      margin-bottom: 10px;
    }
    .table-scroll {
      height: calc(100% - 50px)
    }
    .is-leaf {
      color: rgba($color: #fff, $alpha: 0) !important;
    }
    .is-current {
      > .el-tree-node__content {
        color: #196E74;
        // background: linear-gradient(to right, #2365dc, #1890ff);
        background:rgba(24, 105, 111, 0.1);
        .el-tree-node__expand-icon {
          color:#196E74;
        }
        .el-dropdown-link {
          color: #196E74;
          &:hover {
            color: #196E74;
          }
        }
      }
    }
    .el-tree-node__content {
      height: 40px;
      line-height: 40px;
      &:hover {
        cursor: pointer;
        color: #196E74!important;
        background:rgba(24, 105, 111, 0.1)!important;;
      }
      .el-dropdown-link {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 4px;
        transition: .3s;
        text-align: center;
        &:hover {
          cursor: pointer;
          color:  #196E74!important;
          background: rgba(5, 157, 67, 0.1)!important;
        }
      }
    }
    .table-tree-node {
      height: 26px;
      line-height: 26px;
      width: 100%;
      font-size: 14px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: 'Microsoft YaHei Regular';
      .menu-item {
        width: 100px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-block;
      }
      &:hover {
        .tree-menu-handle {
          display: block;
        }
      }
      .tree-menu-handle {
        display: none;
        float: right;
        transition: 0.3;
        span {
          margin: 0 5px;
        }
      }
      .tree-menu__wrap {
        float: right;
        transition: .3s;
        .el-dropdown-link {
          transform: rotate(90deg);
        }
      }
    }
  }
}
.two-part-body {
  display: flex;
  flex-direction: row!important;
  overflow: hidden;
  .left-part {
    width: 262px;
    overflow: hidden;
    background: #fff;
    margin-right: 20px;
    height: 100%;
    padding: 9px;
    padding-top: 0;
    position: relative;
    .left-title {
      font-size: 14px;
      color: #666;
      line-height: 28px;
      height: 54px;
      line-height: 54px;
      padding-left: 10px;
      font-family: 'Microsoft YaHei Regular';
      border-bottom: 1px solid #CCCCCC;
    }
  }
  .right-part {
    flex: 1;
    background: #fff;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    .right-title{
      height: 54px;
      font-family: 'Microsoft YaHei Regular';
      font-size: 14px;
      line-height: 54px;
      color: #666;
      padding-left: 24px;
      border-bottom: 1px solid #CCCCCC;
    }
    .right-body {
      flex: 1;
      padding: 0 20px;
      overflow: hidden;
      position: relative;
    }
  }
}
</style>
