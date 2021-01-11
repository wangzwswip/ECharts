/**
* 带有面积的环形（南丁格尔）新版本 加入了更多控制参数
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
  name: 'GaleRose',
  props: {
    dataObj: {
      type: Object,
      required: true
      // 必须id data legend，data 有{name：‘’，value：1}组成的数组 legend也是对象 {show: true, top: 0, right:0}
      // 可选控制参数：label是否显示（布尔型）radius: ['40%', '70%'], center: ['45%', '45%'],
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
      let color = ['#f0521b', '#46db71', '#f7b822', '#1dd6fe', '#fd6868', '#f1e00f']
      if (this.dataObj.legend.show === undefined) {
        this.dataObj.legend.show = true
      }
      if (this.dataObj.label === undefined) {
        this.dataObj.label = true
      }
      let names = []
      data.map(item => {
        names.push(item.name)
      })
      let myChart = this.$echarts.init(document.getElementById(this.dataObj.id))
      let option = {
        color: color,
        grid: {
          left: 10,
          top: 10,
          bottom: 10,
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}' + unit + '({d}%)'
        },
        legend: {
          show: this.dataObj.legend.show,
          right: this.dataObj.legend.right || 10,
          top: this.dataObj.legend.top || 20,
          data: names,
          formatter (name) {
            let text = name
            let count = 8
            return text.length < count ? text : `${text.slice(0, 6)}\n\n${text.slice(6)}`
          },
          textStyle: {
            color: '#000',
            fontSize: 16
          },
          itemGap: 25,
          itemWidth: 14,
          itemHeight: 14,
          icon: 'circle',
          orient: 'vertical'
        },
        series: [
          {
            name: '',
            type: 'pie',
            avoidLabelOverlap: true,
            radius: this.dataObj.radius || ['60%', '85%'],
            center: this.dataObj.center || ['45%', '45%'],
            roseType: 'radius',
            minAngle: 5,
            label: {
              show: this.dataObj.label,
              position: 'outside',
              align: 'left',
              formatter: function (params) {
                params.value = params.value + ' '
                let str = ''
                str = '{e|' + params.name + '}\n\n{f|' + params.value + '}{g|' + unit + '}'
                return str
              },
              color: 'rgba(0,0,0,0.6)',
              rich: {
                e: {
                  fontSize: 16,
                  lineHeiht: 16,
                  color: 'rgba(0,0,0,0.8)',
                  fontFamily: 'MicrosoftYaHei',
                  align: 'left',
                  verticalAlign: 'middle',
                  padding: 5
                },
                f: {
                  fontSize: 26,
                  lineHeiht: 24,
                  fontFamily: 'ArialMT',
                  align: 'left',
                  verticalAlign: 'middle'
                },
                g: {
                  fontSize: 14,
                  lineHeiht: 24,
                  color: 'rgba(0,0,0,0.8)',
                  fontFamily: 'ArialMT',
                  align: 'left',
                  verticalAlign: 'middle'
                }
              }
            },
            labelLine: {
              length: 0,
              length2: 20,
              show: this.dataObj.label
            },
            emphasis: {
              label: {
                show: false
              }
            },
            data: data
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
