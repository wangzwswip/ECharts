/**
* 仪表盘
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
  name: 'Dail',
  props: {
    dataObj: {
      type: Object,
      required: true // 必须id data max；data 数值number，max 最大值max
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
      let max = this.dataObj.max
      let per = Number(((data / max)).toFixed(2)).toLocaleString()
      var myChart = this.$echarts.init(document.getElementById(this.dataObj.id))
      let option = {
        backgroundColor: 'transparent',
        series: [
          {
            name: '刻度',
            type: 'gauge',
            radius: '80%',
            min: 0, // 最小刻度
            max: 16, // 最大刻度
            splitNumber: 6, // 刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: [[1, 'rgba(0,0,0,1)']]
              }
            }, // 仪表盘轴线
            axisLabel: {
              show: false,
              color: '#000',
              distance: 25,
              formatter: function (v) {
                switch (v + '') {
                  case '0' : return '0'
                  case '2' : return '2W'
                  case '4' : return '4W'
                  case '6' : return '6W'
                  case '8' : return '8W'
                  case '10' : return '10W'
                  case '12' : return '12W'
                  case '14' : return '14W'
                  case '16' : return '16W'
                }
              }
            }, // 刻度标签。
            axisTick: {
              show: true,
              splitNumber: 9,
              lineStyle: {
                color: '#09c2ff',
                width: 1
              },
              length: -8
            }, // 刻度样式
            splitLine: {
              show: true,
              length: -20,
              lineStyle: {
                color: '#09c2ff'
              }
            }, // 分隔线样式
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          {
            type: 'gauge',
            radius: '75%',
            center: ['50%', '50%'],
            splitNumber: 0, // 刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              lineStyle: {
                width: 3,
                color: [
                  [ 1, new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [ { offset: 0, color: '#5c53de' }, { offset: 1, color: '#18c8ff' } ]) ],
                  [ 1, '#413e54' ]
                ]
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            title: {
              show: true,
              offsetCenter: [0, '80%'], // x, y，单位px
              textStyle: {
                color: '#fff',
                fontSize: 18
              }
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, '0%'],
              color: '#000',
              formatter: function (params) {
                return (params * 100).toFixed(0) + '%'
              },
              textStyle: {
                fontSize: 44
              }
            },
            data: [{
              name: '排放标准限额',
              value: per
            }]
          },
          {
            type: 'gauge',
            radius: '65%',
            center: ['50%', '50%'],
            splitNumber: 0, // 刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              symbol: 'circle',
              lineStyle: {
                width: 10,
                color: [
                  [ per, new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [ { offset: 0, color: '#5c53de' }, { offset: 1, color: '#18c8ff' } ]) ],
                  [ 1, '#413e54' ]
                ]
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{
              name: '',
              value: 100
            }]
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
