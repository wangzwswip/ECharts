export default [
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('../../views/echarts.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../../views/test.vue')
  }
]
