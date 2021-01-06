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
      // let unit = this.dataObj.unit ? this.dataObj.unit : ''
      let names = []
      data.map(item => {
        names.push(item.name)
      })
      let chartData = this.dataObj.data
      let pieSeries = []
      let sum = 0
      let lineYAxis = []
      let arrName = []
      let arrValue = []
      let color = ['#0c90ce', '#12ce7d', '#b8991e']
      chartData.forEach((v, i) => {
        arrName.push(v.name)
        arrValue.push(v.value)
        sum = sum + v.value
      })
      chartData.forEach((v, i) => {
        pieSeries.push({
          name: '',
          type: 'pie',
          clockWise: false,
          hoverAnimation: false,
          radius: [75 - i * 15 + '%', 70 - i * 15 + '%'],
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
            itemStyle: {
              color: 'rgba(0,0,0,0)'
            }
          }]
        })
        pieSeries.push({
          name: '',
          type: 'pie',
          silent: true,
          z: 1,
          clockWise: false, // 顺时加载
          hoverAnimation: false, // 鼠标移入变大
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
        // backgroundColor: '#fff',
        color: color,
        grid: {
          top: 10,
          left: 5,
          containLabel: false
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: '{a}<br>{b}:{c}({d}%)'
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
          show: false,
          icon: 'circle',
          // top: 'center',
          top: 10,
          right: 10,
          itemWidth: 14,
          itemHeight: 14,
          data: chartData,
          // width: 5,
          // padding: [0, 16],
          itemGap: 15,
          orient: 'vertical',
          formatter: function (value) {
            // eslint-disable-next-line no-undef
            return '{value|' + value + '}'
          },
          textStyle: {
            rich: {
              value: {
                fontSize: 16,
                // lineHeight: 20,
                color: '#fff',
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
