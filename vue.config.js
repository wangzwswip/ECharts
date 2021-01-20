// vue.config.js
const { resolve } = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  publicPath: './',

  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/common.scss";'
      }
    }
  },

  configureWebpack: config => {
    config.plugins = [...config.plugins, ...[new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: productionGzipExtensions,
      threshold: 10240,
      minRatio: 0.8
    })]]
  },

  chainWebpack: config => {

    // 启用 cdn
    //
    // var externals = {
    //   vue: 'Vue',
    //   axios: 'axios',
    //   'element-ui': 'ELEMENT',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex',
    //   // 'dayjs': 'dayjs',
    //   // 'md5': 'md5',
    //   echarts: 'echarts'
    // }
    // config.externals(externals)

    const cdn = {
      css: [
        // element-ui css
        // 'https://cdn.bootcss.com/element-ui/2.11.1/theme-chalk/index.css'
      ],
      js: [
        'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js'
        // vue
        // '//cdn.staticfile.org/vue/2.6.10/vue.min.js',
      //     // vue-router
      //     '//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
      //     // vuex
      //     '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
      //     // axios
      //     '//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
      //     // element-ui js
      //     'https://cdn.bootcss.com/element-ui/2.11.1/index.js',
      //     // dayjs
      //     '//cdn.staticfile.org/dayjs/1.8.10/dayjs.min.js',
      //     // md5
      //     'https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js',
      //     // jq
      //     'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js',
      //     // echarts
      //     'https://cdn.bootcss.com/echarts/4.2.1-rc1/echarts.min.js',
      //     // core.min
      //     'https://cdn.bootcss.com/core-js/2.6.5/core.min.js',
      ]
    }

    config.plugin('html')
      .tap(args => {
        args[0].cdn = cdn
        return args
      })
    //
    // 设置别名
    //
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@mixins', resolve('src/mixins'))
  },

  devServer: {
    disableHostCheck: true,
    overlay: {
      warnings: process.env.NODE_ENV !== 'production',
      errors: process.env.NODE_ENV !== 'production'
    }
  },

  outputDir: 'echats-demo'
}
