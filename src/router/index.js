import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const files = require.context('./moudles', true, /\.js$/)

const routeChildren = []

files.keys().map(file => {
  const fileConfig = files(file)
  const _file = fileConfig.default || fileConfig

  _file.map(f => {
    routeChildren.push({
      ...f,
      meta: {
        requireAuth: true
      }
    })
  })
})


const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('../views/Login')
  // },
  {
    path: '/index',
    name: 'index',
    meta: {
      requireAuth: false
    },
    component: () => import('../views/Home.vue'),
    children: routeChildren
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (window.__axiosCancelTokenArr) {
    window.__axiosCancelTokenArr.forEach((ele) => {
      ele.cancel('取消请求')
    })
    window.__axiosCancelTokenArr = []
  }

  if (to.meta.requireAuth) {
    const userInfo = JSON.parse(localStorage.getItem('x_crms_admin_user_info'))
    if (userInfo) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
