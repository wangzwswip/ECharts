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
    path: '/uses',
    name: 'uses',
    component: () => import('../../views/uses.vue')
  },
  {
    path: '/plugin',
    name: 'plugin',
    component: () => import('../../views/plugin.vue')
  },
  {
    path: '/map-show',
    name: 'mapshow',
    component: () => import('../../views/MapShow.vue')
  }
]
