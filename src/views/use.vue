<template>
  <div class="use">
    <div><p class="title">测试数据</p></div>
    <div class="bottom-nav">
      <i :class="select === 1 ? 'el-icon-circle-plus-outline selected' : 'el-icon-circle-plus-outline'" @click="selectNav(1)"></i>
      <i :class="select === 2 ? 'el-icon-remove-outline selected' : 'el-icon-remove-outline'" @click="selectNav(2)"></i>
    </div>
    <div class="icon-show">
      <i class="el-icon-printer"></i>
      <i class="el-icon-monitor"></i>
      <div class="down-line"><span>测试数据</span></div>
      <div style="height: 100px; width: 500px">
          <Scrollbar style="height: 100%">
            <ul class="zh-tongji">
              <li v-for="(item, index) in zhList" :key="index">
                <span>{{index + 1}}</span>
                <span>{{item.title}}</span>
                <span>{{item.count}}条</span>
              </li>
            </ul>
          </Scrollbar>
        </div>
    </div>
  </div>
</template>

<script>
import tableView from '@mixins/tableView.js'
export default {
  name: 'use',
  mixins: [tableView],
  data() {
    return {
      loading: false,
      tableList: [],
      select: 1,
      zhList: [
        {
          title: '数据1',
          count: 23
        },
        {
          title: '数据2',
          count: 13
        },
        {
          title: '数据3',
          count: 26
        },
        {
          title: '数据4',
          count: 44
        }
      ]
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
    },
    selectNav (index) {
      if (index !== this.select) {
        this.select = index
      }
    },
  }
}
</script>

<style lang='scss' scoped>
  .use {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: #000;
    >div {
      background: #fff;
      width: 100%;
    }
    .title {
      margin: 10px 0;
      height: 20px;
      line-height: 20px;
      padding-left: 20px;
      width: 300px;
      background: url(../assets/images/title.png) no-repeat;
    }
    .bottom-nav {
      height: 60px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      pointer-events: auto;
      i {
        margin-right: 30px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        display: inline-block;
        font-size: 28px;
        color: #000;
        opacity: 0.7;
        background: url(../assets/images/button_2.png) no-repeat;
        transition: all 0.3s;
        &:hover {
          border-radius: 0;
          width: 60px;
          height: 60px;
          opacity: 1;
          line-height: 60px;
          color: #03a6f5;
          background: url(../assets/images/button.png) no-repeat;
        }
      }
    }
    .bottom-nav .selected {
      width: 60px;
      height: 60px;
      opacity: 1;
      line-height: 60px;
      color: #03a6f5;
      background: url(../assets/images/button.png) no-repeat;
    }
    .icon-show {
      padding: 30px 10px;
      i {
        width: 30px;
        height: 30px;
        display: inline-block;
        margin-right: 30px;
        font-size: 30px;
        background-image:linear-gradient(to right, #00A8FF 0%, #3BFBE7 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .down-line {
        margin: 10px 0;
        height: 40px;
        width: 500px;
        border-bottom: 3px solid #f2f2f2;
        border-image: linear-gradient(to right,#19a3a4 10%, #f2f2f2 10%, #f2f2f2 100%) 3;
      }
      .zh-tongji {
        padding: 5px 0;
        li {
          height: 40px;
          padding: 8px 10px;
          span {
            display: inline-block;
            line-height: 24px;
            font-size: 18px;
          }
          span:nth-of-type(1) {
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #009999;
            color: #fff;
            text-align: center;
            margin-right: 17px;
          }
          span:nth-of-type(2) {
            color: #333333;
          }
          span:nth-of-type(3) {
            float: right;
          }
        }
      }
    }
  }
</style>
