<template>
  <div class="use-body">
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
    <div style="height: 200px">
      <swiper :options="swiperOption2" style="width: 500px; height: 100%">
          <swiper-slide class="ul-li2" v-for="(item,index) in pactMonitoringList" :key="index" :style="item.bgColor? 'background: #1e3c4a' : 'background: rgba(0,0,0,0.5)'">
            <p>{{item.name}}</p>
            <p>{{item.location}}</p>
            <p>{{item.debt}}</p>
            <p>{{item.receivable}}</p>
            <p>{{item.ratio}}</p>
          </swiper-slide>
        </swiper>
    </div>
    <div class="donghua">
      <div id="list-complete-demo" class="demo">
        <button v-on:click="shuffle">Shuffle</button>
        <button v-on:click="add">Add</button>
        <button v-on:click="remove">Remove</button>
        <transition-group name="list-complete" tag="p">
          <span
            v-for="item in items"
            v-bind:key="item"
            class="list-complete-item"
          >
            {{ item }}
          </span>
        </transition-group>
      </div>
    </div>
    <div class="guodu">
      <div id="staggered-list-demo">
        <input v-model="query">
        <transition-group
          name="staggered-fade"
          tag="ul"
          v-bind:css="false"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave"
        >
          <li
            v-for="(item, index) in computedList"
            v-bind:key="item.msg"
            v-bind:data-index="index"
          >{{ item.msg }}</li>
        </transition-group>
      </div>
    </div>
    <div class="slide-show">
      <SlideShow :urlList="slideList"></SlideShow>
    </div>
    <div>
      <el-button @click="showDialog = true">图片上传</el-button>
    </div>
    <el-dialog title="测试弹窗" :visible.sync="showDialog" width="50%" class="dialog-demo" @close="resetForm" :destroy-on-close="true" :modal-append-to-body='false'>
      <el-form ref="formDemo" :model="formDemo" :rules="rules" class="form-base">
        <div class="car-wrap">
          <div>
            <el-form-item label="" label-width="" prop="photoUrl" class="uploader-warp">
              <el-upload
                ref="upload"
                class="avatar-uploader"
                :action="action"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="beforeAvatarUpload"
                :on-success="onSuccess">
                <img id="imgbase64" v-if="formDemo.photoUrl" :src="formDemo.photoUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">
                  <p>请上传照片</p>
                  <p>图片文件支持.jpg、jpeg、png格式；</p>
                  <p>图片文件大小1 KB~200 KB。</p>
                </div>
              </el-upload>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="姓名" label-width="100px" prop="name">
              <el-input  size="small" maxlength="10" v-model="formDemo.name" clearable placeholder="请输入姓名" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" label-width="100px" prop="age">
              <el-input  size="small" maxlength="10" v-model="formDemo.age" clearable placeholder="请输入年龄" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" label-width="100px" prop="cardNumber">
              <el-input  size="small" maxlength="18" v-model="formDemo.cardNumber" clearable placeholder="请输入身份证号码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" label-width="100px" prop="phone">
              <el-input  size="small" v-model="formDemo.phone" clearable placeholder="请输入联系电话" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" label-width="100px" prop="remark">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" size="small" v-model="formDemo.remark"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm" size="small">取 消</el-button>
        <el-button type="primary"  size="small" @click="resetForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableView from '@mixins/tableView.js'
