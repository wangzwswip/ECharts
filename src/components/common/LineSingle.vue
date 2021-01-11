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
  name: 'LineSingle',
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
      let names = []
      data.map(item => {
        names.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById(this.dataObj.id))
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: 20,
          top: 40,
          bottom: 20,
          containLabel: true
        },
        legend: {
          show: true,
          data: ['故障数'],
          top: 10,
          right: 40,
          textStyle: {
            color: '#000'
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
            interval: 3, // 设置为 1，表示『隔一个标签显示一个标签』
            margin: 8,
            formatter: '{value}小时',
            textStyle: {
              color: '#000',
              fontStyle: 'normal',
              fontSize: 13,
              fontFamily: 'Arial Regular'
            }
          },
          axisTick: {// 坐标轴刻度相关设置。
            show: false
          },
          axisLine: {// 坐标轴轴线相关设置
            show: true,
            lineStyle: {
              color: '#71767f',
              opacity: 1
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#343b48',
              opacity: 1,
              type: 'solid'
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '次数',
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: '#000',
                fontStyle: 'normal',
                fontSize: 13,
                fontFamily: 'Arial Regular'
              }
            },
            nameTextStyle: {
                color: "#000",
                fontSize: 12,
                lineHeight: 20
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#71767f',
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#343b48',
                opacity: 1,
                type: 'solid'
              }
            }
          }
        ],
        series: [
          {
            name: '故障数',
            type: 'line',
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#229890',
                lineStyle: {
                  width: 3,
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#0193db'
                  },
                  {
                    offset: 1,
                    color: '#229890'
                  }])
                },
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: 'rgba(13, 152, 205,0)'
                  }, {
                    offset: 0.2,
                    color: 'rgba(13, 152, 205,0.1)'
                  }, {
                    offset: 1,
                    color: 'rgba(13, 152, 205,1)'
                  }])
                }
              }
            },
            data: data
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
