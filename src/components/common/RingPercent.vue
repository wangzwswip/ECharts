/**
* 百分比环形图
*/
<template>
  <div class="pie-wrap" :id='dataObj.id'></div>
</template>
<style lang="scss">
  .pie-wrap{
    width: 100%;
    height: 100%;
  }
</style>
<script>
export default {
  name: 'RingPercent',
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
    const that = this
    window.onresize = () => {
      const myChart = that.$echarts.init(document.getElementById(this.dataObj.id))
      myChart.resize()
    }
  },
  destroyed () {
    window.onresize = null
  },
  watch: {
    dataObj () {
      this.init()
    },
    deep: true
  },
  methods: {
    init () {
      let value = this.dataObj.value
      const myChart = this.$echarts.init(document.getElementById(this.dataObj.id))
      const seriesOption = [{
        type: 'bar',
        data: [{
          name: 'Total Downloads',
          value: value,
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: 'rgba(6, 176, 253,1)'
            }, {
              offset: 1,
              color: 'rgba(57, 248, 231,1)'
            }])
          }
        }],
        coordinateSystem: 'polar',
        roundCap: true, // 是否在环形柱条两侧使用圆弧效果
        barWidth: 8,
        barGap: '100%',
        showBackground: false,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
        z: 1
      }, {
        type: 'bar',
        data: [{
          value: 100,
          itemStyle: {
            color: 'rgba(121, 52, 243, 0.1)',
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 5,
            shadowOffsetY: 2
          }
        }],
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 4,
        barGap: '100%',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
        z: 1
      }, {
        type: 'pie',
        radius: ['57%', '48%'],
        hoverAnimation: false,
        startAngle: 90,
        data: [{
          name: '',
          value: 100 - value,
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          itemStyle: {
            color: 'rgba(0,0,0,0)'
          }
        },
        { //画中间的图标
          name: '',
          value: 0,
          label: {
            position: 'inside',
            backgroundColor: 'rgba(57, 248, 232, 1)',
            borderRadius: 9,
            padding: 9,
            borderWidth: 0,
            borderColor: 'rgba(57, 248, 232, 1)'
          }
        }, {
          name: '',
          value: value,
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          itemStyle: {
            color: 'rgba(0,0,0,0)'
          }
        }]
      }]
      const option = {
        // backgroundColor:'#fff',
        title: {
          text: value + '%',
          textStyle: {
            color: 'rgba(57, 248, 232, 1)',
            fontSize: 24,
            fontWeight: '700',
            fontFamily: 'Arial Bold Italic'
          },
          subtext: '在线率',
          subtextStyle: {
            color: 'rgba(57, 248, 232, 1)',
            fontSize: 14,
            fontWeight: '100'
          },
          itemGap: 5,
          left: 'center',
          top: '40%'
        },
        angleAxis: {
          max: 100,
          clockwise: false,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          center: ['50%', '50%'],
          radius: '120%'
        },
        series: seriesOption
      }
      myChart.setOption(option, true)
      myChart.resize()
    }
  },
  components: {}
}
</script>
