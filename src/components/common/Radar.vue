/**
* 雷达图
*/
<template>
  <div class="pie-radar" :id='dataObj.id'></div>
</template>
<style lang="scss">
  .pie-radar{
    width: 100%;
    height: 100%;
  }
</style>
<script>
export default {
  name: 'Radar',
  props: {
    dataObj: {
      type: Object,
      required: true // 必须id  data；data 数值数组[{name: 'xx', value: 45}]，
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
      let indicator = [
        {
          name: '1年以内',
          max: 110
        },
        {
          name: '1~2年',
          max: 110
        },
        {
          name: '2~3年',
          max: 110
        },
        {
          name: '3~5年',
          max: 110
        },
        {
          name: '5~10年',
          max: 110
        },
        {
          name: '10年以上',
          max: 110
        }
      ]
      let data = this.dataObj.data
      let myChart = this.$echarts.init(document.getElementById(this.dataObj.id))
      let option = {
        radar: {
          center: ['40%', '50%'],
          radius: '60%',
          name: {
            formatter: function (name, indicator) {
              let arr = [
                '{a|' + name + '}'
              ]
              return arr.join('\n')
            },
            textStyle: {
              rich: {
                a: {
                  color: '#BCDCFF',
                  fontSize: 20,
                  fontWeight: 600,
                  fontFamily: 'MicrosoftYaHei'
                }
              }
            }
          },
          nameGap: 20,
          indicator: indicator,
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [{
          type: 'radar',
          data: [
            [110, 110, 110, 110, 110, 110]
          ],
          symbol: 'circle',
          symbolSize: [15, 15],
          lineStyle: {
            normal: {
              color: 'rgba(46, 238, 241, 1)',
              width: 0
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(46, 238, 241, 1)'
            }
          },
          areaStyle: {
            color: 'rgb(46, 238, 241)',
            opacity: 0.1
          }
        }, {
          type: 'radar',
          data: [
            [80, 80, 80, 80, 80, 80]
          ],
          symbol: 'none',
          lineStyle: {
            width: 0
          },
          itemStyle: {
            color: '#4175F5'
          },
          areaStyle: {
            color: 'rgb(46, 238, 241)',
            opacity: 0.2
          }
        }, {
          type: 'radar',
          data: [
            [70, 70, 70, 70, 70, 70]
          ],
          symbol: 'none',
          lineStyle: {
            width: 0
          },
          itemStyle: {
            color: '#4175F5'
          },
          areaStyle: {
            color: 'rgb(46, 238, 241)',
            opacity: 0.3
          }
        }, {
          type: 'radar',
          data: [
            [60, 60, 60, 60, 60, 60]
          ],
          symbol: 'none',
          lineStyle: {
            width: 0
          },
          itemStyle: {
            color: '#4175F5'
          },
          areaStyle: {
            color: 'rgb(46, 238, 241)',
            opacity: 0.4
          }
        }, {
          type: 'radar',
          data: [
            [50, 50, 50, 50, 50, 50]
          ],
          symbol: 'none',
          lineStyle: {
            width: 0
          },
          itemStyle: {
            color: '#4175F5'
          },
          areaStyle: {
            color: 'rgb(46, 238, 241)',
            opacity: 0.5
          }
        }, {
          type: 'radar',
          data: [data],
          label: {
            show: false,
            formatter: function (params) {
              console.log(params)
              return params.value + '万'
            },
            color: '#8E88FE',
            align: 'right',
            distance: 10
            // align: 'right'
          },
          symbol: 'none',
          lineStyle: {
            width: 1,
            color: '#fff'
          },
          itemStyle: {
            borderWidth: 1,
            color: '#fff',
            borderColor: '#F2F063'
          },
          areaStyle: {
            color: '#89cc33',
            opacity: 1
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
