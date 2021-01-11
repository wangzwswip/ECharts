<template>
  <div class="login-wrap" @keyup.enter="submitForm">

    <div class="login-enter">
      <!-- <img src="../assets/images/bg_logo.png" alt="" height="135" width="135"> -->
      <div class="title">{{ title }}</div>
    </div>
    <div class="login-form-body">
      <div class="login-info"></div>
      <el-form
        :model="login"
        status-icon
        ref="loginForm"
        label-width="60px"
        class="login-form">
        <el-form-item prop="username" label="账号">
          <el-input type="phone" v-model="login.username" placeholder="请输入用户名" clearable prefix-icon="el-icon-user"/>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="login.password" placeholder="请输入密码" clearable prefix-icon="el-icon-lock"/>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submit"
            type="primary"
            @click="submitForm">登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from 'blueimp-md5'
import { deepClone } from '@/assets/libs/util'
export default {
  data () {
    return {
      title: config.name,
      year: new Date().getFullYear(),
      login: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // this.checkLogin()
  },
  methods: {
    // 自动登录
    checkLogin () {
      const userInfo = localStorage.getItem('user_info')
      if (userInfo !== null) {
        this.$router.push({ name: 'index' })
      }
    },
    submitForm () {
      // this.$router.push({ name: 'index' })
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     this.getRandomSalt()
      //   }
      // })
    },
    getRandomSalt () {
      // this.loginServer()
      // this.$http.security.getRandomSalt(this.login.username)
      //   .then(res => {
      //     const pw = md5(this.login.password)
      //     const pwSalt = md5(res + pw)
      //     this.loginServer(pwSalt)
      //   })
      //   .catch(err => {
      //     this.$message.error(err.message || err.toString())
      //   })
    },
    loginServer () {
      this.$http.security.login({
        username: this.login.username,
        password: md5(this.login.password)
      })
        .then(res => {
          this.setUser(res)
          this.getPermisionId(res)
        })
    },
    setUser (_userInfo) {
      this.$store.dispatch('setUser', JSON.parse(_userInfo))
      localStorage.setItem('user_info', _userInfo)
      // this.$router.push({ name: 'index' })
    },
    getPermisionId (_userInfo) {
      const user = JSON.parse(_userInfo)
      const _nav = JSON.parse(window.localStorage.getItem('_nav'))
      if (_nav !== null || _nav !== undefined) {
        localStorage.removeItem('_nav')
      }
      const idList = []
      if (user.user.roleList) {
        user.user.roleList.map(item => {
          idList.push(item.id)
        })
      }
      this.$http.security.getPermisionList(idList).then(res => {
        const stringId = res.menuIdList
        this.modules.map(item => {
          if (item.id !== 'sjzx') {
            item.show = stringId.indexOf(item.id) > -1
            item.children.map(item1 => {
              item1.show = stringId.indexOf(item1.id) > -1
              if (item1.children) {
                item1.children.map(item2 => {
                  item2.show = stringId.indexOf(item2.id) > -1
                })
              }
            })
          } else {
            item.childrens.map(item1 => {
              item1.show = stringId.indexOf(item1.id) > -1
              item1.children.map(item2 => {
                item2.show = stringId.indexOf(item2.id) > -1
                if (item2.children) {
                  item2.children.map(item3 => {
                    item3.show = stringId.indexOf(item3.id) > -1
                  })
                }
              })
            })
          }
        })
        let moduleC = deepClone(this.modules)
        moduleC = moduleC.filter((item, index, arr) => {
          if (item.childrens) {
            arr[index].childrens = item.childrens.filter((item1, index1, arr1) => {
              arr1[index1].children = item1.children.filter((item2, index2, arr2) => {
                if (item2.children) {
                  arr2[index2].children = item2.children.filter((item3) => {
                    return item3.show === true
                  })
                }
                return item2.show === true
              })
              return item1.show === true
            })
            return item.childrens.length > 0
          } else {
            arr[index].children = item.children.filter((item1, index1, arr1) => {
              if (item1.children) {
                arr1[index1].children = item1.children.filter((item2, index2, arr2) => {
                  return item2.show === true
                })
              }
              return item1.show === true
            })
            return item.show === true
          }
        })
        // this.modules = deepClone(moduleC)
        window.localStorage.setItem('_nav', JSON.stringify(moduleC))
        this.$router.push({ name: 'index' })
      })
    }
  }
}
</script>

<style lang="scss">
  .login-wrap {
    position: relative;
    min-height: 450px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    // background-image: url('../assets/images/bg_01.png'), url('../../public/images/login/login_bg.png');
    // background-repeat: no-repeat, repeat;
    // background-size: 62% auto, auto auto;
    // background-position: 30% 50%, 0 0;
    .login-enter {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 9.8%;
      width: 810px;
      border-radius: 4px;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .title {
        width: 100%;
        text-align: center;
        margin-top: 29px;
        font-size: 48px;
        // margin-bottom: 1.2em;
        line-height: 58px;
        padding: 11px 0;
        font-weight: bold;
        color: #fff;
        font-family: 'Microsoft YaHei Bold';
        border-bottom: 1px solid #7EB18F;
      }

      .sub-title {
        font-size: 18px;
        margin-bottom: 1.2em;
        line-height: 30px;
        color: rgba($color: #000, $alpha: 0.4);
      }

    }

    .login-form-body {
      position: absolute;
      top: 40.8%;
      right: 17.6%;
      width: 485px;
      height: 303px;
      // background-color: rgba(168, 198, 192, 1);
      // border: 10px solid transparent;
      // border-image:url('../assets/images/bg_02.png') 10 10 round;
      .login-info {
        height: 50px;
        background-color: rgba(168, 198, 192, 1);
        // background-image: url('../assets/images/bg_03.png');
        // background-repeat: no-repeat;
        // background-position: 10px 0;
      }
      .el-form {
        height: calc(100% - 50px);
        width: 100%;
        padding: 20px 0;
        background-color: rgba(168, 198, 192, 1);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .el-form-item {
          margin-bottom: 10px;
          width: 100%;
          padding: 0 30px 0 15px;
        }

        .el-form-item__error {
          font-size: 16px;
        }

        .el-form-item:last-child {
          margin-bottom: 0;
        }

        input {
          padding-left: 50px;
        }

        .el-input__icon {
          width: 40px;
          font-size: 24px;
        }
      }
      .el-input-group__append {
        background: none;
        border: none;

        .el-button {
          color: #fff;
          border-radius: 0 4px 4px 0;

          &.locking:hover {
            background-color: #363b41;
            color: #606468;
            cursor: default;
          }
        }
      }
      .el-form-item__label {
        line-height: 40px;
      }
      input {
        background-color: #f0f0f0;
        color: #333;
        height: 40px;
        line-height: 40px;
        font-size: 1.3em;
        transition: .3s;
        border: none;
        background-color: rgba(246, 255, 233, 1.0)!important;

        &[type="password"]:valid {
          background-color: #f7f7f7;
        }

        &:hover, &:focus {
          background-color: #f7f7f7;
        }
      }

      .el-button {
        font-size: 1.5em;
        line-height: 40px;
        height: 40px;
        padding: 0 20px;
        transition: .3s;
      }

      .submit {
        color: #fff;
        border: none;
        font-weight: 700;
        width: 100%;
        transition: .3s;
      }
    }
    .foot-wrap {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      line-height: 40px;
      color: #fff;
      overflow: hidden;
      z-index: 1;
      div {
        margin-top: -10px;
        margin-bottom: 5px;
      }
    }

  }

  @keyframes floating {
    0% {
      transform: translateY(-20px);
    }
    50% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(-20px);
    }
  }
</style>
