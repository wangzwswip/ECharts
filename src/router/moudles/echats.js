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
  },
  {
    path: '/use',
    name: 'use',
    component: () => import('../../views/use.vue')
  },
  {
    path: '/plugin',
    name: 'plugin',
    component: () => import('../../views/plugin.vue')
  }
]
