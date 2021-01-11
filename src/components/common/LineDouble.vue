/**
* 阴影的折线图
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
  name: 'LineDouble',
  props: {
    dataObj: {
      type: Object,
      required: true // 必须id data ；data有{name：‘’，value：1}组成的数组
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
      let data = this.dataObj.data
      let data1 = this.dataObj.data1
      let names = []
      let isSmooth = false
      let areaStyleOne = {
        color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
          offset: 0,
          color: 'rgba(77, 201, 74,0.3)'
        }, {
          offset: 1,
          color: 'rgba(77, 201, 74,0.8)'
        }])
      }
      let areaStyleTwo = {
        color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
          offset: 0,
          color: 'rgba(211, 160, 32,0.3)'
        }, {
          offset: 1,
          color: 'rgba(211, 160, 32,0.8)'
        }])
      }
      let labelDataOne = '数据1'
      let labelDataTwo = '数据2'
      data.map(item => {
        names.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById(this.dataObj.id))
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: 10,
          top: 40,
          bottom: 10,
          containLabel: true
        },
        legend: {
          data: [labelDataOne, labelDataTwo],
          top: 10,
          right: 40,
          textStyle: {
            color: '#000',
            opacity: 1
          },
          itemGap: 12,
          itemWidth: 18,
          itemHeight: 10
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, // 坐标轴两边留白
          data: names,
          axisLabel: { // 坐标轴刻度标签的相关设置。
            interval: 1, // 设置为 1，表示『隔一个标签显示一个标签』
            margin: 8,
            textStyle: {
              color: '#000',
              opacity: 0.7,
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            }
          },
          axisTick: {// 坐标轴刻度相关设置。
            show: false
          },
          axisLine: {// 坐标轴轴线相关设置
            show: true,
            lineStyle: {
              color: '#2b6b6c',
              opacity: 0.8
            }
          },
          splitLine: {
            show: false,
            interval: 5,
            lineStyle: {
              color: '#000',
              opacity: 0.2
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            name: '次数',
            nameTextStyle: {
              color: "#000",
              fontSize: 12,
              lineHeight: 20
            },
            axisLabel: {
              textStyle: {
                color: '#000',
                opacity: 0.7,
                fontStyle: 'normal',
                fontSize: 12
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#2b6b6c',
                opacity: 0.8
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#2b6b6c',
                opacity: 0.8,
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: labelDataOne,
            type: 'line',
            smooth: isSmooth,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#51eb4e',
                lineStyle: {
                  width: 3,
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#51eb4e'
                  },
                  {
                    offset: 1,
                    color: '#51eb4e'
                  }])
                },
                areaStyle: areaStyleOne
              }
            },
            data: data
          },
          {
            name: labelDataTwo,
            type: 'line',
            smooth: isSmooth,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#d3a020',
                lineStyle: {
                  width: 3,
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#d3a020'
                  },
                  {
                    offset: 1,
                    color: '#d3a020'
                  }])
                },
                areaStyle: areaStyleTwo
              }
            },
            data: data1
          }
        ]
      }
      myChart.setOption(option, true)
      myChart.resize()
    }
  },
  components: {}
}
</script>
