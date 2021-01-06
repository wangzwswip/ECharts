/**
* 带有间隔的环形图
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
  name: 'Ring',
  props: {
    dataObj: {
      type: Object,
      required: true // 必须id data；data 有{name：‘’，value：1}组成的数组
      // 可选控制参数 radius: ['40%', '65%'], center: ['35%', '45%']
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
      const myChart = this.$echarts.init(document.getElementById(this.dataObj.id))
      const inData = this.dataObj.data
      const names = []
      let totleValue = 0
      inData.map(item => {
        names.push(item.name)
        totleValue += item.value
      })
      const data = []
      const color = ['#fc6868', '#f9d237', '#399fff', '#36caca', '#fd6868', '#f1e00f']
      for (let i = 0; i < inData.length; i++) {
        data.push({
          value: inData[i].value,
          name: inData[i].name,
        }, {
          // 引入间隔
          value: totleValue / 100,
          name: '',
          tooltip: {
            show: false
          },
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 2
            }
          }
        })
      }
      const seriesOption = [{
        name: '',
        type: 'pie',
        clockWise: false,
        radius: this.dataObj.radius || ['50%', '70%'],
        center: this.dataObj.center || ['50%', '50%'],
        hoverAnimation: true,
        // roseType: 'radius',
        itemStyle: {
          normal: {
            label: {
              show: false,
              position: 'outside',
              color: '#ffffff',
              formatter: function (params) {
                let percent = 0
                let total = 0
                // let max = 0
                for (let i = 0; i < inData.length; i++) {
                  total += inData[i].value
                  // max = max < inData[i].value ? inData[i].value : max
                }
                percent = ((params.value / total) * 100).toFixed(2)
                if (params.value !== '') {
                  return params.name + '\n' + '\n' + '占百分比：' + percent + '%'
                } else {
                  return ''
                }
              }
            },
            labelLine: {
              length: 0,
              length2: 20,
              show: false,
              color: '#ffffff'
            }
          }
        },
        emphasis: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        },
        data: data
      }]
      const option = {
        color: color,
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return params.name + '：' + params.value + '<br>占比：' + (params.value/totleValue*100).toFixed(2) + '%'
          }
        },
        title: {
          show: true,
          text: '数据统计',
          textStyle: {
            color: '#808080',
            fontSize: 16
          },
          left: '42%', // d
          top: '40%'
        },
        legend: {
          right: 5,
          show: true,
          bottom: 5,
          left: 50,
          data: names,
          textStyle: {
            color: '#808080',
            fontSize: 16
          },
          itemGap: 25,
          itemWidth: 14,
          itemHeight: 14,
          icon: 'circle',
          orient: 'horizontal'
        },
        toolbox: {
          show: false
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
