import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Echarts from 'echarts'
import Scrollbar from '@assets/libs/scrollbar'
import './services'
import './middleware/filters'
import './middleware/directives'
import './components/common'
// import './filters'
import * as Socket from './socket'
import WSSTYPE from './WSSTYPE'
// import ElTreeSelect from 'el-tree-select'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import './assets/scss/element-variables.scss'
import './assets/scss/common.scss'

window.$Socket = Socket
window.$WSSTYPE = WSSTYPE
Vue.use(Echarts)
Vue.prototype.$echarts = Echarts
Vue.use(ElementUI, {
  locale
})
Vue.component('Scrollbar', Scrollbar)
Vue.config.productionTip = false

// Socket.createSocket()

// this.$Socket.sendWSPush(this.$WSSTYPE.SHOUYE_CODE)
// 监听ws数据响应
// window.addEventListener('onmessageWS', (e) => {
//   console.log(window.detail)
// })
// window.addEventListener('onerrorWS', (e) => {
//   console.log(window.detail)
// })
Vue.prototype.image2Base64 = function (img) {
  var canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  var dataURL = canvas.toDataURL('image/png')
  return dataURL
}

Vue.prototype.ToBase64 = function (file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }
  })
}

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
