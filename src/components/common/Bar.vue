/**
* 水平方向横行柱状图
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
  name: 'Bar',
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
      let data = this.dataObj.data
      let unit = this.dataObj.unit ? this.dataObj.unit : ''
      let names = []
      let bgData = []
      let sum = 0
      data.map(item => {
        names.push(item.name)
        sum += item.value
        bgData.push(100)
      })
      let myChart = this.$echarts.init(document.getElementById(this.dataObj.id))
      let option = {
        grid: {
          left: 5,
          bottom: 20,
          top: 20,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            // return params[0].name + '<br/>' +
            //   "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
            //   params[0].seriesName + ' : ' + Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() + ' 万元<br/>'
            return params[0].name + '<br/>' + (params[0].value) + ' 占比:' +  (params[0].value / sum * 100).toFixed(2) + '%' + ' <br/>'
          }
        },
        backgroundColor: 'rgba(20,28,52, 0)',
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} %',
              margin: 5,
              color: '#000',
              textStyle: {
                fontSize: '13'
              }
            },
            splitNumber: 5,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#2f363f'
              }
            },
            axisLine: {// 坐标轴轴线相关设置
              show: true,
              lineStyle: {
                color: '#8b8d90',
                opacity: 1
              }
            },
            axisTick: {
              show: false
            }
          }],
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000',
                fontSize: '13'
              }
              // formatter: function (value) {
              //   return (value.length > 5 ? (value.slice(0, 3) + '...') : value)
              // }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {// 坐标轴轴线相关设置
              show: true,
              lineStyle: {
                color: '#8b8d90',
                opacity: 1
              }
            },
            data: names
          }
        ],
        series: [
          {
            name: '占比',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: 'rgba(0, 169, 255,1)'
                }, {
                  offset: 1,
                  color: 'rgba(59, 251, 231,1)'
                }])
              }
            },
            barWidth: 10,
            data: data
          },
          {
            name: '背景',
            type: 'bar',
            barWidth: 10,
            barGap: '-100%',
            data: bgData, // this.dataObj.data,
            itemStyle: {
              normal: {
                color: 'rgba(0, 0, 0, 0.3)',
                barBorderRadius: 30
              }
            }
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
