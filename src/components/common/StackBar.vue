/**
* 水平方向堆叠柱状图 堆叠
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
  name: 'StackBar',
  props: {
    dataObj: {
      type: Object,
      required: true // 必须id yAxisData datapre databac legendName；
      // datapre databac 数值数组 []，yAxisData 名称数组 legendName；
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
      if (this.dataObj.datapre.length === 0) {
        return
      }
      let datapre = this.dataObj.datapre
      let databac = this.dataObj.databac
      let legendName = this.dataObj.legendName
      let names = []
      datapre.map(item => {
        names.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById(this.dataObj.id))
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: legendName,
          right: 6,
          top: 10,
          icon: 'circle',
          textStyle: {
            color: '#000',
            fontSize: 14,
            fontFamily: 'MicrosoftYaHei-Bold'
          },
          itemGap: 20,
          itemWidth: 14,
          itemHeight: 14
        },
        grid: {
          left: 10,
          top: 20,
          bottom: 10,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          inverse: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#000'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          data: names
        },
        series: [
          {
            name: legendName[0],
            type: 'bar',
            stack: '1',
            label: {
              show: true,
              color: '#000',
              position: 'inside',
              formatter: function (params) {
                if (params.value === 0) {
                  return ''
                } else {
                  return params.value
                }
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: [30, 0, 0, 30],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: 'rgb(255,101,70,1)'
                }, {
                  offset: 1,
                  color: 'rgb(255,158,83,1)'
                }])
              }
            },
            barWidth: 12,
            data: datapre
          },
          {
            name: legendName[1],
            type: 'bar',
            barGap: '-100%',
            stack: '1',
            z: -20,
            barWidth: 12, // 最后一个设置，可全局通用
            label: {
              show: true,
              color: '#000',
              position: 'right',
              formatter: function (params) {
                if (params.value === 0) {
                  return ''
                } else {
                  return params.value
                }
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: [0, 30, 30, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: 'rgb(27,157,232,1)'
                }, {
                  offset: 1,
                  color: 'rgb(54,217,227,1)'
                }])
              }
            },
            data: databac
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
