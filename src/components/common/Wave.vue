<template>
  <div class="wave-wrap" :id='dataObj.id'></div>
</template>
<style lang="scss">
  .wave-wrap{
    width: 100%;
    height: 100%;
  }
</style>
<script>
export default {
  name: 'Wave',
  props: {
    dataObj: {
      type: Object,
      required: true // 必须id value；value 占比
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.init()
  },
  watch: {
    waveData () {
      this.init()
    },
    deep: true
  },
  methods: {
    init () {
      var myChart = this.$echarts.init(document.getElementById(this.dataObj.id))
      var value = this.dataObj.value
      var data = [value, value, value]
      let option = {
        title: {
          text: (value * 100).toFixed(0) + '{a|%}',
          textStyle: {
            fontSize: 24,
            fontFamily: 'Arial Bold Italic',
            fontWeight: 'bold',
            color: '#fff',
            rich: {
              a: {
                fontSize: 24
              }
            }
          },
          x: 'center',
          y: '30%'
        },
        graphic: [{
          type: 'group',
          left: 'center',
          top: '60%',
          children: [{
            type: 'text',
            z: 100,
            left: '10',
            top: 'middle',
            style: {
              fill: '#fff',
              text: '覆盖度',
              font: '14px Adobe Heiti Std R'
            }
          }]
        }],
        series: [{
          type: 'liquidFill',
          radius: '100%',
          center: ['50%', '50%'],
          waveAnimation: 10, // 动画时长
          amplitude: 5, // 振幅
          // shape: 'roundRect',
          data: data,
          backgroundStyle: {
            // color: 'rgb(63,56,51)'
            color: 'transparent'
          },
          outline: {
            borderDistance: 4,
            itemStyle: {
              borderWidth: 2,
              borderColor: '#4d535a'
            }
          },
          itemStyle: { // 渐变色设置
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#072e3c'
              }, {
                offset: 0.1,
                color: '#34f2e9'
              },
              {
                offset: 1,
                color: '#05b0fd'
              }])
            }
          },
          // color: '#9c6338',
          label: {
            normal: {
              formatter: ''
            }
          }
        }]
      }
      myChart.setOption(option, true)
      myChart.resize()
    }
  },
  components: {}
}
</script>