export default {
  name: 'uses',
  mixins: [tableView],
  data() {
    return {
      action: '',
      showDialog: false,
      loading: false,
      formDemo: {
        age: '',
        name: '',
        cardNumber: '',
        photoUrl: '',
        remark: '',
        phone: ''
      },
      items: [1,2,3,4,5,6,7,8,9],
      nextNum: 10,
      query: '',
      list: [
        { msg: 'Bruce Lee' },
        { msg: 'Jackie Chan' },
        { msg: 'Chuck Norris' },
        { msg: 'Jet Li' },
        { msg: 'Kung Fury' }
      ],
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
      ],
      pactMonitoringList: [
        {
          name: '深蓝新科软公司',
          location: '创新大厦2层',
          debt: 48,
          receivable: 32,
          ratio: 88,
          bgColor: true
        },
        {
          name: '新时创有限公司',
          location: '科技大厦8层',
          debt: 34,
          receivable: 29,
          ratio: '89%',
          bgColor: false
        },
        {
          name: '金同方有限公司',
          location: '创新大厦11层',
          debt: 25,
          receivable: 26,
          ratio: '90%',
          bgColor: true
        },
        {
          name: '志未来科技公司',
          location: '科技大厦7层',
          debt: 16,
          receivable: 24,
          ratio: '91%',
          bgColor: false
        },
        {
          name: '新视觉科技公司',
          location: '创新大厦12层',
          debt: 22,
          receivable: 21,
          ratio: '91%',
          bgColor: true
        },
        {
          name: '紫安讯有限公司',
          location: '科技大厦6层',
          debt: 18,
          receivable: 18,
          ratio: '92%',
          bgColor: false
        },
        {
          name: '深蓝新科软公司',
          location: '创新大厦2层',
          debt: 48,
          receivable: 32,
          ratio: 88,
          bgColor: true
        },
        {
          name: '新时创有限公司',
          location: '科技大厦8层',
          debt: 34,
          receivable: 29,
          ratio: '89%',
          bgColor: false
        },
        {
          name: '金同方有限公司',
          location: '创新大厦11层',
          debt: 25,
          receivable: 26,
          ratio: '90%',
          bgColor: true
        },
        {
          name: '志未来科技公司',
          location: '科技大厦7层',
          debt: 16,
          receivable: 24,
          ratio: '91%',
          bgColor: false
        },
        {
          name: '新视觉科技公司',
          location: '创新大厦12层',
          debt: 22,
          receivable: 21,
          ratio: '91%',
          bgColor: true
        },
        {
          name: '紫安讯有限公司',
          location: '科技大厦6层',
          debt: 18,
          receivable: 18,
          ratio: '92%',
          bgColor: false
        }
      ],
      swiperOption2: {
        slidesPerView: 6,
        spaceBetween: 1,
        direction: 'vertical',
        autoHeight: true,
        height: 200,
        // 自动轮播
        autoplay: {
          delay: 2000,
          // 当用户滑动图片后继续自动轮播
          disableOnInteraction: false
        },
        // 开启循环模式
        loop: true
      },
      slideList: [
        {
          type: 1,
          url: require('@assets/images/map_1.jpg')
        },
        {
          type: 1,
          url: require('@assets/images/map_2.jpg')
        },
        {
          type: 1,
          url: require('@assets/images/map_3.jpg')
        },
        {
          type: 0,
          url: require('@assets/video/demo.mp4'),
        },
        {
          type: 1,
          url: require('@assets/images/map_4.jpg')
        },
        {
          type: 1,
          url: require('@assets/images/map_5.jpg')
        }
      ],
      rules: {
          name: [
            {required: true,message: '请输入用户名',trigger: 'blur'},
	          {min: 2,max: 9,message: '长度在 2 到 9 个字符'},
            {pattern: /^[\u4E00-\u9FA5]+$/, message: '名字只能为中文'}
          ],
          photoUrl: [{ required: true, message: '请上传车辆图片', trigger: 'change'}],
          phone: [
            { required: true,message: '请输入手机号码',trigger: 'blur'},
            {validator:function(rule,value,callback){
              if(/^1[34578]\d{9}$/.test(value) == false){
                callback(new Error("请输入正确的手机号"));
              }else{
                callback();
              }
              }, trigger: 'blur'}
          ],
          cardNumber: [
            {required: true,message: '请输入身份证号码',trigger: 'blur'},
            {pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确' }
          ]
        }
    }
  },
  computed: {
    computedList: function () {
      var vm = this
      return this.list.filter(function (item) {
        return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
      })
    }
  },
  methods: {
    resetForm () {
      this.showDialog = false
      this.formDemo = {
        age: '',
        cardNumber: '',
        name: '',
        photoUrl: '',
        remark: '',
        phone: ''
      },
      this.$refs['formDemo'].resetFields()
    },
    beforeAvatarUpload (file) {
      const isJPG = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      const isLt2M = file.raw.size / 1024 < 200
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 200Kb!')
      }
      if (isJPG && isLt2M) {
        this.$refs.upload.submit()
      }
      return isJPG && isLt2M;
    },
    onSuccess(res) {
      this.formDemo.photoUrl = ''
    },
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
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
    shuffle: function () {
      this.items = _.shuffle(this.items)
    },
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: '1.6em' },
          { complete: done }
        )
      }, delay)
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }
  }
}
</script>

<style lang='scss' scoped>
  .use-body {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: #000;
    background: #fff;
    >div {
      // background: #fff;
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
    .ul-li2{
      list-style: none;
      width: 500px;
      height: 50px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      // margin-bottom: 0!important;
      p{
        // display: inline-block;
        // white-space: nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        font-size: 16px;
        color: #fff;
        text-align: center;
        border-bottom: 0!important;
      }
      >p:nth-of-type(1) {
        width: 130px;
      }
      >p:nth-of-type(2) {
        width: 130px;
      }
      >p:nth-of-type(3) {
        width: 80px;
        color: #03f2f9;
      }
      >p:nth-of-type(4) {
        width: 80px;
      }
      >p:nth-of-type(5) {
        width: 80px;
        color: #03f2f9;
      }
    }
    .donghua {
      height: 100px;
      padding: 20px 20px;
      .list-complete-item {
        transition: all 1s;
        display: inline-block;
        margin-right: 10px;
      }
      .list-complete-enter, .list-complete-leave-to
      /* .list-complete-leave-active for below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
      }
      .list-complete-leave-active {
        position: absolute;
      }
    }
    .guodu {
      padding: 30px;
    }
    .slide-show {
      height: 500px;
      width: 100%;
    }
    .dialog-demo{
      .el-dialog__body{
        padding: 15px!important;
      }
      .form-base .car-wrap{
        display: flex;
        justify-content: space-around;
        >div{
          display: inline-block;
          width: 40%;
          .uploader-warp .el-form-item__content{
            margin: 30px;
            margin-top: 100px;
            display: flex;
            justify-content: center;
          }
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .el-upload__tip{
            p{
              line-height: 18px;
              font-size: 12px;
            }
          }
          .avatar-uploader .el-upload:hover {
            border-color:#059d43;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
          .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }
        }
        >div:nth-of-type(2){
          width: 50%;
          .el-form-item {
            margin-bottom: 20px!important;
          }
        }
      }
    }
  }
</style>
