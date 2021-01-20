<template>
  <div class="two-part-body role-manage">
    <div class="left-part">
      <!-- <div class="left-title">角色管理</div> -->
      <div class="role-list">
        <Scrollbar style="height: 100%">
          <div
            v-for="(item, index) in roleList"
            :key="index"
            class="role-list-item"
            :class="[selectIndex === index ? 'active-tree-list' : '']"
            @click="searchTableById(item, index)"
          >
            <span>{{ item.name }}</span>
            <!-- <p class="handle">
              <span v-if="item.name !== '超级管理员'" @click.stop="addRole(item, index)" class="el-icon-circle-plus-outline"></span>
              <span v-if="item.name !== '超级管理员'" @click.stop="editRole(item, index)" class="el-icon-edit-outline"></span>
              <span v-if="item.name !== '超级管理员'" @click.stop="deleteRole(item)" class="el-icon-delete"></span>
            </p> -->
          </div>
        </Scrollbar>
      </div>
    </div>
    <div class="right-part">
      <!-- <div class="right-title">权限管理</div> -->
      <div class="right-body">
        <div class="role-menu">
          <div class="sorll">
            <div class="sorll-n">
              <el-tree
                :data="menuList"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                :expand-on-click-node="false"
                :check-on-click-node="true"
                :props="defaultProps">
              </el-tree>
            </div>
          </div>
          <div class="field-button">
            <el-button :disabled="disableButton" @click="saveMenu"><span class="iconfont iconbaocun"></span> 保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tableView from '@/mixins/tableView'
export default {
  name: 'Role',
  mixins: [tableView],
  data () {
    return {
      loading: false,
      disableButton: false,
      currentId: '',
      roleList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      menuList: [],
      menuListId: [],
      selectIndex: 0
    }
  },
  methods: {
    searchTableById (item, index) {
      this.disableButton = item.name === '超级管理员'
      this.currentId = item.id
      this.selectIndex = index
      console.log('选择的', item)
      this.getMenuList(item.id)
    },
    menuAllList () {
      this.$http.system.getPermissions().then(res => {
        this.menuList = res.children
      })
    },
    getRoleList () {
      this.$http.system.getRoleList().then(res => {
        this.roleList = res
        if (this.selectIndex > (this.roleList.length - 1)) {
          this.selectIndex = this.roleList.length - 1
        }
        this.currentId = res[this.selectIndex].id
        this.getMenuList(this.currentId)
      })
    },
    // 根据角色id查询菜单权限
    getMenuList (id) {
      this.$http.system.getPermissionsById(id).then(res => {
        this.menuListId = res.menuIdList
        this.$refs.tree.setCheckedKeys(this.menuListId)
      })
    },
    // 修改权限
    saveMenu () {
      const nodes = this.$refs.tree.getCheckedNodes(false, false)
      const rightsList = []
      nodes.map(item => {
        rightsList.push(item.id)
      })
      const params = {
        id: this.roleList[this.selectIndex].id,
        name: this.roleList[this.selectIndex].name,
        code: this.roleList[this.selectIndex].code,
        permissionIds: rightsList
      }
      this.$http.system.updatePermissions(params).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }
      })
    }
  },
  created () {
    // 获取角色列表
    this.getRoleList()
    // 菜单所有权限树
    this.menuAllList()
  },
  mounted () {

  }
}
</script>

<style lang='scss'>
  .role-manage {
    .role-list {
      flex: 1;
      padding: 10px 0;
      height: 100%;
      position: relative;

      .role-list-item {
        line-height: 36px;
        // margin: 0 25px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px 0 20px;
        cursor: pointer;
        transition: all .5s;

        &:hover {
          background: rgba(5, 157, 67, 0.1);
          color: #196E74;

          .handle {
            display: block;
          }
        }

        .handle {
          display: none;

          span {
            font-size: 12px;

            & + span {
              margin-left: 10px;
            }
          }
        }
      }

      .active-tree-list {
        background: rgba(5, 157, 67, 0.1);
        color: #196E74;
      }
    }

    .role-menu {
      margin: 20px 40px;
      display: inline-block;
      width: calc(100% - 40px);
      height: calc(100% - 100px);
      min-height: 400px;

      .sorll {
        width: 100%;
        height: calc(100% - 10px);
        overflow-x: hidden;
        overflow-y: auto;

        > .sorll-n {
          height: calc(100% - 20px);
          padding: 0px 20px;
          width: 105%;
          overflow-x: hidden;
          overflow-y: auto;
          position: relative;

          .el-tree {
            width: 90%;
          }

          .el-tree-node__expand-icon {
            display: none !important;
          }

          .el-tree-node:focus > .el-tree-node__content {
            background-color: transparent !important;
          }

          .el-tree-node:hover > .el-tree-node__content {
            background-color: transparent !important;
          }

          .el-tree-node__content:hover {
            color: #196E74 !important;
            background: rgba(5, 157, 67, 0.2) !important;

            .el-checkbox__inner {
              border-color: #196E74 !important;
            }
          }

          .el-tree > .el-tree-node {
            > .el-tree-node__content {
              line-height: 50px;
              height: 50px;
              position: relative;
              margin-bottom: 20px;
              margin-left: 10px;

              span {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(25, 35, 60, 1);
              }

              &:before {
                background: rgba(237, 238, 240, 1);
                content: "";
                position: absolute;
                bottom: -15px;
                width: 100%;
                height: 1px;
              }

              &:after {
                content: "";
                position: absolute;
                top: 20px;
                left: -10px;
                width: 3px;
                height: 12px;
                background: #196E74;
                border-radius: 1px;
              }
            }

            > .el-tree-node__children {
              .el-tree-node__content {
                min-width: 150px;
                float: left;
                line-height: 48px;
                height: 48px;
              }

              > .el-tree-node__children {
                .el-tree-node__content {
                  min-width: 200px;
                  // float: left;
                  line-height: 48px;
                  height: 48px;
                }
              }
            }
          }

          .is-checked > .el-checkbox__inner {
            background-color: #196E74 !important;
            border-color: #196E74 !important;
          }

          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: #196E74 !important;
            border-color: #196E74 !important;
          }
        }
      }

      .field-button {
        height: 80px;
        line-height: 80px;
        text-align: center;

        .el-button {
          padding: 8px 20px;
          border: 0;

          &:hover {
            color: transparent;
            background-color: transparent;
          }

          &:first-child {
            background-color: #196E74;
            color: #fff;
          }

          span {
            font-size: 12px;
          }
        }
      }
    }
  }

  .two-part-body {
    display: flex;
    flex-direction: row !important;
    overflow: hidden;

    .left-part {
      width: 262px;
      overflow: hidden;
      background: #fff;
      margin-right: 20px;
      height: 100%;
      position: relative;
      padding: 9px;
      padding-top: 0;
      display: flex;
      flex-direction: column !important;

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

      .right-title {
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
