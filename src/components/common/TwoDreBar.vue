/**
* 正负双向柱状图
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
  name: 'TwoDreBar',
  props: {
    dataObj: {
      type: Object,
      required: true // 必须id data ；data { name: '', value: 3}
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.init()
  },
  watch: {
    dataObj () {
      this.init()
    },
    deep: true
  },
  methods: {
    init () {
      if (this.dataObj.data.length === 0) {
        return
      }
      let data = this.dataObj.data
      let names = []
      data.map(item => {
        names.unshift(item.name)
      })
      let dataP = []
      let dataN = []
      data.map(item => {
        if (item.value >= 0) {
          dataP.unshift(item)
          dataN.unshift(0)
        } else {
          dataN.unshift(item)
          dataP.unshift(0)
        }
      })
      let myChart = this.$echarts.init(document.getElementById(this.dataObj.id))
      let option = {
        color: ['#24bef9', '#f7b822'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter (params) {
            if (params[0].value !== 0) {
              return params[0].name + params[0].value
            } else {
              return params[1].name + params[1].value
            }
          }
        },
        legend: {
          show: false
        },
        grid: {
          top: 20,
          left: 20,
          // right: '4%',
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          position: 'top',
          splitLine: { show: false },
          axisLine: {
            show: true, // 隐藏x轴线
            lineStyle: {
              color: 'rbga(0,0,0,1)'
            }
          },
          textStyle: {
            color: 'rbga(0,0,0,1)'
          },
          axisTick: {
            show: true // 隐藏刻度
          },
          show: true
        },
        yAxis: {
          type: 'category',
          gridIndex: 0,
          position: 'left',
          nameTextStyle: { color: 'red', fontSize: 16 },
          axisLine: {
            show: true, // 隐藏x轴线
            lineStyle: {
              color: 'rbga(0,0,0,1)'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#000',
              fontSize: '14'
            },
            formatter: function (value) {
              return (value.length > 5 ? (value.slice(0, 3) + '...') : value)
            }
          },
          textStyle: {
            color: 'rbga(0,0,0,1)'
          },
          axisTick: {
            show: false // 隐藏刻度
          },
          data: names
        },
        series: [
          {
            name: '',
            type: 'bar',
            stack: '总量', // 数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置
            itemStyle: {
              normal: {
                barBorderRadius: [0, 20, 20, 0]
              }
            },
            label: {
              show: true,
              color: '#000',
              position: 'insideRight',
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value
                } else {
                  return ''
                }
              }
            },
            data: dataP
          },
          {
            name: '',
            type: 'bar',
            stack: '总量', // 数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置
            barWidth: 24, // 最后一个设置，可全局通用
            itemStyle: {
              normal: {
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //     offset: 0,
                //     color: 'rgba(0,244,255,1)' // 0% 处的颜色
                // }, {
                //     offset: 1,
                //     color: 'rgba(0,77,167,1)' // 100% 处的颜色
                // }], false),
                barBorderRadius: [20, 0, 0, 20]
              }
            },
            label: {
              show: true,
              color: '#000',
              position: 'insideLeft',
              formatter: function (params) {
                if (params.value < 0) {
                  return -params.value
                } else {
                  return ''
                }
              }
            },
            data: dataN
          }
        ]
      }
      myChart.setOption(option)
      myChart.resize()
    }
  },
  components: {}
}
</script>
