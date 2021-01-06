<template>
  <div class="echart">
    <div><Rings :dataObj="data_1"></Rings></div>
    <div><Ring :dataObj="data_2"></Ring></div>
    <div><RingPercent :dataObj="data_3"></RingPercent></div>
    <div><Wave :dataObj="data_4"></Wave></div>
  </div>
</template>

<script>
export default {
  name: 'echarts',
  data () {
    return {
      data_1: {
        id: 'echarts_1',
        unit: '个',
        data: [
          {
            name: '数据1',
            value: 200
          },
          {
            name: '数据2',
            value: 178
          },
          {
            name: '数据3',
            value: 22
          }
        ]
      },
      data_2: {
        id: 'echarts_2',
        radius: ['50%', '70%'],
        center: ['50%', '45%'],
        data: [
          { name: '数据1', value: 15 },
          { name: '数据2', value: 15 },
          { name: '数据3', value: 15 },
          { name: '数据4', value: 15 }
        ]
      },
      data_3: {
        id: 'echarts_3',
        value: 75
      },
      data_4: {
        id: 'echarts_4',
        value: 0.78
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .echart {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: scroll;
    background: #fff;
    >div {
      width: 25%;
      height: 30%;
    }
  }
</style>
