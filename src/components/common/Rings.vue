/**
* 4/3嵌套圆环
*/
<template>
  <div class="pie-wrap" :id="dataObj.id"></div>
</template>
<style lang="scss">
  .pie-wrap{
    width: 100%;
    height: 100%;
  }
</style>
<script>
export default {
  name: 'Rings',
  props: {
    dataObj: {
      type: Object,
      required: true // 必须id data ；data有{name：‘’，value：1}组成的数组, data数组unit可选（单位）
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
    }
  },
  methods: {
    init () {
      if (this.dataObj.data.length === 0) {
        return
      }
      let data = this.dataObj.data
      // let legend = this.dataObj.legend ? this.dataObj.legend : ''
      let unit = this.dataObj.unit ? this.dataObj.unit : ''
      let names = []
      data.map(item => {
        names.push(item.name)
      })
      let pieSeries = []
      let sum = 0
      let lineYAxis = []
      let arrName = []
      let arrValue = []
      let color = ['#0c90ce', '#12ce7d', '#b8991e']
      data.forEach((v, i) => {
        arrName.push(v.name)
        arrValue.push(v.value)
        sum = sum + v.value
      })
      data.forEach((v, i) => {
        pieSeries.push({
          name: '',
          type: 'pie',
          clockWise: false, // 饼图的扇区是否是顺时针排布。
          hoverAnimation: false, // 是否开启 hover 在扇区上的放大动画效果
          radius: [75 - i * 15 + '%', 70 - i * 15 + '%'], // 内外半径
          center: ['50%', '50%'],
          label: {
            show: false
          },
          data: [{
            value: v.value,
            name: v.name
          }, {
            value: sum - v.value,
            name: '',
            tooltip: {
              show: false
            },
            itemStyle: {
              color: 'rgba(0,0,0,0)'
            }
          }]
        })
        // 下面这个是为了创建不同的背景，例如3/4
        pieSeries.push({
          name: '',
          type: 'pie',
          silent: true, // 图形是否不响应和触发鼠标事件，默认为 false，
          z: 1,
          clockWise: false,
          hoverAnimation: false,
          radius: [75 - i * 15 + '%', 70 - i * 15 + '%'],
          center: ['50%', '50%'],
          label: {
            show: false
          },
          data: [{
            value: 10,
            itemStyle: {
              color: 'rgba(0,0,0,0.2)'
            }
          }]
        })
        v.percent = (v.value / sum * 100).toFixed(1) + '%'
        lineYAxis.push({
          value: i,
          textStyle: {
            rich: {
              circle: {
                color: color[i],
                padding: [0, 5]
              }
            }
          }
        })
      })
      let myChart = this.$echarts.init(document.getElementById(this.dataObj.id))
      let option = {
        // backgroundColor: '#fff', // 背景色
        color: color,
        grid: {
          top: 10,
          left: 5,
          containLabel: false
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: '{b}:{c}' + unit + '({d}%)'
        },
        yAxis: [{
          type: 'category',
          inverse: true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          data: lineYAxis
        }],
        xAxis: [{
          show: false
        }],
        legend: {
          show: true,
          icon: 'circle',
          // top: 'center',
          bottom: 2,
          left: '20%',
          itemWidth: 24,
          itemHeight: 14,
          data: data,
          itemGap: 15,
          orient: 'horizontal',
          formatter: function (value) {
            return '{value|' + value + '}'
          },
          textStyle: {
            rich: {
              value: {
                fontSize: 16,
                // lineHeight: 20,
                color: '#000',
                fontFamily: 'MicrosoftYaHei'
              }
            }
          }
        },
        series: pieSeries
      }
      myChart.setOption(option, true)
      myChart.resize()
    }
  },
  components: {}
}
</script>
